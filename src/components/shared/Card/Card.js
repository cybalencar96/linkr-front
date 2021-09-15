import { CardContainer, LinkContent, CardRigth, CardLeft } from "./CardStyled";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import { HeartOutline } from 'react-ionicons'
import UserImage from "../UserImage";
import {Hashtag} from '../PageStyled'

const qtdLikes = 13
export default function Card() {
    const {userData} = useContext(UserContext)
    
    return (
        <CardContainer>
            <CardLeft>
                <UserImage />
                <HeartOutline color={'#00000'} height="20px" width="20px"/>
                <p>{qtdLikes} likes</p>
            </CardLeft>

            <CardRigth>
                <h3 className="username">Username</h3>
                <p className="description">Muito maneiro esse tutorial de Material UI com React, deem uma olhada!  <Hashtag>#react</Hashtag>  <Hashtag>#material</Hashtag></p>
                <LinkContent>
                    <div className="linkContent">
                        <h3 className="linkTitle">Como aplicar o Material UI em um projeto React</h3>
                        <p className="linkDescription">Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you click through to another page.</p>
                        <p className="linkUrl">https://medium.com/@pshrmn/a-simple-react-router</p>
                    </div>
                    <img src="https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"/>
                </LinkContent>
            </CardRigth>
        </CardContainer>
    )
}