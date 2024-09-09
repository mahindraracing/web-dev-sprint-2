import { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TwitchStyleChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: Date.now(),
        user: {
          name: 'User',
          color: '#' + Math.floor(Math.random() * 16777215).toString(16),
          avatar: `/api/placeholder/32/32`,
        },
        text: inputMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputMessage('');
    }
  };

  return (
    <Card className="w-full bg-white text-black flex flex-col shadow-lg">
      <CardHeader className="bg-gray-100 py-2 px-4 rounded-t-lg">
        <h2 className="text-lg font-semibold text-black">Stream Chat</h2>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-[calc(100vh-300px)] lg:h-[calc(100vh-200px)] w-full px-4" ref={scrollAreaRef}>
          {messages.map((msg) => (
            <div key={msg.id} className="mb-2 flex items-start">
              <Avatar className="w-6 h-6 mr-2 flex-shrink-0">
                <AvatarImage src={msg.user.avatar} alt={msg.user.name} />
                <AvatarFallback>{msg.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-grow min-w-0">
                <div className="flex items-baseline">
                  <span className="font-semibold text-sm mr-2" style={{ color: msg.user.color }}>{msg.user.name}</span>
                  <span className="text-gray-500 text-xs">{msg.timestamp}</span>
                </div>
                <p className="text-sm break-words text-gray-800">{msg.text}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-2 bg-gray-100 rounded-b-lg">
        <div className="flex w-full space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Send a message"
            className="bg-gray-200 text-black text-sm"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} variant="secondary" size="sm" className="bg-red-500 hover:bg-red-600 text-white">
            Chat
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TwitchStyleChat;
