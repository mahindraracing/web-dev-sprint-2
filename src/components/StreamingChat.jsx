import { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const StreamingChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

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
      simulateStreaming("This is a simulated streaming response to your message. It will appear word by word to mimic a real-time chat experience.");
    }
  };

  return (
    <div className="p-4 border-t border-gray-700 flex space-x-2">
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Streaming Chat</h2>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full pr-4" ref={scrollAreaRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.isUser ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${msg.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                {msg.text}
              </span>
            </div>
          ))}
          {isStreaming && <div className="text-gray-500">Assistant is typing...</div>}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <div className="flex w-full space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} disabled={isStreaming}>Send</Button>
        </div>
      </CardFooter>
    </Card>
    </div>
  );
};

export default StreamingChat;