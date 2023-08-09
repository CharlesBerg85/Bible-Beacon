import axios, { AxiosResponse } from 'axios';

const API_URL = 'https://your-firebase-api-url'; // Replace with your actual Firebase API URL

interface Post {
  id: number;
  title: string;
  body: string;
}

// Function to fetch all posts
export const fetchPosts = (): Promise<AxiosResponse<Post[]>> => {
  return axios.get<Post[]>(`${API_URL}/posts`);
};

// Function to add a new post
export const addPost = (newPost: Post): Promise<AxiosResponse<Post>> => {
  return axios.post<Post>(`${API_URL}/posts`, newPost);
};

// Function to update a post
export const updatePost = (
  postId: number,
  updatedPost: Post
): Promise<AxiosResponse<Post>> => {
  return axios.put<Post>(`${API_URL}/posts/${postId}`, updatedPost);
};

// Function to delete a post
export const deletePost = (postId: number): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(`${API_URL}/posts/${postId}`);
};

// Function to fetch the post count
export const fetchPostCount = (): Promise<AxiosResponse<{ count: number }>> => {
  return axios.get<{ count: number }>(`${API_URL}/postCount`);
};
