import { 
    CardContainer, 
    LinkContent, 
    CardRigth, 
    CardLeft, 
    EditPostInput, 
    IconDelete,
    IconEdit,
    IconsDiv,
    Superposition,
    ConfirmDeleteScreen,
    SuperpositionButtons,
    CancelButton,
    ConfirmButton 
} from "./CardStyled";
import { Heart, HeartOutline } from 'react-ionicons'
import UserImage from "../UserImage";
import HashtagSpan from "../HashtagSpan";
import { NavLink, Link } from 'react-router-dom'
import { useContext, useRef, useState, useEffect } from "react";
import UserContext from "../../../contexts/UserContext";
import { sendDislikeRequest, sendLikeRequest, sendDeletePostRequest, sendEditPostRequest } from "../../../services/Linkr";
import ReactTooltip from "react-tooltip";


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
    
    const [ likesState, setLikesState] = useState(likes.map(like => {

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

    useEffect(() => {
        if (isEditing) {
            editInputRef.current.focus();
            setEditingText(text);
        }
        
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
                    if(isMyLikesPage)
                        renderPosts()
                })
                .catch(err => {
                    if(err.response.status === 404){
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
                    if(isMyLikesPage)
                        renderPosts()
                })
                .catch(err => {
                    if(err.response.status === 404){
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
                renderPosts();
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
        if (!isPostFromLocalUser){
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

    return (
        <>
            <Superposition ConfirmDeleteState={ConfirmDeleteState}>
                <ConfirmDeleteScreen>
                    <p>Tem certeza que deseja <br /> excluir essa publicação?</p>
                    <SuperpositionButtons>
                        <CancelButton disabled={isLoading ? true : false} onClick={() => setConfirmDeleteState(false)}>
                            Não, voltar
                        </CancelButton>
                        <ConfirmButton disabled={isLoading ? true : false} onClick={() => deletePost(id)}>
                            {isLoading ? "Excluindo..." : "Sim, excluir"}
                        </ConfirmButton>
                    </SuperpositionButtons>
                </ConfirmDeleteScreen>
            </Superposition>
            <CardContainer>
                <CardLeft>
                    <Link to={`/user/${user.id}`}>
                        <UserImage src={user.avatar} />
                    </Link>
                    {isLiked ? <Heart color={'#AC0000'} height="30px" width="30px" onClick={toggleLike} style={{ cursor: 'pointer' }} /> :
                        <HeartOutline color={'#00000'} height="30px" width="30px" onClick={toggleLike} style={{ cursor: 'pointer' }} />}
                    <p data-tip={createTooltip()}>{likesState.length} likes</p>
                    <ReactTooltip place="bottom" type="light" effect="solid" />
                </CardLeft>

                <CardRigth>
                    {!isPostFromLocalUser ? <IconsDiv><NavLink className="usernameLink" to={!isPostFromLocalUser ? `/user/${user.id}` : `/my-posts/`}>
                        <h3 className="username">{user.username}</h3>
                    </NavLink></IconsDiv> :
                        <IconsDiv>
                            <NavLink className="usernameLink" to={!isPostFromLocalUser ? `/user/${user.id}` : `/my-posts/`}>
                                <h3 className="username">{user.username}</h3>
                            </NavLink>
                            <div>
                                <IconEdit onClick={toggleEditBox} />
                                <IconDelete onClick={() => setConfirmDeleteState(true)} />
                            </div>
                        </IconsDiv>
                    }

                    {isEditing ?
                        <EditPostInput
                            ref={editInputRef}
                            value={editingText}
                            onKeyDown={e => {
                                if(e.key === 'Enter'){
                                    e.preventDefault();
                                    editPost();
                                }
                                if(e.key === 'Escape'){
                                    e.preventDefault();
                                    toggleEditBox()
                                }
                            }}
                            onChange={(e) => setEditingText(e.target.value)}
                            disabled={isEditLoading}
                        /> :
                        <p className="description" onClick={toggleEditBox}>{renderDescription()}</p>
                    }
                    <LinkContent>
                        <a href={link}>
                            <div className="linkContent">
                                <h3 className="linkTitle">{linkTitle}</h3>
                                <p className="linkDescription">{linkDescription}</p>
                                <p className="linkUrl">{link}</p>
                            </div>
                            <div class="imgContainer">
                                <img src={linkImage}/>
                            </div>
                        </a>
                    </LinkContent>
                </CardRigth>
            </CardContainer>
        </>
    )
}

