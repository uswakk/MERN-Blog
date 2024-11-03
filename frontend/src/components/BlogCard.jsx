// src/components/BlogCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const BlogCard = ({ post }) => {
  // Format date to 'Month Day, Year' (e.g., January 1, 2024)
  const formattedDate = new Date(post.dateCreated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="flex w-full  my-8 hover:bg-muted text-center justify-center">
    <Link to={`/readblog/${post._id}`}className="w-full">
      <CardHeader>
        <CardTitle>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{post.title}</h2>
        </CardTitle>
        <CardDescription>
        <p className="blog-card__description">{post.description}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
      <span className="blog-card__date">{formattedDate}</span>
      </CardContent>
    </Link>
  </Card>
  );
};

export default BlogCard;
