import "./assets/reset.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import UserContext from "./contexts/UserContext";
import { useState } from "react";
import SignupPage from "./components/Signup/SignupPage";
import PostLink from "./components/PublishLink/PostLink";
import Topbar from "./components/shared/Topbar/Topbar"
import PageStyled from "./components/shared/PageStyled";

export default function App() {
    const [userData, setUserData] = useState(null)

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
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
                        <PageStyled>
                            <PostLink />
                        </PageStyled>
                    </Route>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    )
}