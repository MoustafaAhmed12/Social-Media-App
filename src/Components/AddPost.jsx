import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { createPosts } from "../GlobalState/postSlice";

const AddPost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dipatch = useDispatch();
  const [post, setPost] = useState({
    body: "",
    userId: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = { ...post, userId: currentUser._id };
    dipatch(createPosts({postData}));
    setPost({ body: "" });
  };

  return (
    <div className="row d-flex p-3 justify-content-center align-items-center border-bottom m-0">
      <div className="col-1">
        <img
          src={currentUser.imgProfile}
          alt=""
          className="card-img-top rounded-circle"
          style={{ width: "40px", height: "40px" }}
        />
      </div>
      <form className="constainer col-11" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          name="post.body"
          id="post.body"
          label={`What's on your mind ${currentUser.username}?`}
          multiline
          minRows={5}
          value={post.body}
          onChange={(e) => setPost({ body: e.target.value })}
        />
        <Button
          disabled={!post.body}
          variant="text"
          color="secondary"
          type="submit"
          className="mt-2 text-end"
        >
          Post
        </Button>
      </form>
    </div>
  );
};

export default AddPost;
