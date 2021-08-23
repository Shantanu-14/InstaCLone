import React, { useEffect, createContext, useReducer , useContext} from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Navbar from "./components/navbar/NavBar";
import Home from "./components/screens/home/home";
import Signin from "./components/screens/signin/signin";
import Signup from "./components/screens/signup/signup";
import Profile from "./components/screens/profile/profile";
import UserProfile from "./components/screens/UserProfile/UserProfile";
import CreatePost from "./components/screens/createpost/createpost";
import FollowingPosts from "./components/screens/home/FollowingPosts";
import { reducer, initialState } from "./reducers/userReducer";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const {dispatch} = useContext(UserContext)
  useEffect(()=>{
      const user =JSON.parse(localStorage.getItem("user"))
      if(user){
        dispatch({type:"USER", payload:user})
       /*  history.push('/') */
      }
      else{
        history.push('/signin')
      }
  },[])
  return (
    <Switch>
      <Route
        exact={true}
        path="/"
        render={() => (
          <div>
            <Home />
          </div>
        )}
      />
      <Route
        exact={true}
        path="/Home"
        render={() => (
          <div>
            <Home />
          </div>
        )}
      />
      <Route
        exact={true}
        path="/myfollowerspost"
        render={() => (
          <div>
            <FollowingPosts />
          </div>
        )}
      />
      <Route
        exact={true}
        path="/Signin"
        render={() => (
          <div>
            <Signin />
          </div>
        )}
      />
      <Route
        exact={true}
        path="/Signup"
        render={() => (
          <div>
            <Signup />
          </div>
        )}
      />
      <Route
        exact={true}
        path="/Profile"
        render={() => (
          <div>
            <Profile />
          </div>
        )}
      />
      <Route
        exact={true}
        path="/create"
        render={() => (
          <div>
            <CreatePost />
          </div>
        )}
      />
      <Route
        exact={true}
        path="/profile/:userid"
        render={() => (
          <div>
            <UserProfile />
          </div>
        )}
      />
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{state, dispatch}} >
      <BrowserRouter>
        <div>
          <Navbar />
          <Routing />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
