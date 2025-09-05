import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Shield, 
  Users, 
  AlertTriangle, 
  ArrowRight,
  Calendar,
  Globe,
  Mail,
  MapPin,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/layout/Footer';

const TermsPage = () => {
  const lastUpdated = "July 30, 2025";
  const effectiveDate = "July 30, 2025";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <FileText className="w-3 h-3 mr-1" />
              Terms of Service
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These terms govern your use of Colabship.io and outline the rules, 
              rights, and responsibilities for all users of our platform.
            </p>
            <div className="mt-8 text-sm text-muted-foreground">
              <p>Last updated: {lastUpdated}</p>
              <p>Effective date: {effectiveDate}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-12">
            
            {/* Agreement */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-accent" />
                  Agreement to Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  By accessing or using Colabship.io ("the Platform"), you agree to be bound by these 
                  Terms of Service ("Terms"). If you disagree with any part of these terms, 
                  you may not access the Platform.
                </p>
                <p>
                  These Terms apply to all users of the Platform, including without limitation users 
                  who are browsers, collaborators, founders, or contributors of content.
                </p>
              </CardContent>
            </Card>

            {/* Description of Service */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-accent" />
                  Description of Service
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Colabship.io is a platform that facilitates collaboration between indie hackers, 
                  developers, designers, and entrepreneurs. Our services include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Project creation and management tools</li>
                  <li>Collaborator matching and discovery</li>
                  <li>Communication and collaboration features</li>
                  <li>Legal document templates and tools</li>
                  <li>Community features and networking</li>
                  <li>Payment processing for collaborations</li>
                </ul>
              </CardContent>
            </Card>

            {/* User Accounts */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>User Accounts and Registration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Account Creation</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>You must provide accurate and complete information</li>
                      <li>You are responsible for maintaining account security</li>
                      <li>One account per person (no shared accounts)</li>
                      <li>You must be at least 18 years old to create an account</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Account Responsibilities</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Keep your login credentials secure</li>
                      <li>Notify us immediately of any unauthorized use</li>
                      <li>Update your information as needed</li>
                      <li>You are responsible for all activities under your account</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Acceptable Use */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-accent" />
                  Acceptable Use Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  You agree to use the Platform only for lawful purposes and in accordance with these Terms.
                </p>
                
                <div>
                  <h3 className="font-semibold mb-2">You agree NOT to:</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe on intellectual property rights</li>
                    <li>Harass, abuse, or harm other users</li>
                    <li>Share false or misleading information</li>
                    <li>Attempt to gain unauthorized access to the Platform</li>
                    <li>Use the Platform for spam or unsolicited communications</li>
                    <li>Interfere with the Platform's operation or security</li>
                    <li>Use automated systems to access the Platform</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">You agree TO:</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Be respectful and professional in all interactions</li>
                    <li>Provide accurate and truthful information</li>
                    <li>Respect other users' privacy and rights</li>
                    <li>Report violations or suspicious activity</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Intellectual Property Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Platform Content</h3>
                    <p className="text-sm text-muted-foreground">
                      The Platform and its original content, features, and functionality are owned by 
                      Colabship.io and are protected by international copyright, trademark, patent, 
                      trade secret, and other intellectual property laws.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">User Content</h3>
                    <p className="text-sm text-muted-foreground">
                      You retain ownership of content you create and share on the Platform. By posting 
                      content, you grant us a non-exclusive, worldwide, royalty-free license to use, 
                      display, and distribute your content in connection with the Platform.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Collaboration Agreements</h3>
                    <p className="text-sm text-muted-foreground">
                      Intellectual property rights for projects created through collaborations are 
                      determined by the agreements between collaborators. We provide templates but 
                      do not guarantee their enforceability in all jurisdictions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Terms */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Payment Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Subscription Services</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Premium features require a paid subscription</li>
                      <li>Subscriptions are billed in advance on a recurring basis</li>
                      <li>You may cancel your subscription at any time</li>
                      <li>No refunds for partial months or unused periods</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Payment Processing</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Payments are processed by third-party providers</li>
                      <li>We do not store your payment information</li>
                      <li>You agree to pay all applicable taxes</li>
                      <li>Failed payments may result in service suspension</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimers */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-accent" />
                  Disclaimers and Limitations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Service Availability</h3>
                    <p className="text-sm text-muted-foreground">
                      We strive to maintain high availability but do not guarantee uninterrupted access. 
                      The Platform is provided "as is" without warranties of any kind.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">User Interactions</h3>
                    <p className="text-sm text-muted-foreground">
                      We do not verify the accuracy of user information or guarantee successful 
                      collaborations. Users are responsible for their own due diligence.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Legal Documents</h3>
                    <p className="text-sm text-muted-foreground">
                      Legal templates are provided for informational purposes only. We recommend 
                      consulting with legal professionals for specific legal advice.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  To the maximum extent permitted by law, Colabship.io shall not be liable for any 
                  indirect, incidental, special, consequential, or punitive damages, including but 
                  not limited to loss of profits, data, use, goodwill, or other intangible losses.
                </p>
                <p className="text-sm text-muted-foreground">
                  Our total liability shall not exceed the amount paid by you for the service in 
                  the 12 months preceding the claim.
                </p>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Account Termination</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>You may terminate your account at any time</li>
                      <li>We may terminate accounts for Terms violations</li>
                      <li>Termination is effective immediately</li>
                      <li>Some data may be retained as required by law</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Effect of Termination</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Access to the Platform will cease</li>
                      <li>Active subscriptions will be cancelled</li>
                      <li>User content may be deleted</li>
                      <li>Ongoing collaborations may be affected</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Governing Law and Dispute Resolution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Governing Law</h3>
                    <p className="text-sm text-muted-foreground">
                      These Terms are governed by the laws of [Jurisdiction], without regard to 
                      conflict of law principles.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Dispute Resolution</h3>
                    <p className="text-sm text-muted-foreground">
                      Any disputes arising from these Terms or your use of the Platform will be 
                      resolved through binding arbitration in accordance with the rules of [Arbitration Body].
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Class Action Waiver</h3>
                    <p className="text-sm text-muted-foreground">
                      You agree to resolve disputes individually and waive any right to participate 
                      in class action lawsuits.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We reserve the right to modify these Terms at any time. We will notify users of 
                  material changes via email or through the Platform. Continued use after changes 
                  constitutes acceptance of the new Terms.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  If you have questions about these Terms, contact us:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-accent" />
                    <a href="mailto:legal@colabship.io" className="text-accent hover:underline">
                      legal@colabship.io
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>Colabship.io Legal Team</span>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Questions About These Terms?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            We're here to help clarify any questions about our terms of service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="glow-green">
              <a href="mailto:legal@colabship.io">
                Contact Legal Team
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/privacy">
                Privacy Policy
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TermsPage; 