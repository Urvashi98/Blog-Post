import { Button, Input, PageHeader } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import classes from "./posts.module.css";
import { db } from "../firebase-config";
import { updateDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  title: "",
  content: "",
};

const UpdatePost = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(initialState);
  let navigate = useNavigate(); // use to navigate to page

  const getSinglePost = async (id) => {
    const getSinglePostRef = doc(db, "posts", id);
    const singlePost = await getDoc(getSinglePostRef);
    if (singlePost.exists()) {
      let postData = singlePost.data();
      setValue({ ...postData }); // set the data to state, hence it will populate the value in feilds
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  useEffect(() => {
    getSinglePost(id);
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const onUpdatePost = async (e) => {
    e.preventDefault();
    const payload = {
      title: value.title,
      content: value.content,
    };
    console.log("payload", payload);
    try {
      //   const docRef = await addDoc(collection(db, "posts"), payload);
      const docRef = await doc(db, "posts", id);

      console.log("Document written with ID: ", docRef);
      await updateDoc(docRef, payload);
      setValue(initialState);
      navigate("/posts", { replace: "true" });
    } catch (e) {
      console.log("error", e);
    }
  };
  return (
    <form
      className={classes.posts_container}
      onSubmit={(e) => onUpdatePost(e)}
      method="post"
    >
      <div className="pageHeaderContainer">
        <PageHeader className={classes.sitePageHeader} title="Update Post" />
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
              Update Post
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UpdatePost;
