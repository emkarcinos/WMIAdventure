import React from 'react';
import MainDiv from './styled-components/MainDiv';
import StatNumber from './styled-components/StatNumber';
import ValueDiv from './styled-components/ValueDiv';

class UserStat extends React.Component {
    render() {
        return (
            <MainDiv setMargin={this.props.setMargin}>
                <StatNumber>
                    {this.props.statNumber}
                </StatNumber>
                <ValueDiv type={this.props.type}
                          setTransform={this.props.setTransform}
                          statNumber={this.props.statNumber} />
            </MainDiv>
        );
    }
}

export default UserStat;