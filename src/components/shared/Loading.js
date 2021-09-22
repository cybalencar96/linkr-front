import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import PageStyled from "./PageStyled";
import styled from "styled-components";

export default function Loading() {
    return (
        <LoadingContainer>
            <Loader type="Hearts" color="#00BFFF" height={80} width={80} />
        </LoadingContainer>
    )
}

export function CardLoadingScreen () {

    return (
        <CardLoading>
            <Loader type="Hearts" color="#00BFFF" height={80} width={80}/>
        </CardLoading>
    )
}
const LoadingContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center
`

const CardLoading = styled.div`
    width: 610px;
    min-height: 280px;
    background-color: #171717;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    padding: 10px 0;

    @media (max-width: 992px) {
        width: 100vw;
        border-radius: 0;
        min-height: 232px;
    }
`

