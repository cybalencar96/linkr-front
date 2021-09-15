import "./assets/reset.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/">
                    <LoginPage />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}