import React from 'react';
import MainDiv from './styled-components/MainDiv';
import StatisticNumber from './styled-components/StatisticNumber';
import ValueDiv from './styled-components/ValueDiv';

class UserStatisticAnim extends React.Component {
    render() {
        return (
            <MainDiv setMargin={this.props.setMargin} type={this.props.type}>
                <StatisticNumber type={this.props.type}
                                 numberLength={
                                     this.props.statisticNumber.toString().length
                                 }
                                 transitionState={this.props.transitionState}
                                 animDuration={this.props.animDuration}
                >
                    {this.props.statisticNumber}
                </StatisticNumber>
                <ValueDiv type={this.props.type}
                          currentLvlValue={this.props.currentLvlValue}
                          statisticNumber={this.props.statisticNumber}
                          transitionState={this.props.transitionState}
                          animDuration={this.props.animDuration}
                />
            </MainDiv>
        );
    }
}

export default UserStatisticAnim;