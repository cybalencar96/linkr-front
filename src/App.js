import "./assets/reset.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import UserContext from "./contexts/UserContext";
import { useState } from "react";
import SignupPage from "./components/Signup/SignupPage";
import PostLink from "./components/PublishLink/PostLink";
export default function App() {
    const [userData, setUserData] = useState()

    return (
        <UserContext.Provider value={{userData, setUserData}}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <LoginPage />
                    </Route>
                    <Route path="/sign-up" exact>
                        <SignupPage />
                    </Route>
                    {/* <Route path="/timeline" exact>

                    </Route> */}
                    <Route path="/timeline" exact>
                        <PostLink />
                    </Route>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    )
}