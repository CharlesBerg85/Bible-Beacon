import { useId, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

const NewPost = () => {
  // State for storing the post title and body
  const [postData, setPostData] = useState({
    title: '',
    body: '',
  });

  // Navigation hook from next/router
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { title, body } = postData;
    e.preventDefault();
    // Generating a new unique ID for the post
    const id = useId()
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: title, datetime, body: body };

    try {
      // TODO: Send the new post data to firebase instead of localhost
      await axios.post('http://localhost:3000/posts', newPost);
      // Navigate back to the home page
      router.push('/');
    } catch (error: unknown) {
      console.error('Error saving post:', (error as Error).message);
      // Handle any error that occurs while saving the post
    }
  };

  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        {/* Label for the post title */}
        <label htmlFor="postTitle">Title:</label>
        {/* Input field for the post title */}
        <input
          id="postTitle"
          type="text"
          required
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        {/* Label for the post body */}
        <label htmlFor="postBody">Post:</label>
        {/* Textarea for the post body */}
        <textarea
          id="postBody"
          required
          value={postData.body}
          onChange={(e) => setPostData({ ...postData, body: e.target.value })}
        />
        {/* Button to submit the form */}
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
