import React, { useEffect } from 'react';
import axios from 'axios';
import Feed from '../components/Feed';

// Define the Post interface for your Post data
interface Post {
  id: number;
  title: string;
  datetime: string;
  body: string;
}

// Define the HomeProps type here
export interface HomeProps {
  isLoading: boolean;
  fetchError: string | null;
  posts: Post[];
}

const Home: React.FC<HomeProps> = ({ isLoading, fetchError, posts }) => {
  // Function to fetch posts from the backend
  const fetchPosts = async () => {
    try {
      // Send a GET request to fetch posts from your backend
      const response = await axios.get<Post[]>('http://localhost:3000/posts');
      // Here, we directly use 'response.data' since it contains the fetched data.
      // In this case, 'response.data' will be an array of Post objects.
      console.log(response.data); // Just to demonstrate that you have access to the fetched data
    } catch (error: any) {
      console.error('Error fetching posts:', error.message);
      // Handle the fetch error, but as you're already getting 'fetchError' as props, there's no need to handle it here.
    } finally {
      // Set the loading state, but as you're already getting 'isLoading' as props, there's no need to handle it here.
    }
  };

  // Fetch the posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="Home">
      {/* Display loading message if isLoading is true */}
      {isLoading && <p className="statusMsg">Loading posts...</p>}

      {/* Display fetch error message if fetchError exists */}
      {!isLoading && fetchError && (
        <p className="statusMsg" style={{ color: 'red' }}>
          {fetchError}
        </p>
      )}

      {/* Display Feed component if posts exist, otherwise display no posts message */}
      {!isLoading && !fetchError && (posts.length ? <Feed posts={posts} /> : <p className="statusMsg">No posts to display.</p>)}
    </main>
  );
};

export default Home;
