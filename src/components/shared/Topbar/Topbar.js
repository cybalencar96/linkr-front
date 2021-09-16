import { TopbarContainer } from "./TopbarStyled";
import { ChevronDownOutline } from 'react-ionicons'
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext"
import UserImage from "../UserImage";
import { Link } from "react-router-dom";

export default function Topbar() {
    const {userData} = useContext(UserContext)
    return(
        <TopbarContainer>
            <Link to="timeline"><p>Linkr</p></Link>
            <div className="userMenu">
                <ChevronDownOutline color={'#00000'} height="25px" width="25px"/>
                <Link to="/my-likes"><UserImage src={userData.user.avatar}/></Link>
            </div>
        </TopbarContainer>
    )
    
}

