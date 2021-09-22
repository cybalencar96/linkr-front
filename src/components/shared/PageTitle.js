import styled from 'styled-components'

function PageTitle({titleTxt, children}) {
    return (
        <Title>
            <h1>{titleTxt}</h1>
            {children}
        </Title>
    )
}

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-height: 45px;
    font-size: 43px;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    margin: 50px 0 40px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    & h1{
        width: 610px;
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: 45px;
    }
    @media (max-width: 992px) {
        margin: 19px auto;
        width: 90vw;
        & h1{
            width: calc(100% - 120px);
        }
    }
`

export default Title
export {
    PageTitle
}