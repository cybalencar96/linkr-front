import styled from "styled-components"

const HashtagSpan = styled.span`
    font-weight: 700;
    color: white;
    font-size: ${props => props.fontSize ? props.fontSize : "inherit"};
`;

export default HashtagSpan;