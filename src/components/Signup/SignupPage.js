import PageStyled from "../shared/PageStyled";
import FrontPageForm from "../shared/FrontPages/FrontPageForm";
import FrontPageLogoBox from "../shared/FrontPages/FrontPageLogoBox";
import FrontPageInput from "../shared/FrontPages/FrontPageInput";
import FrontPageButton from "../shared/FrontPages/FrontPageButton";
import { useHistory } from "react-router";
import FrontPageTextLink from "../shared/FrontPages/FrontPageTextLink";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { sendSignupRequest } from "../../services/Linkr";
import UserContext from "../../contexts/UserContext";
import Swal from 'sweetalert2';

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { userData } = useContext(UserContext);
    let history = useHistory();

    useEffect(() => {
        if (userData) {
            history.push("/timeline");
        }
    }, [userData])

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
                Swal.fire({
                    icon: 'success',
                    title: 'Yaaay!!',
                    text: 'Welcome to the Linkr family. Please sign up!',
                  })
                history.push("/");
            })
            .catch((err) => {
                setIsLoading(false)
                if (err.response.status === 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Invalid data, please fill in the fields correctly!',
                      })
                    return;
                }
                if (err.response.status === 403) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Email already used, try another one!',
                      })
                    return;
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
                console.log(err)
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
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,10}$"
                    title="example@example.com"
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
                    pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)(.jpg|.png|.jpeg|.gif)"
                    title="https://example.(jpg, png, jpeg, gif)"
                />
                <FrontPageButton type="submit" disabled={isLoading}>Sign Up</FrontPageButton>
                <Link to={isLoading ? "/sign-up" : "/"}>
                    <FrontPageTextLink>Switch back to log in</FrontPageTextLink>
                </Link>
            </FrontPageForm>
        </PageStyled>
    )
}