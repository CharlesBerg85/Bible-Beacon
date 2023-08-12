import React, { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { db } from "../../firebase"; // Import the Firestore instance from your firebase.js
import { getFirestore, collection, addDoc } from "firebase/firestore";

const NewPost = () => {
  const [postData, setPostData] = useState({
    title: "",
    body: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, body } = postData;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");

    try {
      const firestore = getFirestore();

      // Use Firestore to add a new document to the 'posts' collection
      await addDoc(collection(firestore, "posts"), {
        title: title,
        body: body,
        datetime: datetime,
      });

      // Navigate back to the home page
      router.push("/");
    } catch (error: unknown) {
      console.error("Error saving post:", (error as Error).message);
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
