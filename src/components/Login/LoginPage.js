import PageStyled from "../shared/PageStyled";
import FrontPageFormStyled from "../shared/FrontPageFormStyled";
import FrontPageLogoBox from "../shared/FrontPageLogoBox";
import FrontPageInput from "../shared/FrontPageInput";
import FrontPageButton from "../shared/FrontPageButton";
import { useContext, useState } from "react";
import { sendLoginRequest } from "../../services/Linkr";
import UserContext from "../../contexts/UserContext";
import { useHistory } from "react-router";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUserData } = useContext(UserContext);
    let history = useHistory();

    function login(e) {
        e.preventDefault();
        const body = {
            email,
            password
        }
        sendLoginRequest(body)
            .then(res => {
                setUserData(res.data);
                history.push("/timeline");
            })
    }

    return (
        <PageStyled>
            <FrontPageLogoBox />
            <FrontPageFormStyled onSubmit={login} >
                <FrontPageInput
                    placeholder="e-mail"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <FrontPageInput
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <FrontPageButton type="submit">Log In</FrontPageButton>
            </FrontPageFormStyled>
        </PageStyled>
    )
}

