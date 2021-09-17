import PageStyled from "../shared/PageStyled";
import Topbar from "../shared/Topbar/Topbar";
import { MyPostsContainer } from "./MyPostsStyled";
import Title from '../shared/PageTitle'
import Card from "../shared/Card/Card";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { getPostsByUserId } from "../../services/Linkr";
import Loading from "../shared/Loading";
import HashtagsInTranding from "../shared/HashtagsInTranding/HashtagsInTranding";
import NoPosts from "../shared/NoPosts";

export default function MyPostsPage() {
    const {userData} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState("");
    
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`
        }
    }

    useEffect(() => {
        setLoading(true);
        getPostsByUserId(userData.user.id,config)
            .then(res => {
                setLoading(false);
                setPosts(res.data.posts)
            })
            .catch(err => {
                setLoading(false);
                alert("Houve uma falha ao obter os posts, por favor atualize a página")
            })
    },[])


    if (!posts) {
        return 	<Loading/>
    }

    return (
        <PageStyled centralized>
            <Topbar/>
            <MyPostsContainer>
                    <div>
                        <Title>my posts</Title>
                        {posts.length !== 0 ? posts.map(post => <Card post={post}/>) : <NoPosts/>}
                    </div>
                    <HashtagsInTranding />
            </MyPostsContainer>
        </PageStyled>
    )
}
