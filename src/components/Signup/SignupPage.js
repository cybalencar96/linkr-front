import PageStyled from "../shared/PageStyled";
import FrontPageForm from "../shared/FrontPages/FrontPageForm";
import FrontPageLogoBox from "../shared/FrontPages/FrontPageLogoBox";
import FrontPageInput from "../shared/FrontPages/FrontPageInput";
import FrontPageButton from "../shared/FrontPages/FrontPageButton";
import { useContext, useState } from "react";
import { sendLoginRequest } from "../../services/Linkr";
import UserContext from "../../contexts/UserContext";
import { useHistory } from "react-router";
import FrontPageTextLink from "../shared/FrontPages/FrontPageTextLink";
import { Link } from "react-router-dom";

export default function SignupPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [profleimg , setProfileimg] = useState("");
    let history = useHistory();



    function signup(){

    }

    return (
        <PageStyled>
            <FrontPageLogoBox />
            <FrontPageForm onSubmit={signup} >
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
                <FrontPageInput
                    placeholder="username"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <FrontPageInput
                    placeholder="picture url"
                    type="url"
                    value={profleimg}
                    onChange={e => setProfileimg(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <FrontPageButton type="submit" disabled={isLoading}>Log In</FrontPageButton>
                <Link to={isLoading ? "/sign-up" : "/"}>
                    <FrontPageTextLink>Switch back to log in</FrontPageTextLink>
                </Link>
            </FrontPageForm>
        </PageStyled>
    )
}