import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, MessageSquare, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function GettingStartedPage() {
  const steps = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Create Your Profile",
      description: "Set up your developer profile with your skills, experience, and what you're looking for in a collaborator.",
      details: [
        "Add your technical skills and experience",
        "Describe your project interests and goals",
        "Set your availability and timezone",
        "Upload a profile picture (optional)"
      ]
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Browse Potential Partners",
      description: "Discover other indie developers who match your skills and project interests.",
      details: [
        "Use our smart matching algorithm",
        "Filter by skills, experience, and availability",
        "Read detailed profiles and project history",
        "Check compatibility scores"
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Start a Trial Collaboration",
      description: "Begin with a small project or trial period to see if you work well together.",
      details: [
        "Propose a small test project",
        "Set clear expectations and timeline",
        "Use our built-in communication tools",
        "Evaluate collaboration compatibility"
      ]
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Build Together",
      description: "Once you've found the right match, start building your next big thing together.",
      details: [
        "Use our project management tools",
        "Leverage legal templates and agreements",
        "Track progress and milestones",
        "Build your reputation in the community"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Getting Started
          </Badge>
          <h1 className="text-4xl font-bold mb-6">
            Welcome to Colabship.io
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to find your perfect development partner? Here's everything you need to know to get started on your collaboration journey.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="border-l-4 border-l-accent">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    {step.icon}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">
                      Step {index + 1}: {step.title}
                    </CardTitle>
                    <CardDescription className="text-lg mt-2">
                      {step.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 ml-16">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
              <CardDescription>
                Join our community of indie developers and find your perfect collaboration partner.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="group">
                  <Link to="/access">
                    Join the Beta
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link to="/help/how-it-works">
                    Learn More
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