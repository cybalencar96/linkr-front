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

const LoadingContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center
`

