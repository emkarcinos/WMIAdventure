import React from 'react';
import Subject from './styled-components/Subject';
import Button from './styled-components/Button';
import Name from './styled-components/Name';

class Card extends React.Component {
    render() {
        return (
            <Button onClick={() => console.log('click')}>
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