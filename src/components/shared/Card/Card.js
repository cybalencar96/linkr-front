import {
    CardContainer,
    LinkContent,
    CardRigth,
    CardLeft,
    EditPostInput,
    IconDelete,
    IconEdit,
    IconsDiv,
    IconLocation,
    CommentBox,
    CommentCardBox,
    CommentInput,
    ImgComment,
    IframeContainer,
    RepostedBox,
} from "./CardStyled";
import { Heart, HeartOutline, ChatbubblesOutline, RepeatSharp, PaperPlaneOutline } from 'react-ionicons'
import UserImage from "../UserImage";
import HashtagSpan from "../HashtagSpan";
import { NavLink, Link, useHistory } from 'react-router-dom'
import { useContext, useRef, useState, useEffect } from "react";
import UserContext from "../../../contexts/UserContext";
import {
    validadeUrlImage,
    sendDislikeRequest,
    sendLikeRequest,
    sendDeletePostRequest,
    sendEditPostRequest,
    getComments,
    sendComment
} from "../../../services/Linkr";
import ReactTooltip from "react-tooltip";
import CardModal from "../CardModal";
import YouTbFrame from "../YouTbFrame";
import getYouTubeID from 'get-youtube-id';
import CommentCard from "./CommentCard";
import MapView from "../GeolocationCardModal";
import useWindowDimensions from "../../../services/hooks/useWindowDimensions";
import Swal from 'sweetalert2';


