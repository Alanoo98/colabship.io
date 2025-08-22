import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Cookie, 
  Settings, 
  Eye, 
  Shield, 
  ArrowRight,
  Calendar,
  Globe,
  Mail,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/layout/Footer';

const CookiesPage = () => {
  const lastUpdated = "July 30, 2025";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Cookie className="w-3 h-3 mr-1" />
              Cookies Policy
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Cookie Policy
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We use cookies and similar technologies to enhance your experience, 
              analyze usage, and provide personalized content.
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
            
            {/* Introduction */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="w-5 h-5 mr-2 text-accent" />
                  What Are Cookies?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Cookies are small text files that are stored on your device when you visit our website. 
                  They help us provide you with a better experience by remembering your preferences, 
                  analyzing how you use our site, and personalizing content.
                </p>
                <p>
                  This policy explains how we use cookies and similar technologies on Colabship.io, 
                  and how you can control them.
                </p>
              </CardContent>
            </Card>

            {/* Types of Cookies */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Types of Cookies We Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Essential Cookies</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      These cookies are necessary for the website to function properly.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Authentication and security</li>
                      <li>Session management</li>
                      <li>Basic functionality</li>
                      <li>Cannot be disabled</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Functional Cookies</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      These cookies enhance your experience by remembering your preferences.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Language preferences</li>
                      <li>Theme settings</li>
                      <li>User interface preferences</li>
                      <li>Can be disabled</li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Analytics Cookies</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      These cookies help us understand how visitors use our website.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Page views and navigation</li>
                      <li>Feature usage statistics</li>
                      <li>Performance monitoring</li>
                      <li>Can be disabled</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Marketing Cookies</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      These cookies are used to deliver relevant advertisements.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Ad personalization</li>
                      <li>Campaign effectiveness</li>
                      <li>Cross-site tracking</li>
                      <li>Can be disabled</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specific Cookies */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Specific Cookies We Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Our Own Cookies</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Cookie Name</th>
                            <th className="text-left py-2">Purpose</th>
                            <th className="text-left py-2">Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2 font-mono">session_id</td>
                            <td className="py-2">User authentication and session management</td>
                            <td className="py-2">Session</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-mono">user_preferences</td>
                            <td className="py-2">Store user interface preferences</td>
                            <td className="py-2">1 year</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-mono">csrf_token</td>
                            <td className="py-2">Cross-site request forgery protection</td>
                            <td className="py-2">Session</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Third-Party Cookies</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Provider</th>
                            <th className="text-left py-2">Purpose</th>
                            <th className="text-left py-2">Privacy Policy</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2">Google Analytics</td>
                            <td className="py-2">Website analytics and performance monitoring</td>
                            <td className="py-2">
                              <a href="https://policies.google.com/privacy" className="text-accent hover:underline">
                                View Policy
                              </a>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Stripe</td>
                            <td className="py-2">Payment processing and fraud prevention</td>
                            <td className="py-2">
                              <a href="https://stripe.com/privacy" className="text-accent hover:underline">
                                View Policy
                              </a>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Supabase</td>
                            <td className="py-2">Database and authentication services</td>
                            <td className="py-2">
                              <a href="https://supabase.com/privacy" className="text-accent hover:underline">
                                View Policy
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cookie Consent */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-accent" />
                  Cookie Consent
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Consent Management</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Clear consent request on first visit</li>
                      <li>Granular control over cookie categories</li>
                      <li>Easy consent withdrawal at any time</li>
                      <li>Consent preferences stored for future visits</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Consent Requirements</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Explicit consent for non-essential cookies</li>
                      <li>Clear information about cookie purposes</li>
                      <li>Easy way to accept or decline</li>
                      <li>No pre-ticked boxes for optional cookies</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Managing Cookies */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-accent" />
                  Managing Your Cookie Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Browser Settings</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Chrome: Settings → Privacy and security → Cookies</li>
                      <li>Firefox: Options → Privacy & Security → Cookies</li>
                      <li>Safari: Preferences → Privacy → Cookies</li>
                      <li>Edge: Settings → Cookies and site permissions</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Our Cookie Settings</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Cookie consent banner on our website</li>
                      <li>Cookie settings page in your account</li>
                      <li>One-click opt-out for marketing cookies</li>
                      <li>Preference center for detailed control</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Important Note</h3>
                  <p className="text-sm text-muted-foreground">
                    Disabling certain cookies may affect the functionality of our website. 
                    Essential cookies cannot be disabled as they are necessary for basic site operation.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Data Collection */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Data Collected Through Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Information We Collect</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>IP address and device information</li>
                      <li>Browser type and version</li>
                      <li>Pages visited and time spent</li>
                      <li>User preferences and settings</li>
                      <li>Interaction with features and content</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">How We Use This Data</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Improve website functionality and performance</li>
                      <li>Personalize user experience</li>
                      <li>Analyze usage patterns and trends</li>
                      <li>Provide relevant content and recommendations</li>
                      <li>Ensure security and prevent fraud</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Third-Party Services */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Third-Party Services and Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We use third-party services that may set their own cookies. These services help us 
                  provide better functionality and analyze our website performance.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Analytics Services</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Google Analytics for website analytics</li>
                      <li>Mixpanel for user behavior analysis</li>
                      <li>Hotjar for user experience insights</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Essential Services</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Cloudflare for security and performance</li>
                      <li>Stripe for payment processing</li>
                      <li>Supabase for database and authentication</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Updates to Policy */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Updates to This Cookie Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We may update this Cookie Policy from time to time to reflect changes in our 
                  practices or for other operational, legal, or regulatory reasons.
                </p>
                <p className="text-sm text-muted-foreground">
                  When we make changes, we will notify you by updating the "Last updated" date 
                  at the top of this policy and, where appropriate, through other means such as 
                  email or a notice on our website.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  If you have questions about our use of cookies or this Cookie Policy, please contact us:
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
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Cookie Questions?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            We're here to help you understand how we use cookies and manage your preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="glow-green">
              <a href="mailto:privacy@colabship.io">
                Contact Privacy Team
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

export default CookiesPage; 