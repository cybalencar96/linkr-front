import { TopbarContainer } from "./TopbarStyled";
import Menu from "./Menu";
import { Link } from "react-router-dom";

export default function Topbar() {

    return(
        <TopbarContainer>
            <Link to="/timeline"><p>Linkr</p></Link>
            <Menu />
        </TopbarContainer>
    )
    
}

