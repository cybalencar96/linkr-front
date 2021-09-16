import PageStyled from "../shared/PageStyled";
import Topbar from "../shared/Topbar/Topbar";
import { TimelineContainer } from "./TimelineStyle";
import Title from '../shared/PageTitle'
import Card from "../shared/Card/Card";
import PostLink from "../PublishLink/PostLink";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { getPosts } from "../../services/Linkr";
import Loading from "../shared/Loading";
import HashtagsInTranding from "../HashtagsInTranding/HashtgasInTranding";
import styled from "styled-components";


export default function TimelinePage() {
    const {userData, posts, setPosts} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`
        }
    }
    function imprime () {
        console.log(posts);
    }

    useEffect(() => {
        setLoading(true);
        getPosts(config)
        .then(res => {
            setLoading(false);
            setPosts(res.data.posts)
            console.log(res.data.posts)
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
            <Container>
            <TimelineContainer>
                    <Title>timeline</Title>
                    <PostLink/>   
                    {
                       
                        posts.length !== 0 ? posts.map(post => <Card post={post}/>) : "Nenhum post encontrado"
                    }
            </TimelineContainer>
            <HashtagsInTranding />
            </Container>
            
        </PageStyled>
    )
}

const Container = styled.div`
    display:flex;
`