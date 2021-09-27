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
import Swal from 'sweetalert2';

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
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Incorrect email or password  , please fill in the fields correctly!',
                      })
                    return;
                }
                if (err.response.status === 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Invalid data, please fill in the fields correctly!',
                      })
                    return;
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                  })
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
                <FrontPageButton type="submit" disabled={isLoading}>Log In</FrontPageButton>
                <Link to={isLoading ? "" : "/sign-up"}>
                    <FrontPageTextLink>First time? Create an account!</FrontPageTextLink>
                </Link>
            </FrontPageForm>
        </PageStyled>
    )
}

