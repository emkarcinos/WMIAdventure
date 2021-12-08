import React from "react";
import Container from "./Container";
import TransBack from "../../../global/organisms/TransBack";

/**
 * Props:
 * - parent - parent component that renders this component
 */
class ChangeDeckCard extends React.Component {

    render() {
        return (
            <>
                <TransBack visible={true} closeHandler={this.props.closeHandler}/>
                <Container>
                </Container>
            </>
        );
    }
}

export default ChangeDeckCard;