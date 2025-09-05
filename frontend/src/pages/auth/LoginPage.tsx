import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Github, 
  Chrome, 
  Rocket,
  Code,
  Zap,
  Shield,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      console.log('🚀 Attempting demo login...');
      const result = await signIn('admin@example.com', 'admin123');
      console.log('✅ Demo login result:', result);
      
      if (result.error) {
        console.error('❌ Demo login error:', result.error);
        throw result.error;
      }
      
      console.log('🎉 Demo login successful, navigating to dashboard...');
      // Navigate to the protected dashboard
      console.log('🚀 About to navigate to /dashboard...');
      navigate('/dashboard', { replace: true });
      console.log('✅ Navigation called successfully');
    } catch (err: any) {
      console.error('💥 Demo login failed:', err);
      setError(err.message || 'Demo login failed - check console for details');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Code,
      title: "Smart Matching",
      description: "Find collaborators based on complementary skills"
    },
    {
      icon: Zap,
      title: "Legal Templates",
      description: "Ready-to-use contracts and agreements"
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Secure collaboration environment"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Features */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Rocket className="w-8 h-8 text-accent" />
              <h1 className="text-3xl font-bold">Welcome to Colabship</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              The platform where indie developers find their perfect collaborators
            </p>
          </div>

          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-card/50 rounded-lg p-6 border border-border">
            <h3 className="font-semibold mb-3">Developer Stats</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-2xl font-bold text-accent">500+</div>
                <div className="text-muted-foreground">Active Developers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">150+</div>
                <div className="text-muted-foreground">Projects Created</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">95%</div>
                <div className="text-muted-foreground">Match Success Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">24/7</div>
                <div className="text-muted-foreground">Support Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Rocket className="w-8 h-8 text-accent" />
                  <span className="text-2xl font-bold">Colabship</span>
                </div>
                <CardTitle className="text-xl">
                  {isSignUp ? 'Create Your Account' : 'Welcome Back'}
                </CardTitle>
                <p className="text-muted-foreground">
                  {isSignUp 
                    ? 'Join thousands of developers building amazing projects together'
                    : 'Sign in to access your dashboard and collaborations'
                  }
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Demo Login Button */}
              <Button 
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Chrome className="w-4 h-4 mr-2" />
                Try Demo (admin@example.com)
              </Button>

              {/* Test Direct Access Button */}
              <Button 
                onClick={() => navigate('/dashboard', { replace: true })}
                variant="outline"
                className="w-full"
              >
                🧪 Test Direct Dashboard Access
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                {!isSignUp && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="remember" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-accent hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      {isSignUp ? 'Creating Account...' : 'Signing In...'}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {isSignUp ? 'Create Account' : 'Sign In'}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-accent hover:underline font-medium"
                  >
                    {isSignUp ? 'Sign in' : 'Sign up'}
                  </button>
                </p>
              </div>

              {/* Social Login */}
              <div className="space-y-3">
                <Button variant="outline" className="w-full" disabled>
                  <Github className="w-4 h-4 mr-2" />
                  Continue with GitHub
                  <Badge variant="secondary" className="ml-2 text-xs">
                    Coming Soon
                  </Badge>
                </Button>
              </div>

              {/* Terms */}
              <p className="text-xs text-muted-foreground text-center">
                By continuing, you agree to our{' '}
                <Link to="/terms" className="text-accent hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-accent hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 