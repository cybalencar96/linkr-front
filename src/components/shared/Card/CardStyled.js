import styled from "styled-components";

const CardContainer = styled.article`
    width:610px;
    height: 280px;
    background-color: #171717;
    border-radius: 16px;

    display: flex;
`

const CardLeft = styled.section`
    width: 15%;
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
    width: 500px;
    height: 155px;
    border: 1px solid #4D4D4D;
    display: flex;

    & .linkContent {
        padding: 10px
    }

    & .linkContent .linkTitle{
        color: #CECECE;
        font-size: 16px;
    }

    & img {
        width:154px;
        height: 100%;
        border-radius: 0px 12px 13px 0px;
    }
`

export {
    CardContainer,
    LinkContent,
    CardRigth,
    CardLeft
}