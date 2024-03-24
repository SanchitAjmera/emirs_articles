import React from "react";
import { Link } from "react-router-dom";

function BlogCard({title, id}) {
    return (
        <>
        <h1>{title}</h1>
        <Link to={`/blog/${id}`}>Blog Page</Link>
        </>
    );
    }

export default BlogCard;