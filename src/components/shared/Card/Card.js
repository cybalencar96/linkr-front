import { CardContainer, LinkContent, CardRigth, CardLeft } from "./CardStyled";
import { HeartOutline } from 'react-ionicons'
import UserImage from "../UserImage";
import HashtagSpan from "../HashtagSpan";
import { Link } from 'react-router-dom'

export default function Card(post) {

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
    } = post.post

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


    return (
        <CardContainer>
            <CardLeft>
                <Link to={`/user/${user.id}`}>
                    <UserImage src={user.avatar}/>
                </Link>
                <HeartOutline color={'#00000'} height="20px" width="20px"/>
                <p>{likes.length} likes</p>
            </CardLeft>

            <CardRigth>
                <Link to={`/user/${user.id}`}>
                    <h3 className="username">{user.username}</h3>
                </Link>
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