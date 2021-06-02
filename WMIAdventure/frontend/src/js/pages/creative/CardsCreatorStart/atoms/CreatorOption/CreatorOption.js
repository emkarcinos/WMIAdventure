import React from 'react';
import Button from './styled-components/Button';
import {Link} from 'react-router-dom';

class CreatorOption extends React.Component {
    render() {
        return (
            <Button as={Link} to={this.props.link}>
                {this.props.text}
            </Button>
        );
    }
}

export default CreatorOption;