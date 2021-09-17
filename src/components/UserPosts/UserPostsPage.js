import PageStyled from "../shared/PageStyled";
import Topbar from "../shared/Topbar/Topbar";
import { UserPostsContainer } from "./UserPostsStyled";
import Title from '../shared/PageTitle'
import Card from "../shared/Card/Card";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { getPostsByUserId } from "../../services/Linkr";
import Loading from "../shared/Loading";


export default function UserPostsPage() {
    const {userData} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState("");
    const params = useParams();

    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`
        }
    }
    useEffect(() => {
        setLoading(true);
        getPostsByUserId(params.id, config)
        .then(res => {
            setLoading(false);
            setPosts(res.data.posts)
        })
        .catch(err => {
            setLoading(false);
            alert("Houve uma falha ao obter os posts, por favor atualize a página")
            console.log(err)
        })
    },[])

    if (!posts) {
        return 	<Loading/>
    }

    return (
        <PageStyled>
            <Topbar/>
            <UserPostsContainer>
                    <Title>{posts[0].user.username}'s posts</Title>
                    {
                        posts.length !== 0 ? posts.map(post => <Card post={post}/>) : "Nenhum post encontrado"
                    }
            </UserPostsContainer>
        </PageStyled>
    )
}