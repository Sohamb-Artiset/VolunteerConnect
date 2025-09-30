import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Heart, 
  Share2,
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Globe,
  Loader2,
  CheckCircle
} from "lucide-react";

const OpportunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    fetchOpportunityDetails();
    if (user) {
      checkApplicationStatus();
    }
  }, [id, user]);

  const fetchOpportunityDetails = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .select(`
          *,
          organizations (
            name,
            description,
            website,
            email,
            phone,
            address,
            logo_url,
            verified
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      setOpportunity(data);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
      navigate("/opportunities");
    } finally {
      setLoading(false);
    }
  };

  const checkApplicationStatus = async () => {
    try {
      const { data } = await supabase
        .from('applications')
        .select('id')
        .eq('opportunity_id', id)
        .eq('user_id', user.id)
        .maybeSingle();
      
      setHasApplied(!!data);
    } catch (error) {
      console.error('Error checking application status:', error);
    }
  };

  const handleApply = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to apply for opportunities",
        variant: "destructive"
      });
      navigate("/signin");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('applications')
        .insert({
          user_id: user.id,
          opportunity_id: id,
          message: applicationMessage,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your application has been submitted successfully"
      });
      
      setShowApplicationDialog(false);
      setApplicationMessage("");
      setHasApplied(true);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Opportunity link copied to clipboard"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent-light/20 to-highlight-light/10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!opportunity) {
    return null;
  }

  const isFull = opportunity.current_participants >= opportunity.max_participants;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent-light/20 to-highlight-light/10">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/opportunities")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Opportunities
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Opportunity Header */}
            <Card className="border-0 shadow-glow">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <Badge className="bg-gradient-accent text-highlight-foreground">
                    {opportunity.category}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
                <CardTitle className="text-3xl mb-2">{opportunity.title}</CardTitle>
                <Link to={`/organizations`} className="text-accent font-semibold hover:underline flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  {opportunity.organizations?.name}
                  {opportunity.organizations?.verified && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </Link>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Key Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-semibold">{opportunity.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <Calendar className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-semibold">{opportunity.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-semibold">{opportunity.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <Users className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Participants</p>
                      <p className="font-semibold">
                        {opportunity.current_participants}/{opportunity.max_participants}
                        {isFull && <span className="text-destructive ml-2">(Full)</span>}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Description */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">About This Opportunity</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {opportunity.description}
                  </p>
                </div>

                <Separator />

                {/* Required Skills */}
                {opportunity.required_skills && opportunity.required_skills.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Skills Needed</h3>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.required_skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="border-0 shadow-glow sticky top-4">
              <CardContent className="pt-6">
                {hasApplied ? (
                  <div className="text-center py-4">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <h3 className="font-semibold text-lg mb-2">Application Submitted</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You've already applied to this opportunity. Check your dashboard for updates.
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate("/dashboard")}
                    >
                      View Dashboard
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button 
                      className="w-full bg-gradient-hero hover:opacity-90 h-12 text-lg mb-4"
                      onClick={() => setShowApplicationDialog(true)}
                      disabled={isFull || opportunity.status !== 'active'}
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      {isFull ? "Opportunity Full" : "Apply Now"}
                    </Button>
                    {opportunity.status !== 'active' && (
                      <p className="text-sm text-center text-muted-foreground">
                        This opportunity is no longer active
                      </p>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Organization Card */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">About the Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {opportunity.organizations?.logo_url && (
                  <img 
                    src={opportunity.organizations.logo_url} 
                    alt={opportunity.organizations.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )}
                <p className="text-sm text-muted-foreground">
                  {opportunity.organizations?.description || "No description available"}
                </p>
                
                <Separator />
                
                <div className="space-y-3 text-sm">
                  {opportunity.organizations?.email && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${opportunity.organizations.email}`} className="hover:underline">
                        {opportunity.organizations.email}
                      </a>
                    </div>
                  )}
                  {opportunity.organizations?.phone && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{opportunity.organizations.phone}</span>
                    </div>
                  )}
                  {opportunity.organizations?.website && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Globe className="w-4 h-4" />
                      <a 
                        href={opportunity.organizations.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Application Dialog */}
      <Dialog open={showApplicationDialog} onOpenChange={setShowApplicationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for {opportunity.title}</DialogTitle>
            <DialogDescription>
              Submit your application to {opportunity.organizations?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Message (Optional)
              </label>
              <Textarea
                placeholder="Tell the organization why you're interested in this opportunity..."
                value={applicationMessage}
                onChange={(e) => setApplicationMessage(e.target.value)}
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApplicationDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleApply}
              disabled={submitting}
              className="bg-gradient-hero hover:opacity-90"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OpportunityDetail;
