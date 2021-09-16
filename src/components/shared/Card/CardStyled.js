import styled from "styled-components";

const CardContainer = styled.article`
    width:610px;
    height: 280px;
    background-color: #171717;
    border-radius: 16px;
    display: flex;
    margin-bottom: 30px;

    @media (max-width: 992px) {
        width: 100%;
        height: 240px;
    }
`

const CardLeft = styled.section`
    width: 15%;
    min-width:90px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    

    & img {
        margin: 10px 0 20px 0;
        
    }
`


const CardRigth = styled.section`
        width:85%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 0 0 10px 0;

        & .username {
            font-size: 19px;
        }

        & .description {
            font-size: 17px;
            color: #B7B7B7;
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
        justify-content: space-around
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
        height: 100%;
        border-radius: 0px 12px 13px 0px;
    }

    @media (max-width: 992px) {
        height: 110px;

        & img {
            width: 110px
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