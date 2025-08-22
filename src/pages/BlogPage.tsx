import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight,
  Tag,
  Search,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/layout/Footer';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Indie Hacker's Guide to Finding Collaborators",
      excerpt: "After months of struggling to find the right people for my projects, I've learned some hard lessons about what works and what doesn't when building indie teams.",
      author: "Colabship Team",
      date: "2024-12-15",
      readTime: "8 min read",
      category: "Collaboration",
      tags: ["indie-hacking", "team-building", "collaboration"],
      featured: true,
      image: "/api/placeholder/600/300"
    },
    {
      id: 2,
      title: "Why Async-First Collaboration is the Future",
      excerpt: "Traditional collaboration tools are built for synchronous work. But indie hackers need something different - here's why async-first is the way forward.",
      author: "Colabship Team",
      date: "2024-12-10",
      readTime: "6 min read",
      category: "Product",
      tags: ["async", "productivity", "remote-work"],
      featured: false,
      image: "/api/placeholder/600/300"
    },
    {
      id: 3,
      title: "Building Colabship.io: From Idea to Beta",
      excerpt: "The complete story of how Colabship.io went from a personal pain point to a platform helping indie hackers find collaborators.",
      author: "Colabship Team",
      date: "2024-12-05",
      readTime: "12 min read",
      category: "Journey",
      tags: ["startup", "beta", "journey"],
      featured: true,
      image: "/api/placeholder/600/300"
    },
    {
      id: 4,
      title: "Legal Templates Every Indie Hacker Needs",
      excerpt: "Don't let legal complexity slow you down. Here are the essential legal documents you need for indie collaborations.",
      author: "Colabship Team",
      date: "2024-11-28",
      readTime: "10 min read",
      category: "Legal",
      tags: ["legal", "templates", "contracts"],
      featured: false,
      image: "/api/placeholder/600/300"
    },
    {
      id: 5,
      title: "The Psychology of Indie Hacker Collaboration",
      excerpt: "Understanding the mindset and motivations of indie hackers is key to building effective collaboration tools.",
      author: "Colabship Team",
      date: "2024-11-20",
      readTime: "7 min read",
      category: "Psychology",
      tags: ["psychology", "motivation", "mindset"],
      featured: false,
      image: "/api/placeholder/600/300"
    },
    {
      id: 6,
      title: "Beta Testing Lessons: What We've Learned So Far",
      excerpt: "Three months into beta testing, here are the key insights and lessons learned from our early users.",
      author: "Colabship Team",
      date: "2024-11-15",
      readTime: "9 min read",
      category: "Beta",
      tags: ["beta", "user-feedback", "lessons"],
      featured: false,
      image: "/api/placeholder/600/300"
    }
  ];

  const categories = [
    { name: "All", count: blogPosts.length },
    { name: "Collaboration", count: blogPosts.filter(post => post.category === "Collaboration").length },
    { name: "Product", count: blogPosts.filter(post => post.category === "Product").length },
    { name: "Journey", count: blogPosts.filter(post => post.category === "Journey").length },
    { name: "Legal", count: blogPosts.filter(post => post.category === "Legal").length },
    { name: "Psychology", count: blogPosts.filter(post => post.category === "Psychology").length },
    { name: "Beta", count: blogPosts.filter(post => post.category === "Beta").length }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <BookOpen className="w-3 h-3 mr-1" />
              Blog
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Colabship Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Insights, lessons, and stories from the indie hacker collaboration journey. 
              From finding collaborators to building better tools.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category, index) => (
              <Badge 
                key={index} 
                variant={index === 0 ? "default" : "outline"}
                className="cursor-pointer hover:bg-accent/10"
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="border-accent/20 hover:border-accent/40 transition-colors">
                  <div className="aspect-video bg-muted rounded-t-lg mb-4"></div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                    </div>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8">All Articles</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Card key={post.id} className="border-accent/20 hover:border-accent/40 transition-colors">
                <div className="aspect-video bg-muted rounded-t-lg mb-4"></div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Read
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <Card className="border-accent/20">
            <CardContent className="pt-8">
              <BookOpen className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-muted-foreground mb-6">
                Get the latest articles about indie hacking, collaboration, and the Colabship.io journey delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
                <Button className="glow-green">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BlogPage; 