import { TopbarContainer } from "./TopbarStyled";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext"
import Menu from "./Menu";
import { Link } from "react-router-dom";

export default function Topbar() {
    const {userData} = useContext(UserContext);

    return(
        <TopbarContainer>
            <Link to="/timeline"><p>Linkr</p></Link>
            <Menu />
        </TopbarContainer>
    )
    
}

