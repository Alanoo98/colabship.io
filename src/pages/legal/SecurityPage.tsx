import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Lock, 
  Eye, 
  CheckCircle, 
  ArrowRight,
  Calendar,
  Globe,
  Mail,
  MapPin,
  Zap,
  AlertTriangle,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/layout/Footer';

const SecurityPage = () => {
  const lastUpdated = "July 30, 2025";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Shield className="w-3 h-3 mr-1" />
              Security
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Security First
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your security and privacy are our top priorities. We implement industry-leading 
              security measures to protect your data and ensure safe collaboration.
            </p>
            <div className="mt-8 text-sm text-muted-foreground">
              <p>Last updated: {lastUpdated}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-12">
            
            {/* Security Commitment */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-accent" />
                  Our Security Commitment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  At Colabship.io, we understand that security is critical for a platform that 
                  facilitates collaboration and handles sensitive project information. We are 
                  committed to maintaining the highest security standards to protect your data.
                </p>
                <p>
                  Our security program is designed to protect against threats, ensure data integrity, 
                  and maintain platform availability while enabling seamless collaboration.
                </p>
              </CardContent>
            </Card>

            {/* Data Protection */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-accent" />
                  Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Encryption</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>End-to-end encryption for sensitive data</li>
                      <li>TLS 1.3 for data in transit</li>
                      <li>AES-256 encryption for data at rest</li>
                      <li>Encrypted backups and archives</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Access Controls</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Multi-factor authentication (MFA)</li>
                      <li>Role-based access controls</li>
                      <li>Session management and timeouts</li>
                      <li>Privileged access monitoring</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Infrastructure Security */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Infrastructure Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Cloud Security</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Enterprise-grade cloud infrastructure</li>
                      <li>Regular security updates and patches</li>
                      <li>Network segmentation and firewalls</li>
                      <li>DDoS protection and mitigation</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Monitoring & Detection</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>24/7 security monitoring</li>
                      <li>Intrusion detection systems</li>
                      <li>Anomaly detection and alerting</li>
                      <li>Security event logging and analysis</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Security */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Application Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Secure Development</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Secure coding practices and standards</li>
                      <li>Regular security code reviews</li>
                      <li>Automated vulnerability scanning</li>
                      <li>Penetration testing and assessments</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">API Security</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>API rate limiting and throttling</li>
                      <li>Input validation and sanitization</li>
                      <li>OAuth 2.0 and JWT authentication</li>
                      <li>API versioning and deprecation policies</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-accent" />
                  Compliance & Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Data Protection</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>GDPR compliance</li>
                      <li>CCPA compliance</li>
                      <li>Data residency requirements</li>
                      <li>Privacy by design principles</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Security Standards</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>ISO 27001 framework</li>
                      <li>SOC 2 Type II compliance</li>
                      <li>OWASP security guidelines</li>
                      <li>Industry best practices</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Incident Response */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-accent" />
                  Incident Response
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Response Plan</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>24/7 incident response team</li>
                      <li>Automated threat detection</li>
                      <li>Escalation procedures</li>
                      <li>Communication protocols</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">User Notification</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Timely notification of security incidents</li>
                      <li>Transparent communication about impacts</li>
                      <li>Guidance on protective measures</li>
                      <li>Post-incident reporting and lessons learned</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Security */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>User Security Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Account Protection</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Strong password requirements</li>
                      <li>Multi-factor authentication (MFA)</li>
                      <li>Account lockout protection</li>
                      <li>Suspicious activity detection</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Privacy Controls</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Granular privacy settings</li>
                      <li>Data export and deletion tools</li>
                      <li>Consent management</li>
                      <li>Transparency controls</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Third-Party Security */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Third-Party Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Vendor Management</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Security assessments of third-party vendors</li>
                      <li>Data processing agreements (DPAs)</li>
                      <li>Regular vendor security reviews</li>
                      <li>Incident response coordination</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Integration Security</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Secure API integrations</li>
                      <li>OAuth 2.0 for third-party connections</li>
                      <li>Limited scope permissions</li>
                      <li>Regular integration security audits</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Best Practices */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Security Best Practices for Users</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Account Security</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Use strong, unique passwords</li>
                      <li>Enable multi-factor authentication</li>
                      <li>Regular password updates</li>
                      <li>Monitor account activity</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Data Protection</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Be cautious with sensitive information</li>
                      <li>Use secure communication channels</li>
                      <li>Regular data backups</li>
                      <li>Report suspicious activity</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Reporting */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Security Reporting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We encourage responsible disclosure of security vulnerabilities. If you discover 
                  a security issue, please report it to us immediately.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-accent" />
                    <a href="mailto:security@colabship.io" className="text-accent hover:underline">
                      security@colabship.io
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Please include detailed information about the vulnerability and steps to reproduce it.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Security Updates */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Security Updates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We regularly update our security measures and will notify users of significant 
                  security improvements or changes to our security practices.
                </p>
                <p className="text-sm text-muted-foreground">
                  This security page is updated regularly to reflect our current security practices 
                  and commitments.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Security Questions?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Our security team is here to address any concerns about data protection and platform security.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="glow-green">
              <a href="mailto:security@colabship.io">
                Contact Security Team
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

export default SecurityPage; 