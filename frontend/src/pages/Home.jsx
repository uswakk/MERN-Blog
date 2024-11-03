// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import getPosts from "../api.js";
import BlogCard from '../components/BlogCard.jsx';
import "../App.css";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadAllPosts(){
      
      const data = await getPosts();
      const sortedPosts = data.sort(
        (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated) // Sort by dateCreated in descending order
      );
      setPosts(sortedPosts);
    
      setPosts(data);
    }
    loadAllPosts();
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mt-24 sm:w-1/2 lg:w-1/3 text-center min-w-28 m">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Latest Blog Posts</h1>

        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
