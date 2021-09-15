import PageStyled from "../shared/PageStyled";
import Topbar from "../shared/Topbar/Topbar";
import { TimelineContainer } from "./TimelineStyle";
import Title from '../shared/PageTitle'
import Card from "../shared/Card/Card";

export default function TimelinePage() {
    return (
        <PageStyled>
            <Topbar/>
            <TimelineContainer>
                    <Title>timeline</Title>
                    <Card />
            </TimelineContainer>
        </PageStyled>
    )
}