import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useOpportunities = (filters = {}) => {
  return useQuery({
    queryKey: ['opportunities', filters],
    queryFn: async () => {
      let query = supabase
        .from('opportunities')
        .select(`
          *,
          organizations (
            name,
            verified
          )
        `)
        .eq('status', 'active');

      // Apply search filter
      if (filters.searchTerm) {
        query = query.or(`title.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%`);
      }

      // Apply location filter
      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }

      // Apply category filter
      if (filters.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }

      // Apply date filter
      if (filters.date) {
        query = query.gte('date', filters.date);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return data?.map(opportunity => ({
        id: opportunity.id,
        title: opportunity.title,
        organization: opportunity.organizations?.name || 'Unknown Organization',
        location: opportunity.location,
        date: opportunity.date,
        duration: opportunity.duration,
        participants: opportunity.current_participants,
        maxParticipants: opportunity.max_participants,
        description: opportunity.description,
        skills: opportunity.required_skills || [],
        category: opportunity.category
      })) || [];
    }
  });
};