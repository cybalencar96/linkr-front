import PageStyled from "../shared/PageStyled";
import FrontPageFormStyled from "../shared/FrontPageFormStyled";
import FrontPageLogoBox from "../shared/FrontPageLogoBox";
import FrontPageInput from "../shared/FrontPageInput";

export default function LoginPage() {
    return(
        <PageStyled>
            <FrontPageLogoBox />
            <FrontPageFormStyled >
                <FrontPageInput placeholder="e-mail" />
                <FrontPageInput placeholder="password"/>
            </FrontPageFormStyled>
        </PageStyled>
    )
}

