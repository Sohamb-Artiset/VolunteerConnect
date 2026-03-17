import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const NgoDashboard = () => {
  const { user, organization } = useAuth();
  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newOpportunity, setNewOpportunity] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    duration: "",
    category: "education",
    max_participants: 10,
    required_skills: "",
  });

  useEffect(() => {
    if (organization?.id) {
      fetchOpportunities();
    }
  }, [organization]);

  const fetchOpportunities = async () => {
    try {
      const { data: oppsData, error: oppsError } = await supabase
        .from("opportunities")
        .select("*")
        .eq("organization_id", organization.id)
        .order("created_at", { ascending: false });

      if (oppsError) throw oppsError;
      setOpportunities(oppsData || []);

      const { data: appsData, error: appsError } = await supabase
        .from("applications")
        .select(`
          *,
          opportunities!inner(*),
          profiles(*)
        `)
        .eq("opportunities.organization_id", organization.id);

      if (appsError) throw appsError;
      setApplications(appsData || []);
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOpportunity = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("opportunities").insert({
        ...newOpportunity,
        organization_id: organization.id,
        required_skills: newOpportunity.required_skills
          .split(",")
          .map(s => s.trim())
          .filter(Boolean),
      });

      if (error) throw error;
      toast.success("Opportunity created successfully");
      setNewOpportunity({
        title: "",
        description: "",
        location: "",
        date: "",
        duration: "",
        category: "education",
        max_participants: 10,
        required_skills: "",
      });
      fetchOpportunities();
    } catch (error) {
      toast.error("Failed to create opportunity");
    }
  };

  const handleApplicationStatusUpdate = async (applicationId, newStatus) => {
    try {
      const { error } = await supabase
        .from("applications")
        .update({ status: newStatus })
        .eq("id", applicationId);

      if (error) throw error;
      toast.success(`Application ${newStatus}`);
      fetchOpportunities();
    } catch (error) {
      toast.error("Failed to update application");
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <Tabs defaultValue="manage" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="manage">Manage Opportunities</TabsTrigger>
        <TabsTrigger value="create">Create Opportunity</TabsTrigger>
        <TabsTrigger value="profile">Edit Profile</TabsTrigger>
      </TabsList>

      <TabsContent value="manage" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Your Opportunities</CardTitle>
            <CardDescription>Manage your posted opportunities and applicants</CardDescription>
          </CardHeader>
          <CardContent>
            {opportunities.map((opp) => (
              <div key={opp.id} className="mb-6 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold mb-2">{opp.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{opp.description}</p>
                <div className="text-sm mb-4">
                  <Badge>{opp.status}</Badge>
                  <span className="ml-2">
                    {opp.current_participants}/{opp.max_participants} participants
                  </span>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications
                      .filter((app) => app.opportunity_id === opp.id)
                      .map((app) => (
                        <TableRow key={app.id}>
                          <TableCell>
                            {app.profiles?.first_name} {app.profiles?.last_name}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                app.status === "approved"
                                  ? "default"
                                  : app.status === "rejected"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {app.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(app.applied_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {app.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => handleApplicationStatusUpdate(app.id, "approved")}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleApplicationStatusUpdate(app.id, "rejected")}
                                  >
                                    Reject
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="create">
        <Card>
          <CardHeader>
            <CardTitle>Create New Opportunity</CardTitle>
            <CardDescription>Post a new volunteer opportunity</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateOpportunity} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newOpportunity.title}
                  onChange={(e) =>
                    setNewOpportunity({ ...newOpportunity, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newOpportunity.description}
                  onChange={(e) =>
                    setNewOpportunity({ ...newOpportunity, description: e.target.value })
                  }
                  rows={4}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newOpportunity.location}
                    onChange={(e) =>
                      setNewOpportunity({ ...newOpportunity, location: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    value={newOpportunity.date}
                    onChange={(e) =>
                      setNewOpportunity({ ...newOpportunity, date: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={newOpportunity.duration}
                    onChange={(e) =>
                      setNewOpportunity({ ...newOpportunity, duration: e.target.value })
                    }
                    placeholder="e.g., 2 hours, 1 day"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="max_participants">Max Participants</Label>
                  <Input
                    id="max_participants"
                    type="number"
                    value={newOpportunity.max_participants}
                    onChange={(e) =>
                      setNewOpportunity({
                        ...newOpportunity,
                        max_participants: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newOpportunity.category}
                  onValueChange={(value) =>
                    setNewOpportunity({ ...newOpportunity, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="environment">Environment</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="animals">Animals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="required_skills">Required Skills (comma-separated)</Label>
                <Input
                  id="required_skills"
                  value={newOpportunity.required_skills}
                  onChange={(e) =>
                    setNewOpportunity({ ...newOpportunity, required_skills: e.target.value })
                  }
                  placeholder="Teaching, Leadership, First Aid"
                />
              </div>
              <Button type="submit">Create Opportunity</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Organization Profile</CardTitle>
            <CardDescription>Update your organization information</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Organization profile editing coming soon. Current organization: {organization?.name}
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default NgoDashboard;
