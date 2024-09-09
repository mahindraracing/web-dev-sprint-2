import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, Lock, User, MessageCircle } from "lucide-react";

// authentication function
const authenticateUser = async (email, password) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return email === "admin@formula-e.com" && password === "raceadmin123";
};

function StreamingChat () {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const simulateStreaming = async (message) => {
    setIsStreaming(true);
    const words = message.split(' ');
    for (let i = 0; i < words.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setMessages(prev => {
        const newMessages = [...prev];
        if (i === 0) {
          newMessages.push({ text: words[i], isUser: false });
        } else {
          newMessages[newMessages.length - 1].text += ' ' + words[i];
        }
        return newMessages;
      });
    }
    setIsStreaming(false);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages(prev => [...prev, { text: inputMessage, isUser: true }]);
      setInputMessage('');
      simulateStreaming("Olá! Seja bem vindo ao nosso sistema de suporte da Mahindra, está tendo problemas pra logar?");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-4 bg-gray-800 border-red-600 border-2">
      <CardHeader>
        <h2 className="text-2xl font-bold text-white">Support Chat</h2>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full pr-4">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.isUser ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${msg.isUser ? 'bg-red-600 text-white' : 'bg-gray-700 text-white'}`}>
                {msg.text}
              </span>
            </div>
          ))}
          {isStreaming && <div className="text-gray-400">Assistente está digitando...</div>}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <div className="flex w-full space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="bg-gray-700 text-white border-gray-600 focus:border-red-600"
          />
          <Button onClick={handleSendMessage} disabled={isStreaming} className="bg-red-600 hover:bg-red-700 text-white">
            Send
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const isAuthenticated = await authenticateUser(email, password);
      if (isAuthenticated) {
        console.log("login feito");
        navigate("/dashboard");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError(`An error occurred. Please try again later. ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center bg-blend-overlay p-4">
      <Card className="w-full max-w-md bg-gray-800 border-red-600 border-2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center text-white">
            Formula E Admin
          </CardTitle>
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-red-600 rounded"></div>
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
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@formula-e.com"
                  className="pl-10 bg-gray-700 text-white border-gray-600 focus:border-red-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-gray-700 text-white border-gray-600 focus:border-red-600"
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
              className="w-full bg-red-600 hover:bg-red-700 text-white"
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
              className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
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