import { Button, Input, PageHeader } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import classes from "./posts.module.css";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";

const initialState = {
  title: "",
  content: "",
};

const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(initialState);

  // const helloHandeler = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const onCreatePost = async (e) => {
    e.preventDefault();
    const payload = {
      title: value.title,
      content: value.content,
    };
    console.log('payload', payload);
    console.log(db)
    try {
      const docRef = await addDoc(collection(db, "posts"), payload);
      console.log("Document written with ID: ", docRef.id);
      setValue(initialState);
    }catch(e) {
      console.log('error',e);
    }
 
  };
  return (
    <form className={classes.posts_container} onSubmit={(e) => onCreatePost(e)} method="post">
      <div className="pageHeaderContainer">
        <PageHeader className={classes.sitePageHeader} title="Create Post" />
      </div>
      <div className={classes.post_AllInputsContainer}>
        <div className={classes.post_InputContainer}>
          <div className="post_InputTitle">Post Title</div>
          <div className="post_InputControl">
            <Input
              placeholder="Enter title"
              name="title"
              value={value.title}
              onChange={(event) => handleChange(event)}
            />
          </div>
        </div>
        <div className={classes.post_InputContainer}>
          <div className="post_InputTitle">Post Content</div>
          <div className="post_InputControl">
            <TextArea
              rows={4}
              placeholder="Enter blog content"
              name="content"
              value={value.content}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={classes.post_InputContainer}>
          <div className={classes.post_SubmitButton}>
            <Button
              shape="round"
              type="primary"
              loading={false}
              htmlType="submit"
            >
              Create Post
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
