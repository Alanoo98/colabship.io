import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  ChevronUp,
  HelpCircle,
  Shield,
  Users,
  DollarSign,
  FileText,
  Globe,
  Lock,
  Scale,
  Gavel,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  MapPin,
  MessageSquare,
  Star,
  Zap,
  TrendingUp,
  Building,
  User,
  Briefcase,
  Target,
  Calendar,
  Settings,
  Search,
  Filter
} from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";
import { Input } from "@/components/ui/input";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  priority: 'high' | 'medium' | 'low';
  lastUpdated?: string;
}

interface FAQProps {
  title?: string;
  description?: string;
  showSearch?: boolean;
  showCategories?: boolean;
  maxItems?: number;
}

const FAQ: React.FC<FAQProps> = ({ 
  title = "Frequently Asked Questions",
  description = "Find answers to common questions about Colabship.io",
  showSearch = true,
  showCategories = true,
  maxItems
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");

  const faqData: FAQItem[] = [
    // Platform & General
    {
      id: "what-is-colabship",
      question: "What is Colabship.io?",
      answer: "Colabship.io is a platform that connects indie hackers, developers, designers, and founders to build products together. We focus on async-first, lightweight team formation, and real product shipping. Our mission is to help builders find the right collaborators and ship faster.",
      category: "platform",
      tags: ["platform", "mission", "overview"],
      priority: "high"
    },
    {
      id: "how-it-works",
      question: "How does Colabship.io work?",
      answer: "1. Create your profile (founder or collaborator)\n2. Our AI-powered matching system connects you with compatible partners\n3. Apply to projects or receive applications\n4. Use our legal templates to formalize agreements\n5. Collaborate using our built-in tools\n6. Ship your product together!",
      category: "platform",
      tags: ["process", "workflow", "steps"],
      priority: "high"
    },
    {
      id: "who-can-use",
      question: "Who can use Colabship.io?",
      answer: "Anyone building products! This includes:\n• Founders with ideas seeking collaborators\n• Developers looking for interesting projects\n• Designers wanting to work on startups\n• Marketers helping with growth\n• Anyone passionate about building and shipping products",
      category: "platform",
      tags: ["users", "audience", "eligibility"],
      priority: "high"
    },

    // Smart Matching
    {
      id: "matching-algorithm",
      question: "How does the smart matching algorithm work?",
      answer: "Our AI analyzes 6 key factors:\n• Skills Match (40% weight) - Technical skills alignment\n• Experience Level (20% weight) - Seniority compatibility\n• Availability (15% weight) - Time commitment alignment\n• Collaboration Style (10% weight) - Async/sync preferences\n• Compensation (10% weight) - Equity/revenue/paid preferences\n• Location/Timezone (5% weight) - Geographical compatibility",
      category: "matching",
      tags: ["algorithm", "ai", "matching", "compatibility"],
      priority: "high"
    },
    {
      id: "match-score",
      question: "What does the match score mean?",
      answer: "Match scores range from 0-100%:\n• 90-100%: Excellent match - Strong compatibility across all factors\n• 80-89%: Very good match - Minor differences that can be worked out\n• 70-79%: Good match - Some differences but still compatible\n• Below 70%: Limited compatibility - May require significant compromise",
      category: "matching",
      tags: ["score", "compatibility", "interpretation"],
      priority: "medium"
    },
    {
      id: "improve-matches",
      question: "How can I improve my match quality?",
      answer: "• Complete your profile thoroughly with detailed skills and experience\n• Be specific about your availability and collaboration preferences\n• Add portfolio projects to showcase your work\n• Update your compensation preferences honestly\n• Provide detailed project descriptions (for founders)\n• Respond to applications promptly",
      category: "matching",
      tags: ["profile", "optimization", "quality"],
      priority: "medium"
    },

    // Legal & Agreements
    {
      id: "legal-templates",
      question: "What legal templates do you provide?",
      answer: "We offer customizable templates for:\n• Non-Disclosure Agreements (NDAs)\n• Intellectual Property Assignment Agreements\n• Founder Agreements (equity splits, vesting)\n• Contributor/Contractor Agreements\n• Partnership Agreements\n• Terms of Service and Privacy Policies\n\nAll templates are jurisdiction-aware and include tooltips for guidance.",
      category: "legal",
      tags: ["templates", "agreements", "documents"],
      priority: "high"
    },
    {
      id: "legal-advice",
      question: "Do you provide legal advice?",
      answer: "No, Colabship.io is not a law firm and does not provide legal advice. Our templates are starting points that should be reviewed by a qualified attorney before use. Laws vary by jurisdiction and may change over time. We recommend consulting with a lawyer familiar with your local laws.",
      category: "legal",
      tags: ["disclaimer", "legal-advice", "attorney"],
      priority: "high"
    },
    {
      id: "nda-necessity",
      question: "When do I need an NDA?",
      answer: "Consider an NDA when:\n• Sharing confidential business plans or strategies\n• Discussing proprietary technology or trade secrets\n• Revealing customer data or market research\n• Sharing financial information or projections\n• Early-stage discussions before formal agreements\n\nFor general project discussions, NDAs may not be necessary and can slow down collaboration.",
      category: "legal",
      tags: ["nda", "confidentiality", "when-to-use"],
      priority: "medium"
    },
    {
      id: "equity-agreements",
      question: "How do equity agreements work?",
      answer: "Equity agreements typically include:\n• Percentage ownership in the company\n• Vesting schedule (usually 4 years with 1-year cliff)\n• Rights and responsibilities of each party\n• Decision-making processes\n• Exit scenarios and buyout provisions\n• IP assignment and confidentiality clauses\n\nWe recommend having a lawyer review any equity agreement.",
      category: "legal",
      tags: ["equity", "ownership", "vesting"],
      priority: "high"
    },

    // Compensation & Payments
    {
      id: "compensation-types",
      question: "What types of compensation are common?",
      answer: "Common compensation models include:\n• Equity only (for early-stage projects)\n• Revenue sharing (percentage of profits)\n• Paid compensation (hourly, project-based, or salary)\n• Combination models (equity + revenue sharing)\n• Hybrid approaches (equity + small stipend)\n\nThe best model depends on project stage, funding, and mutual agreement.",
      category: "compensation",
      tags: ["payment", "equity", "revenue-sharing"],
      priority: "high"
    },
    {
      id: "equity-percentages",
      question: "What are typical equity percentages?",
      answer: "Equity percentages vary widely:\n• Co-founders: 20-50% each (depending on contribution)\n• Early employees: 1-5% (with vesting)\n• Advisors: 0.25-2% (usually with time-based vesting)\n• Contractors: 0.5-10% (depending on project scope)\n\nFactors include: project stage, funding raised, contribution level, time commitment, and market rates.",
      category: "compensation",
      tags: ["equity", "percentages", "ranges"],
      priority: "medium"
    },
    {
      id: "revenue-sharing",
      question: "How does revenue sharing work?",
      answer: "Revenue sharing typically involves:\n• Agreed percentage of net revenue or profits\n• Clear definition of what constitutes 'revenue'\n• Payment schedule (monthly, quarterly, etc.)\n• Duration of the arrangement\n• Conditions for termination\n• Accounting and reporting requirements\n\nDocument everything clearly to avoid disputes later.",
      category: "compensation",
      tags: ["revenue", "sharing", "profits"],
      priority: "medium"
    },

    // Collaboration & Communication
    {
      id: "async-collaboration",
      question: "What is async-first collaboration?",
      answer: "Async-first collaboration means:\n• Communication happens when convenient for each person\n• Decisions are documented and shared\n• Meetings are scheduled only when necessary\n• Work progresses without waiting for others\n• Tools like Slack, Notion, and GitHub are used effectively\n• Respect for different time zones and schedules\n\nThis approach increases productivity and reduces friction.",
      category: "collaboration",
      tags: ["async", "communication", "productivity"],
      priority: "medium"
    },
    {
      id: "communication-tools",
      question: "What communication tools do you recommend?",
      answer: "Our recommended stack:\n• Slack/Discord for real-time chat\n• Notion for documentation and project management\n• GitHub for code collaboration\n• Figma for design collaboration\n• Zoom/Google Meet for video calls\n• Loom for async video updates\n• Linear/Jira for task tracking\n\nChoose tools that work for your team's workflow.",
      category: "collaboration",
      tags: ["tools", "communication", "stack"],
      priority: "medium"
    },
    {
      id: "timezone-challenges",
      question: "How do you handle timezone differences?",
      answer: "Effective timezone management:\n• Use async communication as the default\n• Schedule meetings during overlapping hours\n• Document decisions and share updates\n• Use tools that work across time zones\n• Set clear expectations about response times\n• Consider using a timezone converter\n• Plan for occasional sync meetings\n\nMost successful remote teams span multiple time zones.",
      category: "collaboration",
      tags: ["timezone", "remote", "global"],
      priority: "medium"
    },

    // Project Management
    {
      id: "project-stages",
      question: "What are the different project stages?",
      answer: "Common project stages:\n• Just an idea - Concept development and validation\n• Building MVP - Creating the minimum viable product\n• Beta testing - Limited user testing and feedback\n• Launched - Public release and user acquisition\n• Scaling - Growth and feature expansion\n\nEach stage has different collaboration needs and compensation models.",
      category: "projects",
      tags: ["stages", "mvp", "launch"],
      priority: "medium"
    },
    {
      id: "project-timeline",
      question: "How long do projects typically take?",
      answer: "Project timelines vary significantly:\n• MVP development: 2-6 months\n• Beta testing: 1-3 months\n• Launch preparation: 1-2 months\n• Scaling phase: Ongoing\n\nFactors affecting timeline:\n• Project complexity and scope\n• Team size and experience\n• Available resources and funding\n• Market conditions and competition\n• Technical challenges and pivots",
      category: "projects",
      tags: ["timeline", "duration", "planning"],
      priority: "medium"
    },
    {
      id: "success-factors",
      question: "What factors contribute to project success?",
      answer: "Key success factors:\n• Clear vision and shared goals\n• Complementary skills and experience\n• Strong communication and trust\n• Realistic expectations and timelines\n• Adequate resources and funding\n• Market validation and user feedback\n• Flexibility to adapt and pivot\n• Legal clarity and fair agreements\n• Regular progress tracking and accountability",
      category: "projects",
      tags: ["success", "factors", "tips"],
      priority: "high"
    },

    // Technical & Security
    {
      id: "data-security",
      question: "How do you protect user data?",
      answer: "We implement multiple security measures:\n• End-to-end encryption for sensitive communications\n• Secure data storage with industry-standard protocols\n• Regular security audits and penetration testing\n• GDPR and CCPA compliance\n• User consent and data control\n• Secure authentication and access controls\n• Regular backups and disaster recovery\n\nWe never share your data with third parties without consent.",
      category: "security",
      tags: ["security", "privacy", "data"],
      priority: "high"
    },
    {
      id: "platform-security",
      question: "Is the platform secure for sensitive discussions?",
      answer: "Yes, we prioritize security:\n• All communications are encrypted in transit and at rest\n• Legal documents are stored securely\n• Access controls prevent unauthorized viewing\n• Regular security updates and monitoring\n• Compliance with data protection regulations\n• Secure file sharing and document storage\n\nHowever, we recommend using additional security measures for highly sensitive information.",
      category: "security",
      tags: ["encryption", "communications", "protection"],
      priority: "high"
    },

    // Pricing & Plans
    {
      id: "pricing-model",
      question: "How does pricing work?",
      answer: "We offer a freemium model:\n• Free tier: 1 active project, basic matching, limited applications\n• Pro ($19/month): Unlimited projects, advanced matching, priority support\n• Enterprise ($99/month): Team features, custom legal templates, dedicated support\n\nAdditional fees:\n• 5% fee on successful project completions\n• Legal document fees ($50-200 per document)\n• Premium matching ($99 one-time fee)",
      category: "pricing",
      tags: ["pricing", "plans", "fees"],
      priority: "high"
    },
    {
      id: "free-vs-paid",
      question: "What's the difference between free and paid plans?",
      answer: "Free Plan:\n• 1 active project\n• Basic matching algorithm\n• Limited applications per month\n• Standard legal templates\n• Community support\n\nPro Plan ($19/month):\n• Unlimited projects\n• Advanced AI matching\n• Unlimited applications\n• Premium legal templates\n• Priority support\n• Analytics and insights\n• Custom branding",
      category: "pricing",
      tags: ["comparison", "features", "limits"],
      priority: "medium"
    },

    // Support & Community
    {
      id: "getting-help",
      question: "How can I get help and support?",
      answer: "Multiple support channels:\n• In-app chat support (Pro users get priority)\n• Email support: support@colabship.io\n• Community Discord: discord.gg/colabship\n• Reddit community: r/colabship\n• Documentation and guides\n• Video tutorials and webinars\n• Office hours for Pro users\n\nWe typically respond within 24 hours.",
      category: "support",
      tags: ["help", "support", "contact"],
      priority: "medium"
    },
    {
      id: "community-guidelines",
      question: "What are the community guidelines?",
      answer: "Our community is built on:\n• Respect and professionalism\n• Honest and transparent communication\n• Fair and ethical collaboration\n• No harassment or discrimination\n• Intellectual property respect\n• Constructive feedback and criticism\n• Helpfulness and knowledge sharing\n\nViolations may result in account suspension or termination.",
      category: "support",
      tags: ["guidelines", "community", "rules"],
      priority: "medium"
    }
  ];

  const categories = [
    { id: "all", name: "All Questions", icon: HelpCircle },
    { id: "platform", name: "Platform", icon: Building },
    { id: "matching", name: "Smart Matching", icon: Target },
    { id: "legal", name: "Legal & Agreements", icon: Scale },
    { id: "compensation", name: "Compensation", icon: DollarSign },
    { id: "collaboration", name: "Collaboration", icon: Users },
    { id: "projects", name: "Projects", icon: Briefcase },
    { id: "security", name: "Security", icon: Shield },
    { id: "pricing", name: "Pricing", icon: TrendingUp },
    { id: "support", name: "Support", icon: MessageSquare }
  ];

  const priorities = [
    { id: "all", name: "All Priorities", color: "bg-gray-100" },
    { id: "high", name: "High Priority", color: "bg-red-100 text-red-800" },
    { id: "medium", name: "Medium Priority", color: "bg-yellow-100 text-yellow-800" },
    { id: "low", name: "Low Priority", color: "bg-green-100 text-green-800" }
  ];

  const toggleItem = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const filteredFAQ = faqData
    .filter(item => {
      const matchesSearch = searchTerm === "" || 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesPriority = selectedPriority === "all" || item.priority === selectedPriority;
      
      return matchesSearch && matchesCategory && matchesPriority;
    })
    .slice(0, maxItems);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">
          <HelpCircle className="w-8 h-8 inline mr-2 text-accent" />
          {title}
        </h2>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Search and Filters */}
      {(showSearch || showCategories) && (
        <Card className="bg-background border-accent/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              {showSearch && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search questions, answers, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              )}
              
              {showCategories && (
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                        className="flex items-center gap-2"
                      >
                        <Icon className="w-4 h-4" />
                        {category.name}
                      </Button>
                    );
                  })}
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                {priorities.map((priority) => (
                  <Button
                    key={priority.id}
                    variant={selectedPriority === priority.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPriority(priority.id)}
                  >
                    {priority.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQ.map((item, index) => (
          <ScrollReveal key={item.id} delay={index * 50}>
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0">
                <button
                  className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-accent/20 rounded-lg"
                  onClick={() => toggleItem(item.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{item.question}</h3>
                        <Badge className={getPriorityColor(item.priority)}>
                          {item.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="capitalize">{item.category}</span>
                        <span>•</span>
                        <span>{item.tags.slice(0, 3).join(', ')}</span>
                        {item.tags.length > 3 && (
                          <span>+{item.tags.length - 3} more</span>
                        )}
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {expandedItems.has(item.id) ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </button>
                
                {expandedItems.has(item.id) && (
                  <div className="px-6 pb-6 border-t">
                    <div className="pt-4">
                      <div className="prose prose-sm max-w-none">
                        <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        {item.lastUpdated && (
                          <span className="text-xs text-muted-foreground">
                            Updated: {item.lastUpdated}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      {/* No Results */}
      {filteredFAQ.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Questions Found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse all questions
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedPriority("all");
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Contact Support */}
      <Card className="bg-accent/5 border-accent/20">
        <CardContent className="p-6 text-center">
          <MessageSquare className="w-8 h-8 text-accent mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-2">Still Have Questions?</h3>
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="glow-green">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline">
              <Globe className="w-4 h-4 mr-2" />
              Join Community
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQ; 