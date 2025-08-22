import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Eye, 
  Lock, 
  Users, 
  ArrowRight,
  Calendar,
  Globe,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/layout/Footer';

const PrivacyPage = () => {
  const lastUpdated = "July 30, 2025";
  const effectiveDate = "July 30, 2025";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Shield className="w-3 h-3 mr-1" />
              Privacy Policy
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Your Privacy Matters
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're committed to protecting your privacy and being transparent about how we collect, 
              use, and protect your personal information.
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
            
            {/* Introduction */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-accent" />
                  Introduction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Colabship.io ("we," "our," or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                  information when you use our platform for finding collaborators and building projects together.
                </p>
                <p>
                  This policy complies with the General Data Protection Regulation (GDPR) and other 
                  applicable privacy laws. By using our service, you agree to the collection and use 
                  of information in accordance with this policy.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-accent" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Name, email address, and contact information</li>
                    <li>Profile information (skills, experience, availability)</li>
                    <li>Project details and collaboration preferences</li>
                    <li>Communication history within the platform</li>
                    <li>Payment information (processed securely by third-party providers)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Technical Information</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Usage data and analytics</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Information from Third Parties</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Authentication providers (Google, GitHub, etc.)</li>
                    <li>Payment processors</li>
                    <li>Analytics services</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Your Information */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-accent" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Core Services</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Facilitate collaboration matching</li>
                      <li>Provide communication tools</li>
                      <li>Generate legal documents</li>
                      <li>Process payments and subscriptions</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Improvement & Support</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Improve our platform and services</li>
                      <li>Provide customer support</li>
                      <li>Send important updates and notifications</li>
                      <li>Ensure platform security and compliance</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Legal Basis for Processing (GDPR) */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-accent" />
                  Legal Basis for Processing (GDPR)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Under GDPR, we process your personal data based on the following legal grounds:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Contract Performance</h4>
                      <p className="text-sm text-muted-foreground">
                        Processing necessary to provide our services and fulfill our contractual obligations.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Legitimate Interest</h4>
                      <p className="text-sm text-muted-foreground">
                        Processing for platform improvement, security, and fraud prevention.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Consent</h4>
                      <p className="text-sm text-muted-foreground">
                        For marketing communications and optional features (withdrawable at any time).
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Sharing */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Data Sharing and Disclosure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We do not sell your personal information. We may share your data in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li><strong>Service Providers:</strong> Trusted third parties who help us operate our platform</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
                </ul>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Your Privacy Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  You have the following rights regarding your personal data:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      <span className="text-sm font-medium">Access your data</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      <span className="text-sm font-medium">Correct inaccurate data</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      <span className="text-sm font-medium">Delete your data</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      <span className="text-sm font-medium">Port your data</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      <span className="text-sm font-medium">Restrict processing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      <span className="text-sm font-medium">Withdraw consent</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  To exercise these rights, contact us at{' '}
                  <a href="mailto:privacy@colabship.io" className="text-accent hover:underline">
                    privacy@colabship.io
                  </a>
                </p>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We implement appropriate technical and organizational measures to protect your data:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication</li>
                  <li>Employee training on data protection</li>
                  <li>Incident response procedures</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We retain your personal data only as long as necessary to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Provide our services</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes</li>
                  <li>Enforce our agreements</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  Account data is typically retained for 3 years after account deletion, 
                  unless longer retention is required by law.
                </p>
              </CardContent>
            </Card>

            {/* International Transfers */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>International Data Transfers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Your data may be transferred to and processed in countries other than your own. 
                  We ensure appropriate safeguards are in place, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Standard Contractual Clauses (SCCs)</li>
                  <li>Adequacy decisions</li>
                  <li>Other appropriate safeguards</li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  If you have questions about this Privacy Policy or our data practices, contact us:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-accent" />
                    <a href="mailto:privacy@colabship.io" className="text-accent hover:underline">
                      privacy@colabship.io
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>Colabship.io Privacy Team</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  You also have the right to lodge a complaint with your local data protection authority.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Questions About Privacy?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            We're committed to transparency and protecting your data. 
            Don't hesitate to reach out if you have any concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="glow-green">
              <a href="mailto:privacy@colabship.io">
                Contact Privacy Team
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">
                General Contact
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PrivacyPage; 