import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Newspaper, TrendingUp, Heart, MessageCircle, Share, User } from "lucide-react";
import postsData from "@/data/postData";





const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


const defaultHeaderImage = "/header.jpeg";
const defaultProfileImage = "/mahindra.png";


const Modal = ({ isOpen, onClose, onSave, profileData }) => {
  const [tempDescription, setTempDescription] = useState(profileData.description);
  const [tempName, setTempName] = useState(profileData.name);
  const [tempHandle, setTempHandle] = useState(profileData.handle);
  const [headerImage, setHeaderImage] = useState(profileData.headerImage || defaultHeaderImage);
  const [profileImage, setProfileImage] = useState(profileData.profileImage || defaultProfileImage);

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (type === "header") setHeaderImage(imageUrl);
      if (type === "profile") setProfileImage(imageUrl);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

        <div className="mb-6">
          <Label htmlFor="header-image" className="text-gray-700 mb-2 block">
            Header Image
          </Label>
          <input
            type="file"
            id="header-image"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "header")}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-white file:bg-red-600 file:hover:bg-red-700"
          />
          <img
            src={headerImage}
            alt="Header Preview"
            className="mt-4 w-full h-32 object-cover rounded-lg"
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="profile-image" className="text-gray-700 mb-2 block">
            Profile Image
          </Label>
          <input
            type="file"
            id="profile-image"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "profile")}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-white file:bg-red-600 file:hover:bg-red-700"
          />
          <img
            src={profileImage}
            alt="Profile Preview"
            className="mt-4 w-24 h-24 rounded-full border-4 border-gray-300"
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="profile-name" className="text-gray-700 mb-2 block">
            Name
          </Label>
          <input
            type="text"
            id="profile-name"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="profile-handle" className="text-gray-700 mb-2 block">
            Handle (e.g., @username)
          </Label>
          <input
            type="text"
            id="profile-handle"
            value={tempHandle}
            onChange={(e) => setTempHandle(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="modal-description" className="text-gray-700 mb-2 block">
            Description
          </Label>
          <Textarea
            id="modal-description"
            value={tempDescription}
            onChange={(e) => setTempDescription(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            rows="4"
          />
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <Button
            onClick={onClose}
            variant="outline"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={() => { onSave(tempName, tempHandle, tempDescription, headerImage, profileImage); onClose(); }}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};


const PostForm = ({ newPost, setNewPost, onSubmit, userName, userHandle, userAvatar }) => (
  <div className="flex items-start bg-white shadow-md rounded-lg p-6">
    <img
      src={userAvatar}
      alt="User Avatar"
      className="w-12 h-12 rounded-full border-2 border-gray-300 mr-4"
    />
    <form onSubmit={onSubmit} className="flex-1">
      <Label htmlFor="new-post" className="text-gray-700 mb-2 block">
        What's on your mind, {userName} {userHandle}?
      </Label>
      <Textarea
        id="new-post"
        placeholder="Share your thoughts..."
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
        rows="4"
      />
      <Button
        type="submit"
        className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white"
      >
        Post
      </Button>
    </form>
  </div>
);

const SocialMediaApp = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const [newPost, setNewPost] = useState("");
  const [description, setDescription] = useState("Welcome to Mahindra Racing Profile.");
  const [name, setName] = useState("Mahindra Racing");
  const [handle, setHandle] = useState("@mahindraracing");
  const [headerImage, setHeaderImage] = useState(defaultHeaderImage);
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [profilePosts, setProfilePosts] = useState(postsData.filter(post => post.user === "Mahindra Racing")); 
  const [likedPosts, setLikedPosts] = useState([]);
  const [repliedPosts, setRepliedPosts] = useState(postsData.filter(post => post.comments > 0)); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileSection, setProfileSection] = useState("my-posts");
  const [posts, setPosts] = useState(postsData);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const newPostObj = {
      id: posts.length + 1,
      user: name,
      content: newPost,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      comments: 0,
      shares: 0,
      avatar: profileImage, 
    };
    setPosts([newPostObj, ...posts]);
    setProfilePosts([newPostObj, ...profilePosts]);
    setNewPost("");
  };

  const handleLikePost = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
    setLikedPosts([...likedPosts, posts.find(post => post.id === postId)]);
  };

  const handleSaveProfile = (newName, newHandle, newDescription, newHeaderImage, newProfileImage) => {
    setName(newName);
    setHandle(newHandle);
    setDescription(newDescription);
    if (newHeaderImage) setHeaderImage(newHeaderImage);
    if (newProfileImage) setProfileImage(newProfileImage);
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
          <Button
            variant={activeTab === "profile" ? "filled" : "outline"}
            onClick={() => setActiveTab("profile")}
            className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
          >
            <User className="h-5 w-5 mr-2" /> Profile
          </Button>
        </div>

       
        {activeTab === "feed" && (
          <>
            <motion.div
              className="bg-white shadow-md rounded-lg p-6 mb-6"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <PostForm
                newPost={newPost}
                setNewPost={setNewPost}
                onSubmit={handlePostSubmit}
                userName={name}
                userHandle={handle}
                userAvatar={profileImage}
              />
            </motion.div>
            <div className="space-y-4">
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  className="bg-white shadow-md rounded-lg p-6 flex items-center"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                >
                  
                  <Post post={post} onLike={() => handleLikePost(post.id)} />
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
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900">#FormulaE2024</h3>
                <p className="text-gray-700">The latest updates and discussions on Formula E 2024. Get involved!</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900">#ElectricVehicles</h3>
                <p className="text-gray-700">Everything about the rise of electric vehicles and future technologies.</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900">#SustainableEnergy</h3>
                <p className="text-gray-700">Explore trends and innovations in sustainable energy sources.</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "profile" && (
          <div>
            <div
              className="relative bg-cover bg-center h-32 mb-6"
              style={{ backgroundImage: `url(${headerImage})` }}
            >
              <img
                src={profileImage}
                alt="Profile"
                className="absolute top-16 left-4 w-24 h-24 rounded-full border-4 border-white"
              />
            </div>

            <div className="mb-6 flex flex-col items-start">
              <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
              <p className="text-gray-600">{handle}</p>
              <p className="mt-2 text-gray-700">{description}</p>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white"
              >
                Edit Profile
              </Button>
            </div>

            {/* Profile Section Tabs */}
            <div className="flex space-x-4 mb-6">
              <Button
                variant={profileSection === "my-posts" ? "filled" : "outline"}
                onClick={() => setProfileSection("my-posts")}
                className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
              >
                My Posts
              </Button>
              <Button
                variant={profileSection === "liked-posts" ? "filled" : "outline"}
                onClick={() => setProfileSection("liked-posts")}
                className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
              >
                Posts I Liked
              </Button>
              <Button
                variant={profileSection === "replied-posts" ? "filled" : "outline"}
                onClick={() => setProfileSection("replied-posts")}
                className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
              >
                Replied
              </Button>
            </div>

           
            {profileSection === "my-posts" && (
              <motion.div
                className="bg-white shadow-md rounded-lg p-6"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">My Posts</h3>
                <div className="space-y-4">
                  {profilePosts.map((post) => (
                    <Post key={post.id} post={post} onLike={() => handleLikePost(post.id)} />
                  ))}
                </div>
              </motion.div>
            )}

            {profileSection === "liked-posts" && (
              <motion.div
                className="bg-white shadow-md rounded-lg p-6"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Posts I Liked</h3>
                <div className="space-y-4">
                  {likedPosts.map((post) => (
                    <Post key={post.id} post={post} />
                  ))}
                </div>
              </motion.div>
            )}

            {profileSection === "replied-posts" && (
              <motion.div
                className="bg-white shadow-md rounded-lg p-6"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Posts I Replied</h3>
                <div className="space-y-4">
                  {repliedPosts.map((post) => (
                    <Post key={post.id} post={post} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProfile}
        profileData={{ name, handle, description, headerImage, profileImage }}
      />
    </div>
  );
};

const Post = ({ post, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    if (!isLiked) onLike(); 
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center mb-4">
        <img
          src={post.avatar || defaultProfileImage}
          alt="Avatar"
          className="w-12 h-12 rounded-full border-2 border-gray-300 mr-4"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{post.user}</h3>
          <p className="text-gray-700 mb-2">{post.content}</p>
          <div className="flex justify-between text-gray-600">
            <span>{post.date}</span>
            <div className="flex space-x-4">
              <div className="flex items-center cursor-pointer" onClick={handleLikeClick}>
                <Heart className={`h-5 w-5 ${isLiked ? "text-red-600" : "text-gray-600"}`} />
                <span className="ml-1">{post.likes}</span>
              </div>
              <div className="flex items-center cursor-pointer">
                <MessageCircle className="h-5 w-5 text-gray-600" />
                <span className="ml-1">{post.comments}</span>
              </div>
              <div className="flex items-center cursor-pointer">
                <Share className="h-5 w-5 text-gray-600" />
                <span className="ml-1">{post.shares}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaApp;
