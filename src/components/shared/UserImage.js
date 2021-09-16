import styled from "styled-components"
import { useContext } from "react"
import UserContext from "../../contexts/UserContext"

export default function UserImage ({width,height,...otherProps}) {
    const {userData} = useContext(UserContext);

    return (
        <Image
            src={userData.user.avatar}
            alt="" width={width}
            height={height}
            {...otherProps}
        />
    )
}

const Image = styled.img`
    width: ${props => props.width ? props.width : "50px"};
    height: ${props => props.height ? props.height : "50px"};
    border-radius: 26.5px;
    object-fit: cover;
`


