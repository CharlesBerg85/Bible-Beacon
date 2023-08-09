import React from 'react';
import SinglePost from 'src/components/SinglePost';

interface PostData {
  id: number;
  title: string;
  body: string;
  datetime: string;
}

interface Props {
  posts: PostData[];
}

const Feed: React.FC<Props> = ({ posts }) => {
  return (
    <>
      {/* Map over the posts array and render a SinglePost component for each post */}
      {posts.map((post) => (
        <SinglePost key={post.id} post={post} />
      ))}
    </>
  );
};

export default Feed;
