// src/pages/ReadBlog.jsx
import React, { useEffect, useState } from 'react';
import { getPost } from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css'; // Ensure App.css includes the new styles
import { Button } from '@/components/ui/button';

const ReadBlog = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        async function loadPost() {
            const data = await getPost(id);
            setPost(data);
        }

        loadPost();
    }, [id]);

    if (!post) {
        return <p className="loading">Loading...</p>; 
    }

    return (
        <div className="flex flex-col text-center  items-center">
            <div className='mt-28 lg:w-1/2 ml-5 mr-5 '>
                <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{post.title}</h1>
                <h2 className="scroll-m-20 text-xl font-semibold tracking-tight mt-5">By: {post.author}</h2>
                <h3 className="text-sm text-muted-foreground mt-5">{new Date(post.dateCreated).toDateString()}</h3>
                <p className="leading-7 [&:not(:first-child)]:mt-6">{post.content}</p>
                <Button className="w-36 mt-5" onClick={() => navigate('/home')}>
                    Back to Home
                </Button>
            </div>
        </div>
    );
};

export default ReadBlog;
