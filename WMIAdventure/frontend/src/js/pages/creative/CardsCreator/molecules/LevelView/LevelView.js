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
                <FullView common={this.props.common}
                          gold={this.props.gold}
                          epic={this.props.epic}
                          cardName={this.props.cardName}
                          cardSubject={this.props.cardSubject}
                          cardImage={this.props.cardImage}
                          cardTooltip={this.props.cardTooltip}
                          description={this.props.description} />
                <P>
                    Kompaktowa
                </P>
                <CompactView common={this.props.common}
                             gold={this.props.gold}
                             epic={this.props.epic}
                             cardName={this.props.cardName}
                             cardImage={this.props.cardImage} />
            </Div>
        );
    }
}

export default LevelView;