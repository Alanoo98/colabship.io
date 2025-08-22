import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, HelpCircle, Users, Shield, MessageSquare, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function FAQPage() {
  const faqCategories = [
    {
      icon: <Users className="w-5 h-5" />,
      title: "Getting Started",
      questions: [
        {
          question: "How do I create my profile?",
          answer: "Creating a profile is simple! Click 'Join the Beta' and follow the step-by-step process. You'll need to add your skills, experience, project interests, and what you're looking for in a collaborator."
        },
        {
          question: "Is Colabship.io free to use?",
          answer: "Currently, we're in beta and offering free access to early users. We're focused on building the best experience for indie developers before introducing any pricing plans."
        },
        {
          question: "What information should I include in my profile?",
          answer: "Think of it as your sharpened LinkedIn for people like yourself to explore. Be honest about your skills, experience level, and what you're looking for. Include your technical stack, project interests, availability, and communication preferences. The more detailed you are, the better matches you'll find."
        },
        {
          question: "How long does it take to find a partner?",
          answer: "It varies! Some users find their perfect match within days, while others take a few weeks. The key is being active, reaching out to potential partners, and being open to trial collaborations."
        }
      ]
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Safety & Trust",
      questions: [
        {
          question: "How do you verify users?",
          answer: "We use multiple verification methods including GitHub integration, LinkedIn verification, and community feedback. Our reputation system helps build trust over time through successful collaborations."
        },
        {
          question: "What if I have a bad experience with a collaborator?",
          answer: "We have a dispute resolution process and encourage open communication. You can report issues through our support system, and we'll help mediate conflicts. Your safety and positive experience are our priority."
        },
        {
          question: "Are there legal protections in place?",
          answer: "Yes! We provide built-in legal templates for collaboration agreements, intellectual property protection, and revenue sharing. These help protect both parties from the start of any collaboration. However, we recommend consulting with legal professionals for your specific situation, as Colabship.io is not responsible for the enforcement or interpretation of these agreements."
        },
        {
          question: "How do you handle intellectual property?",
          answer: "We provide clear IP agreements that protect both collaborators. You can customize these based on your specific project needs. We recommend always having clear agreements before starting any collaboration. Please note that Colabship.io acts as a facilitator and is not responsible for IP disputes or the enforcement of agreements between users."
        }
      ]
    },

    {
      icon: <Zap className="w-5 h-5" />,
      title: "Features & Platform",
      questions: [
        {
          question: "How does the matching algorithm work?",
          answer: "Our algorithm analyzes your skills, experience, project interests, availability, and communication preferences to find compatible partners. It learns from your interactions to improve matches over time."
        },
        {
          question: "Can I showcase my previous projects?",
          answer: "Yes! You can add your portfolio, GitHub projects, and previous collaborations to your profile. This helps potential partners understand your work style and capabilities."
        },
        {
          question: "Is there a mobile app?",
          answer: "Currently, we're web-only but fully responsive. Maybe in the future, we'll build a mobile app based on user feedback and demand."
        },
        {
          question: "How do I build my reputation on the platform?",
          answer: "Complete successful collaborations, receive endorsements from partners, contribute to the community, and maintain a positive track record. Your reputation grows with each successful project."
        }
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
            FAQ
          </Badge>
          <h1 className="text-4xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to the most common questions about Colabship.io and how to make the most of your collaboration journey.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12 mb-16">
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    {category.icon}
                  </div>
                  <CardTitle className="text-2xl">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <HelpCircle className="w-12 h-12 text-accent" />
              </div>
              <CardTitle className="text-2xl">Still Have Questions?</CardTitle>
              <CardDescription>
                Can't find what you're looking for? Our support team is here to help.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="group">
                  <Link to="/help/contact-support">
                    Contact Support
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link to="/help/getting-started">
                    Getting Started Guide
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