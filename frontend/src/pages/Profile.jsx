import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import getPosts from "../api";
import { jwtDecode } from "jwt-decode";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  let navigate = useNavigate()

  function createBlog(){
    navigate("/createblog")
  }


  useEffect(() => {
    async function loadAllData() {
      const token = sessionStorage.getItem("User"); // Retrieve the token correctly
      if (!token) {
        console.error("No token found");
        return;
      }

      const decodeUser = jwtDecode(token); // Directly decode the token with jwt_decode
      const allPosts = await getPosts();

      const filteredPosts = allPosts.filter((post) => post.author === decodeUser._id);

      if (filteredPosts.length > 0) {
        const sortedPosts = filteredPosts.sort(
          (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated) // Sort by dateCreated in descending order
        );
        setPosts(sortedPosts);
      }

      setUser(decodeUser);
    }

    loadAllData();
  }, []);

  return (
    <div className='flex flex-col items-center w-full'>
      <div className="mt-24 sm:w-1/2 lg:w-1/3  text-center min-w-28">
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>Your Posts</h1>
        {posts.length > 0 ? (
          <div className="profile_posts">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <Button className="mt-11 h-20 w-44" onClick={createBlog}>Create A New Post</Button>
        )}
      </div>
    </div>
  );
};

export default Profile;
