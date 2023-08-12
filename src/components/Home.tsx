import React, { useEffect } from "react";
import axios from "axios";
import Feed from "../components/Feed";
import { useQuery } from "react-query";

// Define the Post interface for your Post data
interface Post {
  id: number;
  title: string;
  datetime: string;
  body: string;
}

export interface HomeProps {
  isLoading: boolean;
  fetchError: string | null;
  posts: Post[];
}

const Home: React.FC<HomeProps> = () => {
  const fetchPosts = async (): Promise<Post[]> => {
    try {
      // TODO Send a GET request to fetch posts from your firestore
      const response = await axios.get<Post[]>("http://localhost:3000/posts");
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching posts:", error.message);
      throw error;
    }
  };

  const { isLoading, error, data } = useQuery("posts", fetchPosts);

  if (isLoading) return <p className="statusMsg">Loading posts...</p>;
  if (error) {
    console.log(error);
    return (
      <>
        <p className="statusMsg" style={{ color: "red" }}>
          There was an error fetching posts
        </p>
        {error}
      </>
    );
  }

  return (
    <main className="Home">
      {data && data.length ? (
        <Feed posts={data} />
      ) : (
        <p className="statusMsg">No posts to display.</p>
      )}
    </main>
  );
};

export default Home;
