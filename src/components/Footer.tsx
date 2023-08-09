import { useEffect, useState } from 'react';
import { fetchPostCount } from '../api/posts';


const Footer = () => {
  const [postCount, setPostCount] = useState(0);

  // Fetch the post count from your backend
  useEffect(() => {
    const fetchPostCountData = async () => {
      try {
        // Use the fetchPostCount function from your api/posts file to get the post count
        const response = await fetchPostCount();
        setPostCount(response.data.count);
      } catch (error) {
        console.log("Error fetching post count:", error);
      }
    };
    fetchPostCountData();
  }, []);

  return (
    <footer className="Footer">
      <p>{postCount} Bible Blog Posts</p>
    </footer>
  );
};

export default Footer;
