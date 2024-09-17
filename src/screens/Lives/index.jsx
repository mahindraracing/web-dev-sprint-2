import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Eye, Users, Bell, Calendar, Share2 } from 'lucide-react';
import { streams, posts as initialPosts, upcomingStreams } from '@/data/streams'; 
import { useTheme } from '@/contexts/ThemeContext'; 

export default function Lives() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    authorName: '',
    authorAvatar: '',
  });
  const { theme } = useTheme(); 

  useEffect(() => {
    const storedPosts = sessionStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPostData = {
      id: String(posts.length + 1),
      title: newPost.title,
      content: newPost.content,
      date: new Date().toISOString().split('T')[0],
      author: {
        name: newPost.authorName,
        avatar: newPost.authorAvatar || '/api/placeholder/64/64',
      },
    };
    setPosts((prevPosts) => [...prevPosts, newPostData]);
    setNewPost({
      title: '',
      content: '',
      authorName: '',
      authorAvatar: '',
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`container mx-auto py-12 px-4 space-y-16 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}
    >
      <motion.section variants={itemVariants}>
        <h1 className={`text-5xl font-bold mb-10 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Live Streams 🏎️</h1>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {streams.map((stream) => (
            <motion.div key={stream.id} variants={itemVariants}>
              <Link to={`/stream/${stream.id}`} className="no-underline">
                <Card className={`hover:shadow-xl transition-all duration-300 h-full transform hover:scale-105 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <CardHeader className="relative p-0 overflow-hidden">
                    <motion.img 
                      src={stream.thumbnail} 
                      alt={stream.title} 
                      className="w-full h-56 object-cover rounded-t-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <Badge className={`absolute top-2 left-2 ${theme === 'dark' ? 'bg-red-500' : 'bg-red-600'}`}>LIVE</Badge>
                    <Badge className={`absolute top-2 right-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-800'} flex items-center`}>
                      <Eye className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-100'}`} />
                      {stream.viewers}
                    </Badge>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex items-center mb-2">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={stream.streamer.avatar} />
                        <AvatarFallback>{stream.streamer.name[0]}</AvatarFallback>
                      </Avatar>
                      <CardTitle className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{stream.title}</CardTitle>
                    </div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{stream.streamer.name}</p>
                  </CardContent>
                  <CardFooter className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex items-center mt-auto space-x-2`}>
                    <Users className="w-4 h-4" />
                    <span>{stream.category}</span>
                    <motion.div 
                      whileHover={{ scale: 1.2 }} 
                      whileTap={{ scale: 0.9 }}
                      className="ml-auto"
                    >
                      <Bell className={`w-5 h-5 cursor-pointer hover:${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`} title="Get notified" />
                    </motion.div>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section variants={itemVariants}>
        <h2 className={`text-4xl font-semibold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Upcoming Streams</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {upcomingStreams.map((stream) => (
            <motion.div key={stream.id} variants={itemVariants}>
              <Card className={`hover:shadow-xl transition-all duration-300 h-full transform hover:scale-105 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <CardHeader className="relative p-0 overflow-hidden">
                  <motion.img 
                    src={stream.thumbnail} 
                    alt={stream.title} 
                    className="w-full h-56 object-cover rounded-t-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <Badge className={`absolute top-2 left-2 ${theme === 'dark' ? 'bg-yellow-500' : 'bg-yellow-600'} flex items-center`}>
                    <Calendar className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-100'}`} />
                    {stream.date}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex items-center mb-2">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={stream.streamer.avatar} />
                      <AvatarFallback>{stream.streamer.name[0]}</AvatarFallback>
                    </Avatar>
                    <CardTitle className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{stream.title}</CardTitle>
                  </div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{stream.streamer.name}</p>
                </CardContent>
                <CardFooter className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex items-center mt-auto`}>
                  <Users className="w-4 h-4 mr-1" />
                  {stream.category}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section variants={itemVariants}>
        <h2 className={`text-4xl font-semibold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Recent Posts</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {posts.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <Card className={`hover:shadow-xl transition-all duration-300 h-full transform hover:scale-105 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <CardHeader className={`relative p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{post.title}</CardTitle>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>By {post.author.name}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {post.content.slice(0, 100)}... <Link to={`/post/${post.id}`} className="text-blue-600 hover:underline">Read more</Link>
                </CardContent>
                <CardFooter className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex items-center mt-auto space-x-4`}>
                  <span>{post.date}</span>
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="text-red-600 flex items-center space-x-1 hover:underline"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </motion.button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
}