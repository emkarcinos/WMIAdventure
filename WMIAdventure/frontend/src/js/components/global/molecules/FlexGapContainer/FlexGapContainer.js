import React from 'react';
import Container from './styled-components/Container';

class FlexGapContainer extends React.Component {
    render() {
        return (
            <Container setMargin={this.props.setMargin} gap={this.props.gap}>
                {this.props.children}
            </Container>
        );
    }
}

export default FlexGapContainer;