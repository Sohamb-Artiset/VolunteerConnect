import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useOpportunities } from "@/hooks/useOpportunities";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar as CalendarIcon, Clock, Users, Search, Heart, Loader2 } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const Opportunities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [applicationMessage, setApplicationMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  
  const { isLoading, error, opportunities } = useOpportunities({ 
    searchTerm, 
    location, 
    category,
    date: date ? format(date, 'yyyy-MM-dd') : null
  });
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleApply = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to apply for opportunities",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('applications')
        .insert({
          user_id: user.id,
          opportunity_id: selectedOpportunity.id,
          message: applicationMessage,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your application has been submitted successfully"
      });
      
      setSelectedOpportunity(null);
      setApplicationMessage("");
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

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-background via-accent-light/20 to-highlight-light/10 min-h-screen">
        <div className="container mx-auto px-4 py-12 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-background via-accent-light/20 to-highlight-light/10 min-h-screen">
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-destructive">Error loading opportunities: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-background via-accent-light/20 to-highlight-light/10">
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Find Your Perfect 
            <span className="text-transparent bg-clip-text bg-gradient-hero ml-3">
              Volunteer Opportunity
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover meaningful ways to make a difference in your community. 
            Browse verified opportunities from trusted local NGOs.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-card rounded-2xl shadow-card p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search opportunities, organizations, or causes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-lg border-2 border-border/50 focus:border-primary"
              />
            </div>
            <Input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-12 text-lg border-2 border-border/50 focus:border-primary"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "h-12 justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="community">Community</SelectItem>
                <SelectItem value="animals">Animals</SelectItem>
                <SelectItem value="disaster-relief">Disaster Relief</SelectItem>
              </SelectContent>
            </Select>
            {(searchTerm || location || category || date) && (
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSearchTerm("");
                  setLocation("");
                  setCategory("");
                  setDate(null);
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {opportunities?.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <div className="text-muted-foreground">No opportunities found.</div>
            </div>
          ) : (
            opportunities?.map((opportunity) => (
              <Card key={opportunity.id} className="group hover:shadow-glow transition-all duration-300 border-0 bg-gradient-card overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <Badge className="bg-gradient-accent text-highlight-foreground">
                      {opportunity.category}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-1" />
                      {opportunity.participants}/{opportunity.maxParticipants}
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {opportunity.title}
                  </CardTitle>
                  <div className="text-accent font-semibold">{opportunity.organization}</div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2 text-accent" />
                      {opportunity.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2 text-accent" />
                      {opportunity.date} • {opportunity.duration}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {opportunity.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {opportunity.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-gradient-hero hover:opacity-90"
                      onClick={() => setSelectedOpportunity(opportunity)}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/opportunities/${opportunity.id}`)}
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            Load More Opportunities
          </Button>
        </div>
      </div>

      {/* Application Dialog */}
      <Dialog open={!!selectedOpportunity} onOpenChange={() => setSelectedOpportunity(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for {selectedOpportunity?.title}</DialogTitle>
            <DialogDescription>
              Submit your application to {selectedOpportunity?.organization}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Message (Optional)
              </label>
              <Textarea
                placeholder="Tell the organization why you're interested..."
                value={applicationMessage}
                onChange={(e) => setApplicationMessage(e.target.value)}
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedOpportunity(null)}>
              Cancel
            </Button>
            <Button 
              onClick={handleApply}
              disabled={submitting}
              className="bg-gradient-hero hover:opacity-90"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Opportunities;
