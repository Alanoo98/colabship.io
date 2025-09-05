import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  MessageSquare, 
  Github, 
  Twitter, 
  Linkedin,
  Globe,
  Send,
  Clock,
  MapPin,
  Users,
  Heart,
  ArrowRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/layout/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you within 24 hours.",
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "For business inquiries, partnerships, and general questions",
      value: "hello@colabship.io",
      action: "Send Email",
      href: "mailto:hello@colabship.io"
    },
    {
      icon: MessageSquare,
      title: "Discord",
      description: "Join our community for real-time discussions and updates",
      value: "colabship.io",
      action: "Join Server",
      href: "https://discord.gg/colabship"
    },
    {
      icon: Github,
      title: "GitHub",
      description: "Follow development progress and contribute to the project",
      value: "@colabship",
      action: "Follow",
      href: "https://github.com/colabship"
    },
    {
      icon: Twitter,
      title: "Twitter",
      description: "Stay updated with the latest news and announcements",
      value: "@colabship_io",
      action: "Follow",
      href: "https://twitter.com/colabship_io"
    }
  ];

  const faqs = [
    {
      question: "How can I join the beta?",
      answer: "Currently, beta access is limited to 10 testers. You can request access by reaching out via email or Discord."
    },
    {
      question: "When will Colabship.io launch publicly?",
      answer: "We're taking a community-driven approach. The launch timeline depends on beta feedback and feature readiness."
    },
    {
      question: "Can I contribute to the project?",
      answer: "Absolutely! We welcome contributions from the community. Check out our GitHub repository for more details."
    },
    {
      question: "What makes Colabship.io different?",
      answer: "We focus on lightweight, async-first collaboration specifically designed for indie hackers, not corporate teams."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <MessageSquare className="w-3 h-3 mr-1" />
              Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Let's Connect
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions, feedback, or want to join our journey? 
              I'd love to hear from you. Let's build something amazing together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Ways to Connect</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="border-accent/20 hover:border-accent/40 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                        <method.icon className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{method.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{method.value}</span>
                        <Button variant="outline" size="sm" asChild>
                          <a href={method.href} target="_blank" rel="noopener noreferrer">
                            {method.action}
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Send a Message</h2>
            <p className="text-muted-foreground">
              Have a specific question or want to share feedback? 
              Fill out the form below and I'll get back to you within 24 hours.
            </p>
          </div>

          <Card className="border-accent/20">
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="What's this about?"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell me more..."
                    rows={6}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full glow-green" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-accent/20">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
              <Users className="w-8 h-8 text-accent" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Connect with other indie hackers, share your projects, and be part of building the future of collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="glow-green">
              <a href="https://discord.gg/colabship" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="w-4 h-4 mr-2" />
                Join Discord
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://github.com/colabship" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Follow on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactPage; 