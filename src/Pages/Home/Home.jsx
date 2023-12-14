import React from "react";
import Post from "./../../Components/Post";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getPostsByDates } from "../../GlobalState/postSlice";
import AddPost from "../../Components/AddPost";
import SideBar from "../../Components/SideBar";
const Home = () => {
  const { posts, isLoading, error } = useSelector((state) => state.post);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts({ id: currentUser._id }));
    dispatch(getPostsByDates())
  }, [dispatch, currentUser._id]);

  return (
    <>
      <SideBar />
      <main>
        <div className="main-flex">
          <div className="main-feed">
            <AddPost />
            {!isLoading ? (
              posts.length > 0 ? (
                posts.map((p) => <Post key={p._id} post={p} />)
              ) : (
                <h6>{error}</h6>
              )
            ) : (
              <div className="text-center mt-5">
                <CircularProgress color="secondary" size="28px" />
              </div>
            )}
          </div>
          <div className="friends">dd</div>
        </div>
      </main>
    </>
  );
};

export default Home;

/*

 <div className="col-6 p-0 border-end border-start">
        <AddPost />
        {!isLoading ? (
          posts.length > 0 ? (
            posts
              
              .map((p) => <Post key={p._id} post={p} />)
          ) : (
            <h6>{error}</h6>
          )
        ) : (
          <div className="text-center mt-5">
            <CircularProgress color="secondary" size="28px" />
          </div>
        )}
      </div>

*/
