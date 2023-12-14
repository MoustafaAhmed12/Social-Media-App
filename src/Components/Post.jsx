import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FavoriteBorderOutlined, FavoriteOutlined, MoreHorizOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      await axios
        .get(`http://localhost:8080/api/v1/user/${post.userId}`)
        .then(({ data }) => {
          setUser(data);
        })
        .catch((err) => console.log(err.message));
    };
    getUser();
  }, [post.userId]);

  const { username, firstName, lastName, imgProfile } = user;

  dayjs.extend(relativeTime);
  return (
    <div className="feed-post d-flex w-100 p-3">
      <img src={imgProfile} alt="" />
      <div className="feed-post-details d-flex flex-column w-100 ms-3">
        <div className="feed-details d-flex justify-content-between align-items-start ">
          <div className="user-details">
            <Link
              to="/profile"
              className=" fw-bold text-decoration-none text-warning"
            >
              {firstName} {lastName}
              <span className=" text-secondary ms-1">@{username}</span>
            </Link>
            <span className=" text-secondary ms-2">
              .{dayjs(post.createdAt).fromNow()}
            </span>
          </div>
          <MoreHorizOutlined />
        </div>
        <div className="mt-2" style={{width: '95%'}}>{post.body}</div>
        <div className="icons d-flex justify-content-between mb-2 text-secondary mt-3 me-5 pe-4">
          <FavoriteBorderOutlined />
          <FavoriteBorderOutlined />
          <FavoriteBorderOutlined />
          <FavoriteBorderOutlined />
        </div>
      </div>
    </div>
  );
};

export default Post;
