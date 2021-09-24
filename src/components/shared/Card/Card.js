import {
    CardContainer,
    LinkContent,
    CardRigth,
    CardLeft,
    EditPostInput,
    IconDelete,
    IconEdit,
    IconsDiv,
} from "./CardStyled";
import { Heart, HeartOutline } from 'react-ionicons'
import UserImage from "../UserImage";
import HashtagSpan from "../HashtagSpan";
import { NavLink, Link } from 'react-router-dom'
import { useContext, useRef, useState, useEffect } from "react";
import UserContext from "../../../contexts/UserContext";
import {
    validadeUrlImage,
    sendDislikeRequest,
    sendLikeRequest,
    sendDeletePostRequest,
    sendEditPostRequest
} from "../../../services/Linkr";
import ReactTooltip from "react-tooltip";
import ExcludeCardModal from "../ExcludeCardModal";
import YouTbFrame from "../YouTbFrame";
import getYouTubeID from 'get-youtube-id';
import YoutubeContext from "../../../contexts/YoutubeContext";

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
        user
    } = post

    const [likesState, setLikesState] = useState(likes.map(like => {
        return {
            userId: like.userId,
            username: like["user.username"]
        }
    }));

    const [isLoading, setIsLoading] = useState(false)
    const { userData } = useContext(UserContext);
    const { setYoutubeVideos } = useContext(YoutubeContext);
    const isLiked = (isLoading !== likesState.map(like => like.userId).includes(userData.user.id));
    const [ConfirmDeleteState, setConfirmDeleteState] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingText, setEditingText] = useState(text);
    const editInputRef = useRef();
    const [isEditLoading, setIsEditLoading] = useState(false);
    const isPostFromLocalUser = (userData.user.id === user.id);
    const [isUserImageValid, setIsUserImageValid] = useState(true);
    const youtubeId = getYouTubeID(link, { fuzzy: false });

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
        setIsUserImageValid(isValidUserImage(user.avatar))

    }, [isEditing]);

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
                        alert("Post has been deleted!");
                        return;
                    }

                    alert(err)
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
                        alert("Post has been deleted!");
                        return;
                    }

                    alert(err)
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
                setIsLoading(false);
                setConfirmDeleteState(false);
                renderPosts(true);
            })
            .catch(() => {
                setIsLoading(false);
                setTimeout(() => {
                    alert(
                        "Could not delete your post! Please repeat the procedure."
                    );
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
                renderPosts();
                toggleEditBox();
            })
            .catch(err => {
                alert("Could not edit your post! Please repeat the procedure.");
            })
            .finally(() => setIsEditLoading(false));
    }

    function isValidUserImage(url) {
        validadeUrlImage(url)
            .then(res => {
                setIsUserImageValid(true)
            })
            .catch(err => {
                console.log(err)
                setIsUserImageValid(false)
            })
    }

    return (
        <>
            <ExcludeCardModal isLoading={isLoading} deletePost={deletePost} postId={id} ConfirmDeleteState={ConfirmDeleteState} setConfirmDeleteState={setConfirmDeleteState} />
            <CardContainer>
                <CardLeft>
                    <Link to={`/user/${user.id}`}>
                        {isUserImageValid ? <UserImage src={user.avatar} alt="userImage" /> : <UserImage src="/imageNotFound.jpg" alt="NotFound" />}
                    </Link>
                    <div className="likeBox" data-tip={createTooltip()}>
                        {isLiked ?
                            <Heart
                                color={'#AC0000'}
                                height="30px"
                                width="30px"
                                onClick={toggleLike}
                                style={{ cursor: 'pointer' }}
                            />
                            :
                            <HeartOutline
                                color={'#00000'}
                                height="30px"
                                width="30px"
                                onClick={toggleLike}
                                style={{ cursor: 'pointer' }}
                            />
                        }
                        <p>{likesState.length} likes</p>
                    </div>
                    <ReactTooltip place="bottom" type="light" effect="solid" />
                </CardLeft>

                <CardRigth>
                    <IconsDiv>
                        <NavLink
                            className="usernameLink"
                            to={!isPostFromLocalUser ? `/user/${user.id}` : `/my-posts`}
                        >
                            <h3 className="username">{user.username}</h3>
                        </NavLink>
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
                        <p className="description" onClick={toggleEditBox}>{renderDescription()}</p>
                    }
                    {youtubeId ?
                        <YouTbFrame youtubeId={youtubeId} />
                        :
                        <LinkContent>
                            <a href={link} target="_blank">
                                <div className="linkContent">
                                    <h3 className="linkTitle">{linkTitle ? linkTitle : "xXx Title Not Found xXx"}</h3>
                                    <p className="linkDescription">{linkDescription ? linkDescription : "xXx Description Not Found xXx"}</p>
                                    <p className="linkUrl">{link ? link.toLowerCase() : "xXx Link Not Found xXx"}</p>
                                </div>
                                <div class="imgContainer">
                                    {linkImage ? <img src={linkImage} alt="link da imagem" /> : <img src="/imageNotFound.jpg" alt="image not found" />}
                                </div>
                            </a>
                        </LinkContent>
                    }
                </CardRigth>
            </CardContainer>
        </>
    )
}
