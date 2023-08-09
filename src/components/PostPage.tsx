import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query as ParsedUrlQuery;
  const postId = id ? parseInt(id as string) : undefined;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch the post by ID
    const fetchPostById = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${id}`);
        setPost(response.data);
      } catch (error: any) {
        console.error('Error fetching post:', error.message);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPostById();
  }, [id]);

  // Function to handle post deletion
  const handleDelete = async (id: number | undefined) => {
    try {
      if (id !== undefined) {
        await axios.delete(`https://your-backend-url/posts/${id}`);
        router.push('/');
      }
    } catch (error: any) {
      console.error('Error deleting post:', error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return (
      <main className="PostPage">
        <article className="post">
          <h2>Post not found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link href="/">Visit our homepage</Link>
          </p>
        </article>
      </main>
    );
  }

  // Destructure the post object to extract the required properties
  const { title, datetime, body } = post;

  return (
    <main className="PostPage">
      <article className="post">
        <h2>{title}</h2>
        <p className="postDate">{datetime}</p>
        <p className="postBody">{body}</p>
        <Link href={`/edit/${id}`}>
          <button className="editButton">Edit Post</button>
        </Link>
        <button className="deleteButton" onClick={() => handleDelete(postId)}>
          Delete Post
        </button>
      </article>
    </main>
  );
};

export default PostPage;
