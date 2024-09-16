import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Share2 } from 'lucide-react';

export default function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchPost = () => {
      const storedPosts = JSON.parse(sessionStorage.getItem('posts')) || [];
      const post = storedPosts.find(post => post.id === postId);
      setPost(post);
      setLikes(post.likes || 0);
    };
    fetchPost();
  }, [postId]);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    setComments([...comments, { text: newComment, user: "New User" }]);
    setNewComment('');
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="flex items-center p-4 border-b border-gray-200">
          <Avatar className="h-12 w-12">
            <AvatarImage src={post.author.avatar} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <p className="font-semibold text-gray-900">{post.author.name}</p>
            <p className="text-sm text-gray-600">{post.date}</p>
          </div>
        </div>
        <div className="p-4">
          <p className="text-lg text-gray-800">{post.content}</p>
        </div>
        {post.image && (
          <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
        )}
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 ${liked ? 'text-red-600' : 'text-gray-500'} hover:text-red-600`}
          >
            <Heart className="w-5 h-5" />
            <span>{likes}</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      <section>
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Replies</h3>
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div key={index} className="flex items-start space-x-3 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://via.placeholder.com/64" />
                <AvatarFallback>NU</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{comment.user}</p>
                <p className="text-gray-600">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddComment} className="mt-6 flex items-start space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://via.placeholder.com/64" />
            <AvatarFallback>NU</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Add a reply..."
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Reply
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
