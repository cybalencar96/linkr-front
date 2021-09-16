import PageStyled from "../shared/PageStyled";
import Topbar from "../shared/Topbar/Topbar";
import { TimelineContainer } from "./TimelineStyle";
import Title from '../shared/PageTitle'
import Card from "../shared/Card/Card";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { getPosts } from "../../services/Linkr";
import Loading from "../shared/Loading";


export default function TimelinePage() {
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
        getPosts(config)
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
            <TimelineContainer>
                    <Title>timeline</Title>
                    {
                        posts.length !== 0 ? posts.map(post => <Card post={post}/>) : "Nenhum post encontrado"
                    }
            </TimelineContainer>
        </PageStyled>
    )
}