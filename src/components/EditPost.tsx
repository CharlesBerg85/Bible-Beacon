import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { updatePost } from '../api/posts';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

interface Post {
  id: number;
  title: string;
  datetime: string;
  body: string;
}

const EditPost = () => {
  const router = useRouter();
  const { id } = router.query as ParsedUrlQuery;
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  useEffect(() => {
    // Fetch the post from your backend and set the state
    // You can use the 'id' parameter to get the specific post from your Firebase backend.
    // Example: Fetch the post with ID 'id' and set the state.
    // const post = await fetchPostById(id);
    // setEditTitle(post.title);
    // setEditBody(post.body);
  }, [id]);

  const handleEdit = async () => {
    if (id === undefined) {
      console.log('Invalid ID');
      return;
    }
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost: Post = {
      id: parseInt(id as string),
      title: editTitle,
      datetime,
      body: editBody,
    };

    // Call the updatePost function from your api/posts file to update the post in your Firebase backend.
    try {
      await updatePost(updatedPost.id, updatedPost); // Convert id to number
      router.push('/');
    } catch (error) {
      console.log('Error updating post:', error);
    }
  };

  return (
    <main className="NewPost">
      <h1>Edit Post</h1>
      <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="postTitle">Title: </label>
        <input
          id="postTitle"
          type="text"
          required
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post: </label>
        <textarea
          id="postBody"
          required
          value={editBody}
          onChange={(e) => setEditBody(e.target.value)}
        />
        <button type="button" onClick={handleEdit}>
          Submit
        </button>
      </form>
    </main>
  );
};

export default EditPost;
