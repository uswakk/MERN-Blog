// src/pages/CreateBlog.jsx
import React, { useState } from 'react';
import { createPost } from '../api'; // Adjusted import to match export
import '../App.css'; // Ensure App.css includes the styles
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"


const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent page reload on submit

    const submitObject = {
      title: title,
      description: description,
      content: content,
      author: null,
      dateCreated: new Date(),
    };

    try {
      await createPost(submitObject); // Calls the function from API
      alert('Blog post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('There was an error creating the blog post.');
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      <form onSubmit={handleSubmit} className="mt-32 w-1/2">
        <Label htmlFor="title" className="text-lg font-semibold">Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          className="mb-4"
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          aria-label="Blog Title"
          required
        />

        <Label htmlFor="description" className="text-lg font-semibold">Description</Label>
        <Input
          type="text"
          id="description"
          name="description"
          className="mb-4"
          onChange={(e) => setDescription(e.target.value)}
          maxLength={200}
          aria-label="Blog Description"
          required
        />

        <Label htmlFor="content" className="text-lg font-semibold">Content</Label>
        <Textarea
          id="content"
          name="content"
          className="h-52"
          onChange={(e) => setContent(e.target.value)}
          maxLength={5000}
          aria-label="Blog Content"
          required
        />

        <Button type="submit" className="w-full mt-7">Submit</Button>
      </form>
    </div>
  );
};

export default CreateBlog;
