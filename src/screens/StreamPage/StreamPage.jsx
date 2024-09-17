import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Copy, Eye, Share2, Users } from 'lucide-react';
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { streams } from '@/data/streams';
import ChatLivePage from '@/components/ChatLivePage';


export default function StreamPage() {
    const { id } = useParams();
    const stream = streams.find((s) => s.id === id);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const shareableLink = `https://site-mahindra.netlify.app/stream/${id}`;

    const handleFollowClick = () => {
        setIsFollowing(true);
    };

    const handleShareClick = () => {
        setIsShareModalOpen(true);
    };

    const handleCopyClick = () => {
        navigator.clipboard.writeText(shareableLink);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); 
    };

    if (!stream) {
        return <div className="container mx-auto py-8 px-4 text-center text-xl text-gray-700">Stream not found</div>;
    }

    return (
        <>
        <div className='flex justify-center items-center flex-col'>
        <TooltipProvider>
            <div className="container mx-auto py-8 px-4">
                <Card className="mb-8 overflow-hidden shadow-lg rounded-lg">
                    <CardHeader className="relative p-0">
                        <div className="relative">
                            <img
                                src={stream.thumbnail}
                                alt={stream.title}
                                className="w-full h-[320px] sm:h-[480px] object-cover transition-transform duration-300"
                            />
                            <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-500 via-pink-600 to-red-500 text-lg py-1 px-3">
                                LIVE
                            </Badge>
                            <Tooltip content={`${stream.viewers} are watching`}>
                                <Badge className="absolute top-4 right-4 bg-gray-800 text-lg py-1 px-3 flex items-center space-x-2">
                                    <Eye className="w-5 h-5" />
                                    <span>{stream.viewers}</span>
                                </Badge>
                            </Tooltip>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        <div className="flex items-center mb-4">
                            <Avatar className="h-16 w-16 mr-4 shadow-lg">
                                <AvatarImage src={stream.streamer.avatar} />
                                <AvatarFallback>{stream.streamer.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-2xl font-bold text-gray-800 mb-1">{stream.title}</CardTitle>
                                <p className="text-lg text-gray-600">{stream.streamer.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center text-gray-500 space-x-4 mb-6">
                            <Users className="w-5 h-5 mr-2" />
                            <span>{stream.category}</span>
                            <Eye className="w-5 h-5 mr-2" />
                            <span>{stream.viewers} viewers</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-lg">{stream.description}</p>

                        <div className="flex justify-between items-center mt-8">
                            <Button
                                className={`bg-red-600 text-white hover:bg-red-700 ${isFollowing ? "bg-green-600" : ""}`}
                                onClick={handleFollowClick}
                                disabled={isFollowing}
                            >
                                {isFollowing ? "Following" : `Follow ${stream.streamer.name}`}
                            </Button>
                            <Tooltip content="Click to see more">
                                <Button variant="outline" className="hover:bg-gray-100" onClick={handleShareClick}>
                                   <Share2/>
                                </Button>
                            </Tooltip>
                        </div>
                    </CardContent>
                </Card>

                <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Share this Stream</DialogTitle>
                        </DialogHeader>
                        <p className="mb-4">Share this stream with others by copying the link below:</p>
                        <div className="flex items-center justify-between">
                            <input
                                type="text"
                                readOnly
                                value={shareableLink}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                            />
                            <Button onClick={handleCopyClick} className="ml-4 bg-red-600 hover:bg-red-700">
                                {isCopied ? "Copied!" : <Copy/>}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </TooltipProvider>
        
            <ChatLivePage/>
    
        </div>
        </>
    );
}
