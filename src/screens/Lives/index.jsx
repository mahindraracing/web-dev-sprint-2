import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Eye, Users, Bell, Calendar, Share2 } from 'lucide-react';
import { streams, posts as initialPosts, upcomingStreams } from '@/data/streams'; 
import { useTheme } from '@/contexts/ThemeContext'; // Import the useTheme hook

export default function Lives() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    authorName: '',
    authorAvatar: '',
  });
  const { theme } = useTheme(); // Use the theme from context

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
        avatar: newPost.authorAvatar || 'https://via.placeholder.com/64', 
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

  return (
    <div className={`container mx-auto py-8 px-4 space-y-12 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
      <section>
        <h1 className={`text-4xl font-bold mb-8 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Live Streams 🏎️</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {streams.map((stream) => (
            <Link to={`/stream/${stream.id}`} key={stream.id} className="no-underline">
              <Card className={`hover:shadow-lg transition-shadow duration-300 h-full ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <CardHeader className="relative p-0">
                  <img src={stream.thumbnail} alt={stream.title} className="w-full h-48 object-cover rounded-t-lg" />
                  <Badge className={`absolute top-2 left-2 ${theme === 'dark' ? 'bg-red-500' : 'bg-red-600'}`}>LIVE</Badge>
                  <Badge className={`absolute top-2 right-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-800'} flex items-center`}>
                    <Eye className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-100'}`} />
                    {stream.viewers}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex items-center mb-2">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={stream.streamer.avatar} />
                      <AvatarFallback>{stream.streamer.name[0]}</AvatarFallback>
                    </Avatar>
                    <CardTitle className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{stream.title}</CardTitle>
                  </div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{stream.streamer.name}</p>
                </CardContent>
                <CardFooter className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex items-center mt-auto space-x-2`}>
                  <Users className="w-4 h-4" />
                  <span>{stream.category}</span>
                  <Bell className={`w-4 h-4 ml-auto cursor-pointer hover:${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`} title="Get notified" />
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Upcoming Streams Section */}
      <section>
        <h2 className={`text-3xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Upcoming Streams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingStreams.map((stream) => (
            <Card key={stream.id} className={`hover:shadow-lg transition-shadow duration-300 h-full ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <CardHeader className="relative p-0">
                <img src={stream.thumbnail} alt={stream.title} className="w-full h-48 object-cover rounded-t-lg" />
                <Badge className={`absolute top-2 left-2 ${theme === 'dark' ? 'bg-yellow-500' : 'bg-yellow-600'} flex items-center`}>
                  <Calendar className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-100'}`} />
                  {stream.date}
                </Badge>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-center mb-2">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={stream.streamer.avatar} />
                    <AvatarFallback>{stream.streamer.name[0]}</AvatarFallback>
                  </Avatar>
                  <CardTitle className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{stream.title}</CardTitle>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{stream.streamer.name}</p>
              </CardContent>
              <CardFooter className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex items-center mt-auto`}>
                <Users className="w-4 h-4 mr-1" />
                {stream.category}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className={`text-3xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Recent Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className={`hover:shadow-lg transition-shadow duration-300 h-full ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <CardHeader className={`relative p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{post.title}</CardTitle>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>By {post.author.name}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {post.content.slice(0, 100)}... <Link to={`/post/${post.id}`} className="text-blue-600">Read more</Link>
              </CardContent>
              <CardFooter className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex items-center mt-auto space-x-4`}>
                <span>{post.date}</span>
                <button className="text-red-600 flex items-center space-x-1 hover:underline">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className={`text-3xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>New Post</h2>
        <form onSubmit={handleSubmit} className={`p-4 border rounded-lg shadow ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}`}>
          <div className="mb-4">
            <label htmlFor="title" className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-semibold mb-2`}>Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={newPost.title}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-800'}`}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-semibold mb-2`}>Content</label>
            <textarea
              id="content"
              name="content"
              value={newPost.content}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-800'}`}
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="authorName" className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-semibold mb-2`}>Author Name</label>
            <input
              id="authorName"
              name="authorName"
              type="text"
              value={newPost.authorName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-800'}`}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="authorAvatar" className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-semibold mb-2`}>Author Avatar URL (Optional)</label>
            <input
              id="authorAvatar"
              name="authorAvatar"
              type="text"
              value={newPost.authorAvatar}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-800'}`}
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 ${theme === 'dark' ? 'bg-red-500 hover:bg-red-600' : 'bg-red-600 hover:bg-red-700'} text-white rounded-lg transition`}
          >
            Add Post
          </button>
        </form>
      </section>
    </div>
  );
}
