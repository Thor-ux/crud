import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function CreatePost() {
  const [content, setContent] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7070/posts', { content });
      history.push('/');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}

export default CreatePost;
