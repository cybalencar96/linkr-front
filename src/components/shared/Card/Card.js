import { CardContainer, LinkContent, CardRigth, CardLeft } from "./CardStyled";
import { Heart, HeartOutline } from 'react-ionicons'
import UserImage from "../UserImage";
import HashtagSpan from "../HashtagSpan";
import { Link } from 'react-router-dom'
import { useContext, useState } from "react";
import UserContext from "../../../contexts/UserContext";
import { sendDislikeRequest, sendLikeRequest } from "../../../services/Linkr";
import ReactTooltip from "react-tooltip";

export default function Card({post}) {
    const {
        commentCount,
        id,
        likes,
        link,
        linkDescription,
        linkImage,
        linkTitle,
        text,
        user
    } = post
    const [ likesState, setLikesState] = useState(likes.map(like => {
        return {
            userId: like.userId,
            username: like["user.username"]
        }
    }));
    const [ isLoading, setIsLoading] = useState(false)
    const { userData} = useContext(UserContext);
    const isLiked = isLoading !== likesState.map(like => like.userId).includes(userData.user.id);

    function renderDescription() {
        const formatedText = text.split(" ").map(word => {
            if (word[0] === "#") {
                return <Link to={`/hashtag/${word.substring(1)}`}><HashtagSpan> #{word.substring(1)}</HashtagSpan></Link>
            } else {
                return " " + word
            }
        })
        return formatedText
    }
    function toggleLike () {
        console.log(isLoading, )
        if (isLoading){
            return;
        }
        setIsLoading(true)
        if(isLiked){
            sendDislikeRequest(id, userData.token)
                .then(res => {
                    console.log(res.data)
                    setLikesState(res.data.post.likes)
                })
                .catch(err => alert(err))
                .finally(() => setIsLoading(false))
        }else{
            sendLikeRequest(id, userData.token)
                .then(res => {
                    console.log(res.data)
                    setLikesState(res.data.post.likes)
                })
                .catch(err => alert(err))
                .finally(() => setIsLoading(false))
        }
    }
    function createTooltip(){
        let tooltip = "";
        const likesiDsList = likesState.map(like => like.userId)
        const isLikedOnServer = likesiDsList.includes(userData.user.id);
        if(isLikedOnServer){
            const indexOfUser = likesiDsList.indexOf(userData.user.id);
            const OtherUsers = likesState.map((like, i) => i === indexOfUser ? null : like.username)
                .filter((username) => !!username);
            tooltip += `Você,`;
            if(likesState.length > 1){
                tooltip += ` ${OtherUsers[0]},`;
            }
        }else{
            if(likesState.length > 0){
                tooltip += ` ${likesState[0].username},`;
            }
            if(likesState.length > 1){
                tooltip += ` ${likesState[1].username}`;
            }
        }
        if(likesState.length > 2){
            tooltip += ` e outras ${likesState.length - 2}`;
        }
        return tooltip;
    }

    return (
        <CardContainer>
            <CardLeft>
                <Link to={`/user/${user.id}`}>
                    <UserImage src={user.avatar}/>
                </Link>
                {isLiked ? <Heart color={'#AC0000'} height="30px" width="30px" onClick={toggleLike}/> :
                 <HeartOutline color={'#00000'} height="30px" width="30px" onClick={toggleLike}/>}
                <p data-tip={createTooltip()}>{likesState.length} likes</p>
                <ReactTooltip place="bottom" type="light" effect="solid"/>
            </CardLeft>

            <CardRigth>
                <h3 className="username">{user.username}</h3>
                <p className="description">{renderDescription()}</p>
                
                <a href={link}>
                    <LinkContent>
                        <div className="linkContent">
                            <h3 className="linkTitle">{linkTitle}</h3>
                            <p className="linkDescription">{linkDescription}</p>
                            <p className="linkUrl">{link}</p>
                        </div>
                        <img src={linkImage}/>
                    </LinkContent>
                </a>

            </CardRigth>
        </CardContainer>
    )
}