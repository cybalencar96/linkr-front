import "./assets/reset.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import UserContext from "./contexts/UserContext";
import YoutubeContext from "./contexts/YoutubeContext";
import { useEffect, useState } from "react";
import SignupPage from "./components/Signup/SignupPage";
import Topbar from "./components/shared/Topbar/Topbar"
import TimelinePage from "./components/Timeline/TimelinePage";
import MyLikesPage from "./components/MyLikes/MyLikesPage";
import UserPostsPage from "./components/UserPosts/UserPostsPage";
import MyPostsPage from "./components/MyPosts/MyPostsPage";
import HashtagPostPage from "./components/HashtagPosts/HashtagPostsPage";
export default function App() {
    const [userData, setUserData] = useState(null);
    const [youtubeVideos, setYoutubeVideos] = useState([])

    useEffect(() => {
        const localUserData = localStorage.getItem("userData");
        if (localUserData) {
            setUserData(JSON.parse(localUserData));
        }
    }, [])

    return (
        <UserContext.Provider value={{ userData, setUserData }} >
        <YoutubeContext.Provider value={{youtubeVideos,setYoutubeVideos}} >
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
                        <HashtagPostPage />
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
        </YoutubeContext.Provider>
        </UserContext.Provider>
    )
}