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
        width: 100px;
    } 
`


const CardRigth = styled.section`
        width: 85%;
        min-height: 260px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 0 0 10px 0;

        & .usernameLink {
            width: 85%;
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
            min-height: 53px;
            font-size: 17px;
            color: #B7B7B7;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 15px;
        }

        & .description span{
            font-weight: 700;
            color: white;
        }

        @media (max-width: 992px) {
            min-height: 212px;
            width: calc(100% - 100px);
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

export {
    CardContainer,
    LinkContent,
    CardRigth,
    CardLeft,
    EditPostInput
}