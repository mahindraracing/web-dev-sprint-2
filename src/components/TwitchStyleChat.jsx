import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

const TwitchStyleChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const scrollAreaRef = useRef(null);

  const [profileImage, setProfileImage] = useState(() =>
    sessionStorage.getItem("profileImage") || "/api/placeholder/32/32"
  );
  const [profileName, setProfileName] = useState(() =>
    sessionStorage.getItem("profileName") || "User"
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (scrollAreaRef.current) { 
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight; 
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessage = {
        id: Date.now(),
        user: {
          name: profileName,
          color: "#" + Math.floor(Math.random() * 16777215).toString(16),
          avatar: profileImage,
        },
        text: inputMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputMessage("");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setProfileImage(base64String);
        sessionStorage.setItem("profileImage", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage("/api/placeholder/32/32");
    sessionStorage.removeItem("profileImage");
  };

  const handleNameChange = (e) => {
    setProfileName(e.target.value);
    sessionStorage.setItem("profileName", e.target.value);
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="w-full max-w-md bg-white text-black flex flex-col shadow-lg h-full">
        <CardHeader className="bg-gray-100 py-2 px-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold text-black">Stream Chat</h2>
          <input
            type="button"
            value="Edit Profile"
            className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />
        </CardHeader>

        <CardContent className="p-0 flex-grow">
          <ScrollArea className="h-[630px] w-full px-4" ref={scrollAreaRef}>
            {messages.map((msg) => (
              <div key={msg.id} className="mb-2 flex items-center">
                <Avatar className="w-10 h-10 mr-2 flex-shrink-0 m-2">
                  <AvatarImage src={msg.user.avatar} alt={msg.user.name} />
                  <AvatarFallback>{msg.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-grow min-w-0">
                  <div className="flex items-baseline">
                    <span className="font-semibold text-sm mr-2" style={{ color: msg.user.color }}>
                      {msg.user.name}
                    </span>
                    <span className="text-gray-500 text-xs mt-2">{msg.timestamp}</span>
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
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              type="submit"
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm cursor-pointer flex items-center justify-center"
              onClick={handleSendMessage}
            >
              <CircleChevronRight className="w-5 h-5" />
            </button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <h3 className="text-lg font-semibold">Edit Profile</h3>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profileImage} alt="Profile Image" />
              <AvatarFallback>{profileName[0]}</AvatarFallback>
            </Avatar>

            <Input
              value={profileName}
              onChange={handleNameChange}
              placeholder="Enter new name"
              className="bg-gray-200 text-black text-sm px-3 py-2 rounded w-64"
            />

            <label
              className="w-64 px-3 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-200 cursor-pointer text-center"
            >
              Change Image
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </label>

            <input
              type="button"
              value="Remove Image"
              className="w-64 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm cursor-pointer"
              onClick={handleRemoveImage}
            />

            <input
              type="button"
              value="Save"
              className="w-64 px-3 py-2 bg-green-400 hover:bg-green-600 text-black rounded text-sm cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TwitchStyleChat;
