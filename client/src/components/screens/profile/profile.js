import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../App";
import "./profile.css";
const Profile = () => {
  const [mypics, setMypics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState();
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setMypics(result.mypost);
      });
  }, []);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "shantanu14");
      fetch("	https://api.cloudinary.com/v1_1/shantanu14/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch("/updatedp", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              dp: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              localStorage.setItem("user",JSON.stringify({...state, dp:result.dp}))
              dispatch({type:"UPDATEPIC",payload:result.dp})
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);

  const updateDP = (file) => {
    setImage(file);
  };

  return (
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
              cursor: "pointer",
            }}
            src={state ? state.dp : "Loading"}
            alt=""
          />
          <div class="file-field input-field">
            <div className="btn #2196f3 blue">
              <span>Update Image</span>
              <input
                type="file"
                onChange={(e) => updateDP(e.target.files[0])}
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </div>
        <div>
          <h4>{state ? state.name : "Loading"}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>{state ? mypics.length : "Loading"} Posts</h6>
            <h6>
              {state !== null ? state.followers.length : "Loading"} Followers
            </h6>
            <h6>
              {state !== null ? state.following.length : "Loading"} Following
            </h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        {mypics.map((item) => {
          return <img className="item" src={item.photo} alt={item.title} />;
        })}
      </div>
    </div>
  );
};

export default Profile;
