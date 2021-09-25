import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"
import UserContext from "../../../contexts/UserContext";
import { sendPostLinkRequest } from "../../../services/Linkr";
import { IoLocationOutline } from "react-icons/io5"
export default function PostLink ({renderPosts}) {

    const [url, setUrl] = useState("");
    const [comment, setComment] = useState("");
    const {userData} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [locationState, setLocationState] = useState(false);
    const [coordinates, setCoordinates] = useState("")
    function activeLocation () {
        if ("geolocation" in navigator) {
          
          setLocationState(!locationState)
          navigator.geolocation.getCurrentPosition(function(position) {
            setCoordinates(!locationState ? position.coords : "");
          }, function(error){
              alert("Erro ao adquirir coordenadas")
          })      
        }
        else {
          alert("Não foi possível encontrar a localização")
          setLocationState(false)
        }
    }

    function publish (event) {

        event.preventDefault(); 
        
        setIsLoading(true);

        const body = {
            "text": comment,
            "link": url,
            geolocation: {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude
            }
        };
        const config ={
            headers: {
                "Authorization": `Bearer ${userData.token}`
            }
        }
        sendPostLinkRequest(body, config)
            .then((response) => {
                renderPosts();
                setLocationState(!locationState);
            })
            .catch(error => {
                alert("oops! Houve um erro ao publicar seu link");
            })
            .finally(() => {
                setIsLoading(false);
                setComment("");
                setUrl("");
            })
    }
    
    return (
        <PostDiv>
            <Link to="/my-posts"><Image src={userData.user.avatar}/></Link>
            <ContainerPost>
                <ContainerSubmit onSubmit={publish}>
                    <h1>O que você tem pra favoritar hoje?</h1>
                    <InputLink 
                        type="url" 
                        placeholder="http://..." 
                        value={url} 
                        onChange={(e) => setUrl(e.target.value)} 
                        required
                        disabled={isLoading}
                    />
                    <InputComment 
                        type="text" 
                        placeholder="Muito irado esse link falando de #javascript" 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)}
                        disabled={isLoading}
                    />
                    <FooterPublishLink>
                        <LocationButton locationState={locationState}  onClick={activeLocation}>
                        <LocationICon />
                            {locationState ? "Localização ativada" : "Localização desativada"}
                        </LocationButton>
                        <PublishButton type="submit" disabled={isLoading}>{isLoading? "Publishing..." : "Publish"}</PublishButton>
                    </FooterPublishLink>
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
    border-radius: 16px;
    display: flex;
    margin-bottom: 30px;
    background-color: #FFFFFF;
    h1 {
        font-size: 20px;
        color: #707070;
        line-height: 24px;
    }
    input, textarea {
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        border: none;
        border-radius: 5px;
        margin-top: 8px;
        max-width: 503px;
        width: 530px;
        outline: none;
        font-size: 15px;
    }
    input::placeholder, textarea::placeholder{
        color: #949494
    }
    input:not(:focus), input:focus, textarea:not(:focus), textarea:focus{
        padding-left: 10px;
    }

    & a:first-child {
        width: 50px;
        height: 50px;
        margin: 15px 0px 0px 15px;
    }

    @media (max-width: 992px){
        max-width: 100vw;
        width: 100vw;
        justify-content: center;
        height: 164px;
        border-radius: 0;

        h1 {
            margin: 0 auto;
            font-size: 17px;
        }
        input, textarea {
            width: 90vw;
            font-size: 13px;
        }
        & a:first-child {
            display: none;
        }   
    }

    @media (max-width: 280px){
        input, textarea {
            width: 97vw;
            font-size: 13px;
        }
    }
`

const InputLink = styled.input`
    background-color: #EFEFEF;

    @media (max-width: 992px){
        height: 30px;
    }
`
const InputComment = styled.textarea`
    height: 66px;
    background-color: #EFEFEF;

    @media (max-width: 992px){
        height: 47px;
    }
`
const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    object-fit: cover;
    cursor: pointer;

    @media (max-width: 992px){
        display: none;
    }
`
const ContainerPost = styled.div`
    margin-top: 15px;
`
const ContainerSubmit = styled.form`
    display: flex;
    flex-direction: column;
    background-color: white;
    margin-left: 10px;

    @media (max-width: 992px){
        margin: 0px;
    }

`
const PublishButton = styled.button`
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-weight: 700;
    background-color: ${props => props.isWhite ? "#FFF" : "#1877F2"};
    width: 112px;
    height: 31px;
    align-self: flex-end;
    color: ${props => props.isWhite ? "#1877F2" : "#FFF"};
    margin-top: 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    &:hover{
        box-shadow: 0px  4px 4px  0px  #00000046;
    }
    &:disabled{
        opacity: 0.7;
    }

    @media (max-width: 992px){
        margin-top: 6px;
        height: 22px;
        font-size: 13px;
    }
`
const LocationButton = styled.div`
  background-color: #ffffff;
  color: ${({locationState}) => locationState ? "#238700" : "#949494"};
  font-family: 'Lato', sans-serif;
  font-size: 13px;
  width: 160px;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  } 
`;

const LocationICon = styled(IoLocationOutline)`
  width: 18px;
  height: 18px;
`;

const FooterPublishLink = styled.div`
    display: flex;
    justify-content: space-between;
`
export {
    PublishButton
}