import PageStyled from "../shared/PageStyled";
import FrontPageForm from "../shared/FrontPages/FrontPageForm";
import FrontPageLogoBox from "../shared/FrontPages/FrontPageLogoBox";
import FrontPageInput from "../shared/FrontPages/FrontPageInput";
import FrontPageButton from "../shared/FrontPages/FrontPageButton";
import { useHistory } from "react-router";
import FrontPageTextLink from "../shared/FrontPages/FrontPageTextLink";
import { Link } from "react-router-dom";
import {  useState } from "react";
import { sendSignupRequest } from "../../services/Linkr";

export default function SignupPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    let history = useHistory();

    function signup(e) {
        e.preventDefault();
        setIsLoading(true);
        const body = {
            email,
            password,
            username,
            pictureUrl
        }
        sendSignupRequest(body)
            .then((res) => {
                setIsLoading(false)
                history.push("/");
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    alert("Invalid data, please fill in the fields correctly!");
                    return;
                }
                if (err.response.status === 403) {
                    alert("Email already used, try another one!");
                    return;
                }
                alert(err);
                setIsLoading(false)
            })
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
                    value={pictureUrl}
                    onChange={e => setPictureUrl(e.target.value)}
                    required
                    disabled={isLoading}
                    pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)(.jpg|.png|.jpeg)"
                />
                <FrontPageButton type="submit" disabled={isLoading}>Sign Up</FrontPageButton>
                <Link to={isLoading ? "/sign-up" : "/"}>
                    <FrontPageTextLink>Switch back to log in</FrontPageTextLink>
                </Link>
            </FrontPageForm>
        </PageStyled>
    )
}