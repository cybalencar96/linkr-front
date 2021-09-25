import { Link } from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";
import FollowingContext from "../../../contexts/FollowingContext";
import { CommentCardBox, ImgComment } from "./CardStyled";

export default function CommentCard({ user, text, userId }) {
    const {listOfFollowing} = useContext(FollowingContext);
    return (
        <>
            <CommentCardBox>
                <Link to={`/user/${user.id}`}>
                    <ImgComment src={user.avatar} />
                </Link>
                <div className="container">
                    <Link to={`/user/${user.id}`}><Username>{user.username}</Username></Link>
                    {user.id === userId && <Tag> • post’s author</Tag>}
                    {listOfFollowing.includes(user.id) && <Tag> • following</Tag> }
                    <p>{text}</p>
                </div>
            </CommentCardBox>
            <Line />
        </>
    )
}

const Username = styled.span`
    color: #f3f3f3;
    font-weight: 700;
`;

const Tag = styled.span`
    color: #565656;
`;

const Line = styled.div`
    height: 1px;
    width: calc(100% - 40px);
    background-color: #353535;
    margin: 0 auto;
`
