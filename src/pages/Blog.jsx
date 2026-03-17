import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("published_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent-light/10 to-highlight-light/5">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">Success Stories</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Read inspiring stories from our volunteer community
          </p>

          <div className="grid gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  {post.featured_image_url && (
                    <img
                      src={post.featured_image_url}
                      alt={post.title}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                  )}
                  <CardTitle className="text-2xl">{post.title}</CardTitle>
                  <CardDescription>
                    By {post.author_name} • {new Date(post.published_at).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.content.substring(0, 200)}...
                  </p>
                  <Link to={`/blog/${post.slug}`}>
                    <Button variant="link" className="p-0">
                      Read more <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}

            {posts.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
