import React from "react";
import Ul from "./styled-components/Ul";
import Li from "./styled-components/Li";
import Heading from "./styled-components/Heading";
import P from "./styled-components/P";
import Before from "./styled-components/Before";


class RatelimitInfo extends React.Component {
    render() {
        return (
            <Ul>
                <Li>
                    <Before access>25</Before>
                    <Heading>Dostępne pojedynki</Heading>
                    <P>Reset za 1h 15min</P>
                </Li>
                <Li>
                    <Before access>1</Before>
                    <Heading>Z tym userem</Heading>
                    <P>Reset za 5h 58min</P>
                </Li>
            </Ul>
        )
    }
}

export default RatelimitInfo;