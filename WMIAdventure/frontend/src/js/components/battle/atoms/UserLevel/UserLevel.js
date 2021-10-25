import React from 'react';
import MainDiv from './styled-components/MainDiv';
import LevelNumber from './styled-components/LevelNumber';
import ValueDiv from './styled-components/ValueDiv';

class UserLevel extends React.Component {
    render() {
        return (
            <MainDiv setMargin={this.props.setMargin}>
                <LevelNumber>
                    {this.props.levelNumber}
                </LevelNumber>
                <ValueDiv setTransform={this.props.setTransform}
                          levelNumber={this.props.levelNumber} />
            </MainDiv>
        );
    }
}

export default UserLevel;