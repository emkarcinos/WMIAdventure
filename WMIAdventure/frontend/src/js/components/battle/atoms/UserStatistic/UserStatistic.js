import React from 'react';
import MainDiv from './styled-components/MainDiv';
import StatisticNumber from './styled-components/StatisticNumber';
import ValueDiv from './styled-components/ValueDiv';

class UserStatistic extends React.Component {
    render() {
        return (
            <MainDiv setMargin={this.props.setMargin} type={this.props.type}>
                <StatisticNumber type={this.props.type}
                                 numberLength = {
                                     this.props.statisticNumber ? this.props.statisticNumber.length : 0
                                 }>
                    {this.props.statisticNumber}
                </StatisticNumber>
                <ValueDiv type={this.props.type}
                          currentLvlValue={this.props.currentLvlValue}
                          statisticNumber={this.props.statisticNumber} />
            </MainDiv>
        );
    }
}

export default UserStatistic;