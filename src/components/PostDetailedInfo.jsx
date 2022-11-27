import React, { useState } from "react";
import { PageHeader, Card } from "antd";
import classes from "./posts.module.css";
import { useParams } from "react-router-dom";
import api from "../mock_api";
import { useEffect } from "react";
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";

const PostDetailedInfo = () => {
  const { id } = useParams(); // id is a string here
  const [post, setPost] = useState([]);

  const getSinglePost = async (id) => {
    const getSinglePostRef = doc(db, "posts", id);
    const singlePost = await getDoc(getSinglePostRef);
    if (singlePost.exists()) {
      let postData = singlePost.data();
      setPost((prev) => [{...postData}]);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  useEffect(() => {
    getSinglePost(id);
  }, [id]);

  //map the post array(it contains one object only though)
  const handleContent = (postContent) => {
    console.log('post in handle content',post);
    return post.map((p) => {
      //again map the content of the current object for Paragraphs
      return postContent.split("\n").map((item, i) => {
        return <p key={i}>{item}</p>;
      });
    });
  };
  return (
    <>
        {post.map((p) => {
        return (
          <div key={id}>
            <div className={classes.postInfo_Header}>
              <PageHeader className="classes.sitePageHeader" title={p.title} />
            </div>
            <div className={classes.postInfo_Content} key={id}>
              <Card className={classes.postInfo_Card}>
                <div>{handleContent(p.content)} </div>
              </Card>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PostDetailedInfo;
