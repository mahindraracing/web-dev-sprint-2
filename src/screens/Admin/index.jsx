import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChevronRight, Lock, User, MessageCircle } from "lucide-react";
import StreamingChat from "./ChatBot";
import { useTheme } from "@/contexts/ThemeContext"; // Import the useTheme hook

const authenticateUser = async (email, password) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (email === "admin@formula-e.com" && password === "raceadmin123") {
    return { token: "fake_jwt_token" };
  }
  throw new Error("Invalid credentials");
};

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme } = useTheme(); // Use the theme from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { token } = await authenticateUser(email, password);
      login(token);
      navigate("/dashboard");
    } catch (err) {
      setError(`Invalid email or password. Please try again. ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} p-4`}>
      <Card className={`w-full max-w-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-red-600'} border-2`}>
        <CardHeader className="space-y-1">
          <CardTitle className={`text-3xl font-bold text-center ${theme === 'dark' ? 'text-gray-100' : 'text-black'}`}>
            Formula E Admin
          </CardTitle>
          <div className="flex justify-center">
            <div className={`w-16 h-1 ${theme === 'dark' ? 'bg-red-500' : 'bg-red-600'} rounded`}></div>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </Label>
              <div className="relative">
                <User className={`absolute left-3 top-3 h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@formula-e.com"
                  className={`pl-10 ${theme === 'dark' ? 'bg-gray-700 text-gray-100 border-gray-600 focus:border-red-500' : 'bg-white text-gray-700 border-gray-600 focus:border-red-600'}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </Label>
              <div className="relative">
                <Lock className={`absolute left-3 top-3 h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className={`pl-10 ${theme === 'dark' ? 'bg-gray-700 text-gray-100 border-gray-600 focus:border-red-500' : 'bg-white text-gray-700 border-gray-600 focus:border-red-600'}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button 
              type="submit" 
              className={`w-full ${theme === 'dark' ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                <>
                  Log In <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className={`w-full ${theme === 'dark' ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white' : 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'}`}
              onClick={() => setShowChat(!showChat)}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              {showChat ? "Hide Support Chat" : "Need Help? Open Support Chat"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      {showChat && <StreamingChat />}
    </div>
  );
};

export default AdminLogin;
