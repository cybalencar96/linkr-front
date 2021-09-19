import styled from "styled-components";

const CardContainer = styled.article`
    width: 610px;
    min-height: 280px;
    background-color: #171717;
    border-radius: 16px;
    display: flex;
    justify-content: space-around;
    margin-bottom: 30px;
    padding: 10px 0;

    @media (max-width: 992px) {
        width: 100vw;
        min-height: 240px;
        border-radius: 0;
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
        min-height: 260px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        & .username {
            font-size: 19px;
            cursor: pointer;
            padding: 0 0 10px 0;

        }

        & .descriptionContainer {
            width: 90%;
            margin-bottom: 20px;
        }

        & .description {
            width: 100%;
            font-size: 17px;
            color: #B7B7B7;
        }

        & .showText {
            color: li
        }

        & .description span{
            font-weight: 700;
            color: white;
        }

        & .seeMore {
            padding: 0 10px;
            cursor: pointer;
        }
        & .seeMore:hover {
            color: lightgray
        }
        @media (max-width: 992px) {
            width: 81.6%;
            padding: 0 0 10px 0px;
        } 
`;

const LinkContent = styled.div`
    border-radius: 11px;
    background-color: rgba(23,23,23,0);
    width: 90%;
    height: 155px;

    border: 1px solid #4D4D4D;
    display: flex;
    justify-content: space-between;
    overflow: hidden;

    & .linkContent {
        padding: 20px;
        display: flex;
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

    & img {
        width:154px;
        height:154px;
        object-fit: cover;
        border-radius: 0px 12px 13px 0px;
    }

    & .imgContainer {
        display: flex;
        justify-content:center;
        align-items:center;
    }

    @media (max-width: 992px) {
        min-height: 110px;

        & img {
            width: 110px;
            object-fit: cover;
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
`

export {
    CardContainer,
    LinkContent,
    CardRigth,
    CardLeft
}