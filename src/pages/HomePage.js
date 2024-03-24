import React, { useEffect , useState} from "react";
import BlogCard from "../components/BlogCard";
import NavBar from "../components/NavBar";
import db from "../firebase";
import {onSnapshot, collection} from "firebase/firestore";


function HomePage() {

    const [articles, setArticles] = useState([{title: "Loading...", id: "1"}]);

    useEffect(

        () =>
            onSnapshot(collection(db, "articles"), (snapshot) =>
                setArticles(snapshot.docs.map((doc) => ({...doc.data(), id:doc.id})))
        )
        , []);

    return (
        <section>
            <NavBar />
            <h1>Home Page</h1>  
            {
                articles.map((article) => (
                    <BlogCard title={article.title} key={article.id} id={article.id}/>
                ))
            }
        </section>
    );

}

export default HomePage;