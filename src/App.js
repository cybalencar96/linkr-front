import "./assets/reset.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import UserContext from "./contexts/UserContext";
import { useState } from "react";
import SignupPage from "./components/Signup/SignupPage";
import Topbar from "./components/shared/Topbar/Topbar"
import TimelinePage from "./components/Timeline/TimelinePage";
import MyLikesPage from "./components/MyLikes/MyLikesPage";
import UserPostsPage from "./components/UserPosts/UserPostsPage";
import MyPostsPage from "./components/MyPosts/MyPostsPage";

export default function App() {
    const [userData, setUserData] = useState(null);

    return (
        <UserContext.Provider value={{userData, setUserData}} >
            <BrowserRouter>
                {userData ? <Topbar /> : ""}
                <Switch>
                    <Route path="/" exact>
                        <LoginPage />
                    </Route>

                    <Route path="/sign-up" exact>
                        <SignupPage />
                    </Route>

                    <Route path="/timeline" exact>  
                        <TimelinePage />
                    </Route>

                    <Route path="/hashtag/:hashtag" exact>  
                    </Route>

                    <Route path="/my-likes" exact>
                        <MyLikesPage />
                    </Route>

                    <Route path="/my-posts" exact>
                        <MyPostsPage />
                    </Route>

                    <Route path="/user/:id" exact>
                        <UserPostsPage />
                    </Route>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    )
}