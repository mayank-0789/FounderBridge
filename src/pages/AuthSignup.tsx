import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, AuthError } from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Mail, Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface AuthSignupProps {
  userType: 'developer' | 'recruiter';
}

const AuthSignup = ({ userType }: AuthSignupProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<'google' | 'github' | null>(null);
  const { toast } = useToast();

  const handleAuth = async (provider: 'google' | 'github') => {
    try {
      setIsLoading(provider);
      const authProvider = provider === 'google' ? googleProvider : githubProvider;
      const result = await signInWithPopup(auth, authProvider);
      const user = result.user;

      if (!user.email) {
        throw new Error('No email provided from authentication provider');
      }

      // Navigate to the appropriate signup page with user data
      navigate(`/signup/${userType}`, {
        state: {
          name: user.displayName || '',
          email: user.email,
          photoURL: user.photoURL
        }
      });
    } catch (error) {
      console.error('Auth error:', error);
      
      // Handle specific Firebase auth errors
      if (error instanceof AuthError) {
        switch (error.code) {
          case 'auth/popup-closed-by-user':
            toast({
              title: "Authentication Cancelled",
              description: "You closed the authentication window. Please try again.",
              variant: "default"
            });
            break;
          case 'auth/popup-blocked':
            toast({
              title: "Popup Blocked",
              description: "Please allow popups for this site and try again.",
              variant: "destructive"
            });
            break;
          case 'auth/unauthorized-domain':
            toast({
              title: "Domain Not Authorized",
              description: "This domain is not authorized for authentication. Please contact support.",
              variant: "destructive"
            });
            break;
          default:
            toast({
              title: "Authentication Error",
              description: "Failed to sign in. Please try again.",
              variant: "destructive"
            });
        }
      } else {
        toast({
          title: "Authentication Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Sign Up as {userType === 'developer' ? 'Developer' : 'Recruiter'}</CardTitle>
          <CardDescription>Choose your preferred sign-up method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleAuth('google')}
            disabled={isLoading !== null}
          >
            {isLoading === 'google' ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Mail className="mr-2 h-4 w-4" />
            )}
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleAuth('github')}
            disabled={isLoading !== null}
          >
            {isLoading === 'github' ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Github className="mr-2 h-4 w-4" />
            )}
            Continue with GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export { AuthSignup };
