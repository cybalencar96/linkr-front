import { TopbarContainer } from "./TopbarStyled";
import { ChevronDownOutline } from 'react-ionicons'
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext"

export default function Topbar() {
    const {userData} = useContext(UserContext)
    console.log(userData.user.avatar)

    return(
        <TopbarContainer>
            <p>Linkr</p>
            <div className="userMenu">
                <ChevronDownOutline color={'#00000'} height="25px" width="25px"/>
                <img src={userData.user.avatar}/>
            </div>
        </TopbarContainer>
    )
    
}

