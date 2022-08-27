import React, { useEffect, useState } from "react";
import { PageHeader } from "antd";
import classes from "./posts.module.css";
import PostSnippet from "./PostSnippet";
import { map } from "lodash";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    const getAllPostsRef = collection(db, "posts");
    const getPostsSnapshot = await getDocs(getAllPostsRef); //snapshot
    const getPostsDocs = getPostsSnapshot.docs.map((doc) => {
      const { id } = doc;
      // setPosts((posts) => [...posts, post])
      return { id, ...doc.data() };
    });
    setPosts(getPostsDocs)
  };


useEffect(() => {
  
getAllPosts();

}, [])


  return (
    <div className={classes.posts_container}>
      <div className="pageHeaderContainer">
        <PageHeader className={classes.sitePageHeader} title="Posts" />
      </div>
      <div className="articlesContainer">
        {map(posts, (article, index) => {
          console.log(index);
          return (
            <PostSnippet
              title={article.title}
              content={article.content.substring(0,200)}
              key={index}
              id={article.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
