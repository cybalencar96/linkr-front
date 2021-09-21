import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";

const CardContainer = styled.article`
    width: 610px;
    background-color: #171717;
    border-radius: 16px;
    display: flex;
    justify-content: space-around;
    margin-bottom: 30px;
    padding: 20px 0;

    @media (max-width: 992px) {
        width: 100vw;
        border-radius: 0;
        min-height: 232px;
    }
`

const CardLeft = styled.section`
    width: 15%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    & a {
        margin: 0 0 20px 0;
    }

   @media (max-width: 992px) {
        width: 18.4%;
    } 
`


const CardRigth = styled.section`
        width: 85%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        gap: 10px;

        & .usernameLink {
            max-width: 85%;
        }

        & .username {
            width:100%;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 19px;
            padding: 0 0 10px 0;
            cursor: pointer;
        }

        & .description {
            width: 90%;
            font-size: 17px;
            color: #B7B7B7;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        & .description span{
            font-weight: 700;
            color: white;
        }

        @media (max-width: 992px) {
            min-height: 212px;
            width: 81.6%;
            padding: 0 0 10px 0px;
            & .usernameLink {
                width:calc(85% - 10vw)
            }
        } 
`;

const LinkContent = styled.div`
    border-radius: 11px;
    background-color: rgba(23,23,23,0);
    width: 90%;
    height: 155px;
    border: 1px solid #4D4D4D;
    overflow: hidden;

    & > a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    & .linkContent {
        padding: 20px;
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-around;
        gap:3px;
    }

    & .linkContent .linkTitle{
        color: #CECECE;
        font-size: 16px;
        word-break: break-word
    }

    & .linkContent .linkDescription{
        color: #9B9595;
        font-size: 11px;
        line-height: 13px;
        word-break: break-word;
    }

    & .linkContent .linkUrl{
        color: #CECECE;
        font-size: 11px;
        line-height: 13px;
        word-break: break-word;
        overflow: hidden;

    }

    & a img {
        width:154px;
        height:154px;
        border-radius: 0px 12px 13px 0px;
    }

    & .imgContainer {
        display: flex;
        justify-content:center;
        align-items:center;
    }

    @media (max-width: 992px) {
        height: 115px;

        & img {
            width: 115px
        }
        & .linkContent{
            padding: 5px 10px;
        }
        & .linkContent .linkTitle{
            font-size: 11px;
        }
        & .linkContent .linkDescription{
            line-height: 9px;
            font-size: 9px;
        }
        & .linkContent .linkUrl{
            line-height: 9px;
            font-size: 9px;
        }
    }
`;

const EditPostInput = styled.textarea`
    width: 90%;
    height: 53px;
    font-size: 17px;
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    border: none;
    border-radius: 5px;
    margin-top: 8px;
    outline: none;
    font-size: 15px;
`;

const IconDelete = styled(FaTrash)`
    margin-left: 15px;
    cursor: pointer;
    &:hover{
        color: red;
    }
`;

const IconEdit = styled(RiPencilFill)`
    cursor: pointer;
    &:hover{
        color: green;
    }
`;

const IconsDiv = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
`;

export {
    CardContainer,
    LinkContent,
    CardRigth,
    CardLeft,
    EditPostInput,
    IconDelete,
    IconEdit,
    IconsDiv,
}