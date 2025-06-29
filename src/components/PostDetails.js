import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

function PostDetails() {
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:7070/posts/${id}`);
      setPost(response.data);
      setEditContent(response.data.content);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:7070/posts/${id}`);
      history.push('/');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:7070/posts/${id}`, { content: editContent });
      setPost(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      {isEditing ? (
        <div>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h1>{post.content}</h1>
          <p>Created: {post.created}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
