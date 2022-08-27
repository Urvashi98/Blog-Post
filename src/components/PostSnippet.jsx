import React, { useEffect } from "react";
import Card from "antd/lib/card/Card";
import classes from "./posts.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const PostSnippet = (props) => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    setPost((post) => [{ ...props }]);
  }, [props]);

  //map the post array(it contains one object only though)
  const handleContent = (postContent) => {
    return post.map((p) => {
      //again map the content of the current object for Paragraphs
      return postContent.split("\n").map((item, i) => {
        return (
          <p key={i} className={classes.articleContainer_snippet}>
            {item} ........
          </p>
        );
      });
    });
  };

  return (
    <div className={classes.articleContainer}>
      {post.length > 0 ? (
        post.map((p) => {
          return (
            <>
              <Card
                type="inner"
                title={p?.title}
                extra={<Link to={`/posts/${p?.id}`}>Read Full Article</Link>}
              >
                {handleContent(p?.content)}
                {/* css for private articles to show & will go post in detial page  */}
                {/* <div className={classes.notSignedInBoxShadow}></div> */}
              </Card>
              
            </>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default PostSnippet;
