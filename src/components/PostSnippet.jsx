import React, { useEffect } from "react";
import Card from "antd/lib/card/Card";
import { ReadOutlined, HighlightOutlined } from "@ant-design/icons";
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
    // map the content of the current object for Paragraphs
    const contentArray = postContent.split("\n");
    return contentArray.map((item, i) => {
      const appendDots = contentArray.length - 1 === i ? ".........." : null;

      return (
        <p key={i} className={classes.articleContainer_snippet}>
          {item}
          {appendDots}
        </p>
      );
    });
  };

  return (
    <div className={classes.articleContainer}>
      {post.length > 0 ? (
        post.map((p) => {
          return (
            <div key={p.id}>
              <Card
                type="inner"
                title={p?.title}
                extra={
                  <div className={classes.singlePostLinks}>
                    <Link to={`/posts/${p?.id}`}>Read Full Article</Link>
                      <Link to={`/update_post/${p?.id}`} className={classes.singlePostLink}>
                        <HighlightOutlined style={{"alignSelf": "center"}}/>
                        Edit
                      </Link>
                  </div>
                }
              >
                {handleContent(p?.content)}
                {/* css for private articles to show & will go post in detial page  */}
                {/* <div className={classes.notSignedInBoxShadow}></div> */}
              </Card>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default PostSnippet;
