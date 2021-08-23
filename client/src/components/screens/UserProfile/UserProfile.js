import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../App";
import "../profile/profile.css";
import "./UserProfile.css";
import { useParams } from "react-router-dom";
const UserProfile = () => {
  const [userprofile, setUserprofile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  const [showFollow, setShowFollow] = useState(state ? !state.following.includes(userid): true);
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUserprofile(result);
      });
  }, []);

  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setUserprofile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        })
        setShowFollow(false);;
      });
  };

  const unfollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
       
        setUserprofile((prevState) => {

          const newFollower = prevState.user.followers.filter(item=>item!==data._id)
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers:newFollower
            },
          };
        })
      });
  };

  return (
    <>
      {userprofile ? (
        <div className="profile-page">
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "18px 0px",
              borderBottom: "1px solid grey",
            }}
          >
            <div>
              <img
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
                src={userprofile.user.dp}
              />
            </div>
            <div>
              <h4>{userprofile.user.name}</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                }}
              >
                <h6>{userprofile.posts.length} Posts</h6>
                <h6>{userprofile.user.followers.length} Followers</h6>
                <h6>{userprofile.user.following.length} Following </h6>
              </div>
              {showFollow ? (
                <button
                  className="btn waves-effect waves-light #2196f3 blue"
                  onClick={() => followUser()}
                >
                  Follow
                </button>
              ) : (
                <button
                  className="btn waves-effect waves-light #2196f3 blue"
                  onClick={() =>{ unfollowUser(); setShowFollow(true)}}
                >
                  Unfollow
                </button>
              )}
            </div>
          </div>
          <div className="gallery">
            {userprofile.posts.map((item) => {
              return <img className="item" src={item.photo} alt={item.title} />;
            })}
          </div>
        </div>
      ) : (
        <h2>Loading ...</h2>
      )}
    </>
  );
};

export default UserProfile;