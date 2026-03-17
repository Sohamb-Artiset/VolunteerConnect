import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error("Error fetching blog post:", error);
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

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground mb-4">Blog post not found</p>
            <Link to="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent-light/10 to-highlight-light/5">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <Card>
            <CardHeader>
              {post.featured_image_url && (
                <img
                  src={post.featured_image_url}
                  alt={post.title}
                  className="w-full h-96 object-cover rounded-lg mb-6"
                />
              )}
              <CardTitle className="text-4xl mb-2">{post.title}</CardTitle>
              <p className="text-muted-foreground">
                By {post.author_name} • {new Date(post.published_at).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none">
                {post.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
