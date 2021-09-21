import { TopbarContainer } from "./TopbarStyled";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import useWindowDimensions from "../../../services/hooks/useWindowDimensions"

export default function Topbar() {
    const { windowWidth } = useWindowDimensions();

    return(
        <TopbarContainer>
            <Link to="/timeline"><p>Linkr</p></Link>
            <SearchBar display={windowWidth < 992 ? "none" : ""}/>
            <Menu />
        </TopbarContainer>
    ) 
}

