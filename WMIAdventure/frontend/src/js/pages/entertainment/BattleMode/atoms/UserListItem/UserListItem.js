import React from 'react';
import Item from './styled-components/Item';
import AvatarContainer from './styled-components/AvatarContainer';
import Avatar from './styled-components/Avatar';
import Login from './styled-components/Login';
import Div from './styled-components/Div';
import Label from './styled-components/Label';
import BattleIcon from './styled-components/BattleIcon';
import LabelsContainer from './styled-components/LabelsContainer';

class UserListItem extends React.Component {
    render() {
        return (
            <Item>
                <AvatarContainer>
                    <Avatar />
                </AvatarContainer>
                <Div>
                    <Login>
                        emkarcinos
                    </Login>
                    <LabelsContainer>
                        <Label>
                            Semestr x
                        </Label>
                        <Label>
                            Level x
                        </Label>
                    </LabelsContainer>
                </Div>
                <BattleIcon />
            </Item>
        );
    }
}

export default UserListItem;