import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Search, Handshake, Users, Shield, MessageSquare, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function HowItWorksPage() {
  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Smart Matching",
      description: "Our algorithm analyzes your skills, experience, and project interests to find the perfect collaboration partner.",
      details: [
        "Skill-based compatibility scoring",
        "Project interest alignment",
        "Availability and timezone matching",
        "Communication style preferences"
      ]
    },
    {
      icon: <Handshake className="w-6 h-6" />,
      title: "Trust-Based Connections",
      description: "Build genuine relationships through our structured approach to collaboration.",
      details: [
        "Gradual trust building process",
        "Trial collaboration periods",
        "Reputation system",
        "Community verification"
      ]
    },
    // {
    //   icon: <Users className="w-6 h-6" />,
    //   title: "Async-First Communication",
    //   description: "Designed for introverts and busy developers who prefer thoughtful, asynchronous communication.",
    //   details: [
    //     "No pressure for immediate responses",
    //     "Structured communication channels",
    //     "Documentation-first approach",
    //     "Flexible meeting scheduling"
    //   ]
    // },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Legal Framework",
      description: "Built-in legal templates and agreements to protect both parties from the start.",
      details: [
        "Collaboration agreements",
        "Intellectual property protection",
        "Revenue sharing templates",
        "Dispute resolution processes"
      ]
    },
    // {
    //   icon: <MessageSquare className="w-6 h-6" />,
    //   title: "Project Management",
    //   description: "Integrated tools to help you manage projects and track progress together.",
    //   details: [
    //     "Task and milestone tracking",
    //     "File sharing and collaboration",
    //     "Progress reporting",
    //     "Deadline management"
    //   ]
    // },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Community & Reputation",
      description: "Build your reputation in the indie developer community through successful collaborations.",
      details: [
        "Public collaboration history",
        "Skill endorsements",
        "Project showcase",
        "Community recognition"
      ]
    }
  ];

  const process = [
    {
      step: "01",
      title: "Profile Creation",
      description: "Create a detailed profile showcasing your skills, experience, and what you're looking for in a collaborator."
    },
    {
      step: "02", 
      title: "Smart Discovery",
      description: "Our algorithm presents you with potential partners based on compatibility and project alignment."
    },
    {
      step: "03",
      title: "Initial Connection",
      description: "Reach out through our platform with a structured introduction and project proposal."
    },
    {
      step: "04",
      title: "Trial Collaboration",
      description: "Start with a small project to test compatibility and build trust gradually."
    },
    {
      step: "05",
      title: "Full Partnership",
      description: "Once you've found the right match, scale up to larger projects and long-term collaboration."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            How It Works
          </Badge>
          <h1 className="text-4xl font-bold mb-6">
            How Colabship.io Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how our platform makes finding the perfect development partner effortless and secure.
          </p>
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">The Process</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {process.map((item, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-accent-foreground">{item.step}</span>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-l-4 border-l-accent">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <span className="text-sm text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Find Your Partner?</CardTitle>
              <CardDescription>
                Join thousands of indie developers who have found their perfect collaboration match.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="group">
                  <Link to="/access">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link to="/help/faq">
                    View FAQ
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
} 