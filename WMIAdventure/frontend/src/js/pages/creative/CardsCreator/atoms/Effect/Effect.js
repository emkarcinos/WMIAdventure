import React from 'react';
import Li from './styled-components/Li';
import Name from './styled-components/Name';
import Tooltip from './styled-components/Tooltip';

class Effect extends React.Component {
    render() {
        return (
            <Li>
                <Name>
                    {this.props.name}
                </Name>
                <Tooltip>
                    {this.props.tooltip}
                </Tooltip>
            </Li>
        );
    }
}

export default Effect;