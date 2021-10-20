import React from 'react';
import Subject from './styled-components/Subject';
import Button from './styled-components/Button';
import Name from './styled-components/Name';

class Card extends React.Component {
    render() {
        return (
            <Button searchInput={this.props.searchInput}
                    name={this.props.name} image={this.props.image} onClick={
                (event) => this.props.chosenCardHandler (
                    event, this.props.id, this.props.name, this.props.subject, this.props.tooltip, this.props.image, this.props.levels
                )}>
                <Name>
                    {this.props.name}
                </Name>
                <Subject>
                    {this.props.subject}
                </Subject>
            </Button>
        );
    }
}

export default Card;