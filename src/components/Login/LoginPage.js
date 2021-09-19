import PageStyled from "../shared/PageStyled";
import FrontPageForm from "../shared/FrontPages/FrontPageForm";
import FrontPageLogoBox from "../shared/FrontPages/FrontPageLogoBox";
import FrontPageInput from "../shared/FrontPages/FrontPageInput";
import FrontPageButton from "../shared/FrontPages/FrontPageButton";
import { useContext, useEffect, useState } from "react";
import { sendLoginRequest } from "../../services/Linkr";
import UserContext from "../../contexts/UserContext";
import { useHistory } from "react-router";
import FrontPageTextLink from "../shared/FrontPages/FrontPageTextLink";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { userData, setUserData } = useContext(UserContext);
    let history = useHistory();

    useEffect(() => {
        if (userData) {
            history.push("/timeline");
        }
    }, [userData])

    function login(e) {
        setIsLoading(true);
        e.preventDefault();
        const body = {
            email,
            password
        }
        sendLoginRequest(body)
            .then(res => {
                setIsLoading(false);
                setUserData(res.data);
                localStorage.setItem("userData", JSON.stringify(res.data));
                history.push("/timeline");
            })
            .catch(err => {
                setIsLoading(false)
                if (err.response.status === 401 || err.response.status === 403) {
                    alert("Incorrect email or password!");
                    return;
                }
                if (err.response.status === 400) {
                    alert("Invalid email!");
                    return;
                }
                alert(err);
            })
    }

    return (
        <PageStyled>
            <FrontPageLogoBox />
            <FrontPageForm onSubmit={login} >
                <FrontPageInput
                    placeholder="e-mail"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <FrontPageInput
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <FrontPageButton type="submit" disabled={isLoading}>Log In</FrontPageButton>
                <Link to={isLoading ? "" : "/sign-up"}>
                    <FrontPageTextLink>First time? Create an account!</FrontPageTextLink>
                </Link>
            </FrontPageForm>
        </PageStyled>
    )
}