export default function Card({ post, renderPosts, isMyLikesPage }) {
    const {
        commentCount,
        id,
        likes,
        link,
        linkDescription,
        linkImage,
        linkTitle,
        text,
        geolocation,
        user,
        repostCount,
        repostedBy
    } = post

    const [likesState, setLikesState] = useState(likes.map(like => {
        return {
            userId: like.userId,
            username: like["user.username"]
        }
    }));

    const [isLoading, setIsLoading] = useState(false)
    const { userData } = useContext(UserContext);
    const isLiked = (isLoading !== likesState.map(like => like.userId).includes(userData.user.id));
    const [ConfirmDeleteState, setConfirmDeleteState] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingText, setEditingText] = useState(text);
    const editInputRef = useRef();
    const [isEditLoading, setIsEditLoading] = useState(false);
    const isPostFromLocalUser = (userData.user.id === user.id);
    const [isUserImageValid, setIsUserImageValid] = useState(true);
    const youtubeId = getYouTubeID(link, { fuzzy: false });
    const [showMap, setShowMap] = useState(false);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [isIframeOpen, setIsIframeOpen] = useState(false);
    const { windowWidth } = useWindowDimensions();

    useEffect(() => {
        setLikesState(likes.map(like => {
            return {
                userId: like.userId,
                username: like["user.username"]
            }
        }))
    }, [likes])

    useEffect(() => {
        if (isEditing) {
            editInputRef.current.focus();
            setEditingText(text);
        }
        setIsUserImageValid(isValidUserImage(user.avatar));

    }, [isEditing]);

    function renderDescription(unFormatedText) {
        const formatedText = unFormatedText.split(" ").map(word => {
            if (word[0] === "#") {
                return <Link to={`/hashtag/${word.substring(1)}`}><HashtagSpan> #{word.substring(1)}</HashtagSpan></Link>
            } else {
                return " " + word
            }
        })
        return formatedText
    }

    function toggleLike() {
        if (isLoading) {
            return;
        }
        setIsLoading(true)
        if (isLiked) {
            sendDislikeRequest(id, userData.token)
                .then(res => {
                    setLikesState(res.data.post.likes)
                    if (isMyLikesPage)
                        renderPosts(true)
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Link has been deleted',
                        })
                        return;
                    }
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong! Plesa refresh the page...',
                    })
                })
                .finally(() => setIsLoading(false))
        } else {
            sendLikeRequest(id, userData.token)
                .then(res => {
                    setLikesState(res.data.post.likes)
                    if (isMyLikesPage)
                        renderPosts(true)
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Link has been deleted',
                        })
                        return;
                    }
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong! Plesa refresh the page...',
                    })
                })
                .finally(() => setIsLoading(false))
        }
    }

    function createTooltip() {
        let tooltip = "";
        const likesiDsList = likesState.map(like => like.userId)
        const isLikedOnServer = likesiDsList.includes(userData.user.id);
        if (isLikedOnServer) {
            const indexOfUser = likesiDsList.indexOf(userData.user.id);
            const OtherUsers = likesState.map((like, i) => i === indexOfUser ? null : like.username)
                .filter((username) => !!username);
            tooltip += `Você`;
            if (likesState.length > 1) {
                tooltip += `, ${OtherUsers[0]}`;
            }
        } else {
            if (likesState.length > 0) {
                tooltip += likesState[0].username;
            }
            if (likesState.length > 1) {
                tooltip += `, ${likesState[1].username}`;
            }
        }
        if (likesState.length > 2) {
            tooltip += ` e outras ${likesState.length - 2} ${likesState.length === 3 ? "pessoa" : "pessoas"}`;
        }
        return tooltip;
    }

    function deletePost(postId) {
        setIsLoading(true);
        sendDeletePostRequest(postId, userData.token)

            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Bye bye!!',
                    text: 'Link has been deleted!',
                })
                setIsLoading(false);
                setConfirmDeleteState(false);
                renderPosts(true);
            })
            .catch(() => {
                setIsLoading(false);
                setTimeout(() => {
                    alert(

                    );
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: '"Could not delete your Link! Please repeat the procedure."',
                    })
                }, 900);
                setConfirmDeleteState(false);
            });
    }

    function toggleEditBox() {
        if (!isPostFromLocalUser) {
            return;
        }
        setIsEditing(!isEditing);
    }

    function editPost() {
        setIsEditLoading(true);
        sendEditPostRequest(id, editingText, userData.token)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Much better!',
                    text: 'Your Link description has been edited successfully!',
                })
                renderPosts(true);
                toggleEditBox();
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Could not edit your Link! Please repeat the procedure.',
                })
            })
            .finally(() => setIsEditLoading(false));
    }

    function isValidUserImage(url) {
        validadeUrlImage(url)
            .then(res => {
                setIsUserImageValid(true)
            })
            .catch(err => {
                setIsUserImageValid(false)
            })
    }



    function toggleComments() {
        if (!isCommentsOpen) {
            getComments(id, userData.token)
                .then(res => setComments(res.data.comments))
                .catch(err => { })
        }
        setIsCommentsOpen(!isCommentsOpen);
    }

    function comment() {
        sendComment(id, commentText, userData.token)
            .then(res => {
                setCommentText("");
                getComments(id, userData.token)
                    .then(res => setComments(res.data.comments))
                    .catch(err => { })
            })
            .catch(err => alert("Could comment the post! Please repeat the procedure."))
    }

    function openIframe(e) {
        if (windowWidth > 992) {
            (e.target !== e.currentTarget) && setIsIframeOpen(true);
        } else {
            window.open(link)
        }
    }

    function closeIframe(e) {
        (e.target === e.currentTarget) && setIsIframeOpen(false);
    }

    return (
        <>
            {ConfirmDeleteState && <CardModal type="deletePost" isLoading={isLoading} handler={deletePost} postId={id} setModalState={setConfirmDeleteState} />}
            {showMap && <MapView username={user.username} geolocation={geolocation} showMap={showMap} setShowMap={setShowMap} />}

            <CommentBox>
                {repostedBy &&
                    <RepostedBox>
                        <RepeatSharp
                            color={'#FFF'}
                            height="25px"
                            width="25px"
                        />
                        <p>Re-posted by {repostedBy.id === userData.user.id ? <span className="username">you</span> :
                            <NavLink
                                className="usernameLink"
                                to={{
                                    pathname: `/user/${repostedBy.id}`,
                                    state: {
                                        username: repostedBy.username
                                    }
                                }}
                            >
                                <span className="username">{repostedBy.username}</span>
                            </NavLink>
                            }
                        </p>
                    </RepostedBox>
                }
                <CardContainer>
                    <CardLeft>
                        <Link to={{ pathname: `/user/${user.id}`, state: { username: user.username } }}>
                            {isUserImageValid ? <UserImage src={user.avatar} alt="userImage" /> : <UserImage src="/imageNotFound.jpg" alt="NotFound" />}
                        </Link>
                        <div className="actionBox" data-tip={createTooltip()}>
                            {isLiked ?
                                <Heart
                                    color={'#AC0000'}
                                    height="25px"
                                    width="25px"
                                    onClick={toggleLike}
                                    style={{ cursor: 'pointer' }}
                                />
                                :
                                <HeartOutline
                                    color={'#00000'}
                                    height="25px"
                                    width="25px"
                                    onClick={toggleLike}
                                    style={{ cursor: 'pointer' }}
                                />
                            }
                            <p>{likesState.length} likes</p>
                        </div>
                        <div className="actionBox" >
                            <ChatbubblesOutline
                                color={'#FFF'}
                                height="25px"
                                width="25px"
                                style={{ cursor: 'pointer' }}
                                onClick={toggleComments}
                            />
                            <p>{commentCount} comments</p>
                        </div>
                        <div className="actionBox" >
                            <RepeatSharp
                                color={'#FFF'}
                                height="25px"
                                width="25px"
                                style={{ cursor: 'pointer' }}
                            />
                            <p>{repostCount} reposts</p>
                        </div>
                        <ReactTooltip place="bottom" type="light" effect="solid" />
                    </CardLeft>

                    <CardRigth>
                        <IconsDiv>

                            <div className="usernameContainer">
                                <NavLink
                                    className="usernameLink"
                                    to={{
                                        pathname: `/user/${user.id}`,
                                        state: {
                                            username: user.username
                                        }
                                    }}
                                >
                                    <h3 className="username">{user.username}</h3>
                                </NavLink>
                                {geolocation ? <IconLocation onClick={() => setShowMap(true)} /> : ""}
                            </div>

                            {isPostFromLocalUser &&
                                <div>
                                    <IconEdit onClick={toggleEditBox} />
                                    <IconDelete onClick={() => setConfirmDeleteState(true)} />
                                </div>
                            }
                        </IconsDiv>

                        {isEditing ?
                            <EditPostInput
                                ref={editInputRef}
                                value={editingText}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        editPost();
                                    }
                                    if (e.key === 'Escape') {
                                        e.preventDefault();
                                        toggleEditBox()
                                    }
                                }}
                                onChange={(e) => setEditingText(e.target.value)}
                                disabled={isEditLoading}
                            /> :
                            <p className="description" onClick={toggleEditBox}>{renderDescription(text)}</p>
                        }
                        {
                            youtubeId ?
                                <YouTbFrame youtubeId={youtubeId} />
                                :
                                <LinkContent onClick={openIframe}>
                                    <div className="linkContent">
                                        <h3 className="linkTitle">{linkTitle ? linkTitle : "xXx Title Not Found xXx"}</h3>
                                        <p className="linkDescription">{linkDescription ? linkDescription : "xXx Description Not Found xXx"}</p>
                                        <p className="linkUrl">{link ? link.toLowerCase() : "xXx Link Not Found xXx"}</p>
                                    </div>
                                    <div class="imgContainer">
                                        {linkImage ? <img src={linkImage} alt="link da imagem" /> : <img src="/imageNotFound.jpg" alt="image not found" />}
                                    </div>
                                </LinkContent>
                        }
                        {isIframeOpen &&
                            <IframeContainer onClick={closeIframe}>
                                <section>
                                    <header>
                                        <a href={link} target="_blank" onClick={closeIframe}>Open in new tab</a>
                                        <p onClick={closeIframe}>X</p>
                                    </header>
                                    <iframe className="iframe" src={link}></iframe>
                                </section>
                            </IframeContainer>
                        }
                    </CardRigth>
                </CardContainer>

                {isCommentsOpen &&
                    <>
                        {comments.map((comment) => <CommentCard user={comment.user} text={renderDescription(comment.text)} userId={user.id} />)}

                        <CommentCardBox>
                            <Link to={`/user/${user.id}`}><ImgComment src={userData.user.avatar} alt="userImage" /></Link>
                            <CommentInput
                                value={commentText}
                                placeholder="write a comment..."
                                onChange={e => setCommentText(e.target.value)}
                                onKeyUp={e => { if (e.key === "Enter") comment() }}
                            />
                            <div className="send">
                                <PaperPlaneOutline
                                    color={'#F3F3F3'}
                                    height="15px"
                                    width="15px"
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                    onClick={comment} />
                            </div>
                        </CommentCardBox>
                    </>
                }
            </CommentBox>
        </>
    )
}
