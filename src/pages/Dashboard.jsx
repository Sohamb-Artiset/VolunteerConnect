import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Heart, CheckCircle, XCircle, Clock, TrendingUp } from "lucide-react";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { user, profile, organization, loading: authLoading } = useAuth();
  const [applications, setApplications] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    completed: 0
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/signin");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && organization) {
      fetchOrganizationData();
    } else if (user && !organization) {
      fetchVolunteerData();
    }
  }, [user, organization]);

  const fetchOrganizationData = async () => {
    setLoading(true);
    try {
      // Fetch opportunities for this organization
      const { data: oppsData, error: oppsError } = await supabase
        .from('opportunities')
        .select('*')
        .eq('organization_id', organization.id);

      if (oppsError) throw oppsError;
      setOpportunities(oppsData || []);

      // Fetch applications for these opportunities
      const oppIds = oppsData?.map(o => o.id) || [];
      if (oppIds.length > 0) {
        const { data: appsData, error: appsError } = await supabase
          .from('applications')
          .select(`
            *,
            profiles (first_name, last_name, email)
          `)
          .in('opportunity_id', oppIds);

        if (appsError) throw appsError;
        setApplications(appsData || []);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchVolunteerData = async () => {
    setLoading(true);
    try {
      const { data: appsData, error } = await supabase
        .from('applications')
        .select(`
          *,
          opportunities (
            title,
            date,
            status,
            organizations (name)
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      
      const apps = appsData || [];
      setApplications(apps);

      // Calculate stats
      setStats({
        total: apps.length,
        approved: apps.filter(a => a.status === 'approved').length,
        pending: apps.filter(a => a.status === 'pending').length,
        completed: apps.filter(a => a.opportunities?.status === 'completed').length
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', applicationId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Application ${newStatus}`
      });

      fetchOrganizationData();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Organization Dashboard
  if (organization) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent-light/10 to-highlight-light/5">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-8">
            Organization Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Opportunities</p>
                    <p className="text-3xl font-bold">{opportunities.length}</p>
                  </div>
                  <Heart className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Applications</p>
                    <p className="text-3xl font-bold">{applications.length}</p>
                  </div>
                  <Clock className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Approved</p>
                    <p className="text-3xl font-bold">
                      {applications.filter(a => a.status === 'approved').length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {opportunities.map(opp => {
            const oppApps = applications.filter(a => a.opportunity_id === opp.id);
            return (
              <Card key={opp.id} className="mb-6">
                <CardHeader>
                  <CardTitle>{opp.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {oppApps.length} application(s) received
                  </p>
                </CardHeader>
                <CardContent>
                  {oppApps.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Volunteer</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Message</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {oppApps.map(app => (
                          <TableRow key={app.id}>
                            <TableCell>
                              {app.profiles?.first_name} {app.profiles?.last_name}
                            </TableCell>
                            <TableCell>{app.profiles?.email}</TableCell>
                            <TableCell className="max-w-xs truncate">
                              {app.message || "No message"}
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={
                                  app.status === 'approved' ? 'default' :
                                  app.status === 'rejected' ? 'destructive' : 
                                  'secondary'
                                }
                              >
                                {app.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateApplicationStatus(app.id, 'approved')}
                                  disabled={app.status === 'approved'}
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateApplicationStatus(app.id, 'rejected')}
                                  disabled={app.status === 'rejected'}
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      No applications yet
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // Volunteer Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent-light/10 to-highlight-light/5">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          My Impact Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Applications</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <Heart className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-3xl font-bold">{stats.approved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-3xl font-bold">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-3xl font-bold">{stats.completed}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-highlight" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Application History</CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Opportunity</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map(app => (
                    <TableRow key={app.id}>
                      <TableCell>{app.opportunities?.title}</TableCell>
                      <TableCell>{app.opportunities?.organizations?.name}</TableCell>
                      <TableCell>{app.opportunities?.date}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            app.status === 'approved' ? 'default' :
                            app.status === 'rejected' ? 'destructive' : 
                            'secondary'
                          }
                        >
                          {app.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                You haven't applied to any opportunities yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
