import React from 'react';
import Li from './styled-components/Li';
import P from './styled-components/P';
import FightButton from '../../atoms/FightButton/FightButton';

class UserToFight extends React.Component {
    render() {
        return (
            <Li>
                <P>
                    {this.props.children}
                </P>
                <FightButton />
            </Li>
        );
    }
}

export default UserToFight;