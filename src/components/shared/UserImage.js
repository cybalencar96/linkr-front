import styled from "styled-components"

export default function UserImage ({src, ...otherProps}) {

    return (
        <Image
            src={src}
            {...otherProps}
        />
    )
}

const Image = styled.img`
    width: ${props => props.topbar ? "53px" : "50px"};
    height: ${props => props.topbar ? "53px" : "50px"};
    border-radius: 26.5px;
    object-fit: cover;
    cursor: pointer;

    @media (max-width: 992px) {
        width: ${props => props.topbar ? "44px" : "40px"};
        height: ${props => props.topbar ? "44px" : "40px"};
    }
`;


