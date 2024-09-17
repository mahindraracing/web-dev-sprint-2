import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"
import { Newspaper, TrendingUp, Heart, MessageCircle, Share } from "lucide-react"; 
import posts from "@/data/postData"; 

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};



const SocialMediaApp = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const newPostObj = {
      id: posts.length + 1,
      user: "Mahindra Racing",
      content: newPost,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      comments: 0,
      shares: 0,
    };
    posts.unshift(newPostObj); 
    setNewPost("");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <div className="flex justify-around mb-6">
          <Button
            variant={activeTab === "feed" ? "filled" : "outline"}
            onClick={() => setActiveTab("feed")}
            className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
          >
            <Newspaper className="h-5 w-5 mr-2" /> Feed
          </Button>
          <Button
            variant={activeTab === "trending" ? "filled" : "outline"}
            onClick={() => setActiveTab("trending")}
            className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
          >
            <TrendingUp className="h-5 w-5 mr-2" /> Trending
          </Button>
        </div>

        {/* Conditional Rendering Based on Tab */}
        {activeTab === "feed" && (
          <>
            <motion.div
              className="bg-white shadow-md rounded-lg p-6 mb-6"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <PostForm newPost={newPost} setNewPost={setNewPost} onSubmit={handlePostSubmit} />
            </motion.div>
            <div className="space-y-4">
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  className="bg-white shadow-md rounded-lg p-6"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                >
                  <Post post={post} />
                </motion.div>
              ))}
            </div>
          </>
        )}

        {activeTab === "trending" && (
          <motion.div
            className="bg-white shadow-md rounded-lg p-6"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-bold text-red-600 mb-4">Trending Topics</h2>
            {/* Sample Trending Topic */}
            <ul className="list-disc pl-5">
              <li>#FormulaE2024</li>
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const PostForm = ({ newPost, setNewPost, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <Label htmlFor="new-post" className="text-gray-700 mb-2">
      What's on your mind?
    </Label>
    <Textarea
      id="new-post"
      placeholder="Share your thoughts..."
      value={newPost}
      onChange={(e) => setNewPost(e.target.value)}
      className="border-gray-300 focus:border-red-600"
    />
    <Button
      type="submit"
      className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white"
    >
      Post
    </Button>
  </form>
);

const Post = ({ post }) => (
  <div>
    <h3 className="text-xl font-bold text-gray-900">{post.user}</h3>
    <p className="text-gray-700 mb-2">{post.content}</p>
    <div className="flex justify-between text-gray-600">
      <span>{post.date}</span>
      <div className="flex space-x-4">
        <div className="flex items-center">
          <Heart className="h-5 w-5 text-red-600" /> {post.likes}
        </div>
        <div className="flex items-center">
          <MessageCircle className="h-5 w-5 text-blue-600" /> {post.comments}
        </div>
        <div className="flex items-center">
          <Share className="h-5 w-5 text-green-600" /> {post.shares}
        </div>
      </div>
    </div>
  </div>
);

export default SocialMediaApp;
