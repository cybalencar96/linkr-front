import { useContext, useState } from "react";
import styled from "styled-components"
import UserContext from "../../contexts/UserContext";
import { sendPostLinkRequest } from "../../services/Linkr";
export default function PostLink () {

    const [url, setUrl] = useState("");
    const [comment, setComment] = useState("");
    const { userData } = useContext(UserContext);

    function publish (event) {

        console.log("publicando...")
        event.preventDefault(); 
        const body = {
            "text": comment,
            "link": url
        }
        const config ={
            headers: {
                "Authorization": `Bearer ${userData.token}`
            }
        }
        sendPostLinkRequest(body, config)
            .then((response) => console.log(response.data))
            .catch(error => console.log(error))
            .finally(() => console.log("finalizou"));
    }
    return (
        <PostDiv>
            <Image src="https://s3-alpha-sig.figma.com/img/c479/3a0f/8f11858fb84ab14ab8ee5937e83743ed?Expires=1632700800&Signature=OKojIkACmP0ZV5xzluC~O3goBNw~oVr8wt3fYj~Fl6xmsrbdzjWH84BD~RjzalkJUm9JirikhLifLXwvsGbuA2Qw8AlCcLpan6v1Zl-12YivCDl-MncL95EsBrDUDILQi4~zKHFkuDI1SyJY9zv-kpxwuYhRJKn5f9FWD3qacGe35BRPS4gxbBsdJbvuWD0W29FXcGl0DGnsF5gninW2UUKGeMUWBN1-2vh3n6wy6qo5KEFaOzeM3emkFcYYmXpouyjfJY0rKlfKwcYlH-YkivEvFoY4tluJ1wgCCdgHPiRgiCHBqHBIO3b9kk9HU7XDddXMoeNNlVMOBlvyEvlybw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"/>
            <ContainerPost>
                <ContainerSubmit onSubmit={publish}>
                    <h1>
                        O que você tem pra favoritar hoje?
                    </h1>
                    <InputLink type="url" placeholder="http://..." value={url} onChange={(e) => setUrl(e.target.value)} required></InputLink>
                    <InputComment type="text" placeholder="Muito irado esse link falando de #javascript" value={comment} onChange={(e) => setComment(e.target.value)}></InputComment>
                    <PublishButton type="submit">Publish</PublishButton>
                </ContainerSubmit>
            </ContainerPost>
        </PostDiv>
    )
}

const PostDiv = styled.div`
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    max-width: 611px;
    width: 611px;
    height: 210px;
    display: flex;

    background-color: #FFFFFF;
    h1 {
        font-size: 20px;
        color: #707070;
        line-height: 24px;
    }
    input {
        border: none;
        border-radius: 5px;
        margin-top: 8px;
        max-width: 530px;
        width: 530px;
        outline: none;
        font-size: 15px;
    }
    input::placeholder{
        color: #949494
    }
    input:not(:focus), input:focus{
        padding-left: 10px;
    }
`

const InputLink = styled.input`
    background-color: #EFEFEF;
`
const InputComment = styled.input`
    height: 66px;
    background-color: #EFEFEF;
`
const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    margin-top: 15px;
`
const ContainerPost = styled.div`
    margin-top: 15px;
`
const ContainerSubmit = styled.form`
    display: flex;
    flex-direction: column;
    background-color: white;
    margin-left: 10px;

`
const PublishButton = styled.button`
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-weight: 700;
    background-color: #1877F2;
    width: 112px;
    height: 31px;
    align-self: flex-end;
    color: #FFFFFF;
    margin-top: 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
`