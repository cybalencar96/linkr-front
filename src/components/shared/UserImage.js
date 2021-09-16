import styled from "styled-components"

export default function UserImage ({src, width, height,...otherProps}) {

    return (
        <Image
            src={src}
            alt="" width={width}
            height={height}
            {...otherProps}
        />
    )
}

const Image = styled.img`
    width: ${props => props.width ? props.width : "50px"};
    height: ${props => props.height ? props.height : "50px"};
    border-radius: 26.5px;
    object-fit: cover;
    cursor: pointer;
`;


