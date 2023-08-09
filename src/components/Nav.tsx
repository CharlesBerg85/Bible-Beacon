import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  body: string;
  // Add other properties based on your data model if needed
}

const Nav = () => {
    // State for storing the posts and search query
    const [posts, setPosts] = useState<Post[]>([]);
    const [search, setSearch] = useState('');

    // Function to fetch all posts
    const fetchPosts = async () => {
        try {
            const response = await axios.get<Post[]>('/api/posts');
            setPosts(response.data);
        } catch (error) {
            console.log('Error fetching posts:', error);
        }
    };

    // Function to filter posts based on search query
    const filterPosts = () => {
        const filteredResults = posts.filter(
            (post) =>
                post.body &&
                post.body.toLowerCase().includes(search.toLowerCase()) ||
                post.title &&
                post.title.toLowerCase().includes(search.toLowerCase())
        );
        // You can set the filtered results in the state or use them directly in your components
        // For simplicity, I'm just logging them here
        console.log('Filtered posts:', filteredResults);
    };

    useEffect(() => {
        // Fetch all posts when the component mounts
        fetchPosts();
    }, []);

    useEffect(() => {
        // Filter posts whenever the search query changes
        filterPosts();
    }, [search, posts]);

    return (
        <nav className="Nav">
            {/* Search form */}
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search:</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            {/* Navigation links */}
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/post">Post</Link></li>
                <li><Link href="/about">About</Link></li>
            </ul>
        </nav>
    );
};

export default Nav;
