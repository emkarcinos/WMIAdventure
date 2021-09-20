import React from 'react';
import P from './styled-components/P';
import FullView from '../../atoms/FullView';
import Div from './styled-components/Div';
import CompactView from '../../atoms/CompactView';

class LevelView extends React.Component {
    render() {
        return (
            <Div show={this.props.show}>
                <P>
                    Pełna
                </P>
                <FullView common={this.props.common} gold={this.props.gold} epic={this.props.epic} />
                <P>
                    Kompaktowa
                </P>
                <CompactView common={this.props.common} gold={this.props.gold} epic={this.props.epic} />
            </Div>
        );
    }
}

export default LevelView;