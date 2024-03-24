import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import BlogPage from './pages/BlogPage';
import db from './firebase';
import { collection, query, getDocs } from "firebase/firestore";
import CreateBlogPage from './pages/CreateBlogPage';
import EditBlogPage from './pages/EditBlogPage';
const q = query(collection(db, "articles"));
const querySnapshot = await getDocs(q);

const pages = [
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/blog/create-blog",
    element: <CreateBlogPage/>,
  },
  {
    path: "/about",
    element: <h1>About</h1>,
  },
  {
    path: "/contact",
    element: <h1>Contact</h1>,
  },
];

querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  pages.push(
    {
      path: `/blog/${doc.id}`,
      element: <BlogPage title={doc.data().title} content={doc.data().content} blog_id={doc.id}/>,
    }
  );
  pages.push(
    {
      path: `/blog/${doc.id}/edit`,
      element: <EditBlogPage title={doc.data().title} content={doc.data().content} blog_id={doc.id}/>,
    }
  )  
});


const router = createBrowserRouter(pages);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
