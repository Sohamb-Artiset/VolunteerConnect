import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Star } from "lucide-react";

const VolunteerDashboard = () => {
  const { user, profile } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProfile, setEditProfile] = useState({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    phone: profile?.phone || "",
    location: profile?.location || "",
    bio: profile?.bio || "",
    skills: profile?.skills?.join(", ") || "",
  });
  const [reviewData, setReviewData] = useState({ rating: 5, comment: "" });
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, [user]);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from("applications")
        .select(`
          *,
          opportunities (
            *,
            organizations (*)
          )
        `)
        .eq("user_id", user.id)
        .order("applied_at", { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: editProfile.first_name,
          last_name: editProfile.last_name,
          phone: editProfile.phone,
          location: editProfile.location,
          bio: editProfile.bio,
          skills: editProfile.skills.split(",").map(s => s.trim()).filter(Boolean),
        })
        .eq("user_id", user.id);

      if (error) throw error;
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOpportunity) return;

    try {
      const { error } = await supabase
        .from("reviews")
        .insert({
          opportunity_id: selectedOpportunity.id,
          reviewer_id: user.id,
          reviewee_organization_id: selectedOpportunity.organizations.id,
          rating: reviewData.rating,
          comment: reviewData.comment,
        });

      if (error) throw error;
      toast.success("Review submitted successfully");
      setReviewData({ rating: 5, comment: "" });
      setSelectedOpportunity(null);
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: "secondary",
      approved: "default",
      rejected: "destructive",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Impact</CardTitle>
          <CardDescription>Your volunteer statistics</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-secondary rounded-lg">
            <div className="text-3xl font-bold text-primary">{applications.length}</div>
            <div className="text-sm text-muted-foreground">Total Applications</div>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <div className="text-3xl font-bold text-primary">
              {applications.filter(a => a.status === "approved").length}
            </div>
            <div className="text-sm text-muted-foreground">Approved</div>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <div className="text-3xl font-bold text-primary">
              {applications.filter(a => a.status === "pending").length}
            </div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Applications</CardTitle>
          <CardDescription>Track your volunteer applications</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Opportunity</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.opportunities?.title}</TableCell>
                  <TableCell>{app.opportunities?.organizations?.name}</TableCell>
                  <TableCell>{getStatusBadge(app.status)}</TableCell>
                  <TableCell>{new Date(app.applied_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {app.status === "approved" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedOpportunity(app.opportunities)}
                          >
                            Leave Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Leave a Review</DialogTitle>
                            <DialogDescription>
                              Share your experience with {app.opportunities?.organizations?.name}
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleReviewSubmit} className="space-y-4">
                            <div>
                              <Label>Rating</Label>
                              <div className="flex gap-2 mt-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => setReviewData({ ...reviewData, rating: star })}
                                    className="focus:outline-none"
                                  >
                                    <Star
                                      className={`w-8 h-8 ${
                                        star <= reviewData.rating
                                          ? "fill-primary text-primary"
                                          : "text-muted-foreground"
                                      }`}
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="comment">Comment</Label>
                              <Textarea
                                id="comment"
                                value={reviewData.comment}
                                onChange={(e) =>
                                  setReviewData({ ...reviewData, comment: e.target.value })
                                }
                                placeholder="Share your experience..."
                                rows={4}
                              />
                            </div>
                            <Button type="submit" className="w-full">Submit Review</Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your volunteer information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  value={editProfile.first_name}
                  onChange={(e) => setEditProfile({ ...editProfile, first_name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  value={editProfile.last_name}
                  onChange={(e) => setEditProfile({ ...editProfile, last_name: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={editProfile.phone}
                onChange={(e) => setEditProfile({ ...editProfile, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={editProfile.location}
                onChange={(e) => setEditProfile({ ...editProfile, location: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="skills">Skills (comma-separated)</Label>
              <Input
                id="skills"
                value={editProfile.skills}
                onChange={(e) => setEditProfile({ ...editProfile, skills: e.target.value })}
                placeholder="Leadership, Teaching, Communication"
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={editProfile.bio}
                onChange={(e) => setEditProfile({ ...editProfile, bio: e.target.value })}
                rows={4}
              />
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VolunteerDashboard;
