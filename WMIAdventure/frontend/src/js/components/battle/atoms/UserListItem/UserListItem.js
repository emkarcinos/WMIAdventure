import React from 'react';
import Item from './styled-components/Item';
import Avatar from './styled-components/Avatar';
import Login from './styled-components/Login';
import Div from './styled-components/Div';
import Label from './styled-components/Label';
import BattleIcon from './styled-components/BattleIcon';
import LabelsContainer from './styled-components/LabelsContainer';
import AvatarContainer from './styled-components/AvatarContainer';
import battleIcon from './../../../../../assets/images/battleIcon.png';

class UserListItem extends React.Component {
    render() {
        return (
            <Item login={this.props.login} searchInput={this.props.searchInput}>
                <AvatarContainer access={this.props.access}>
                    {this.props.avatar ? <Avatar access={this.props.access} src={this.props.avatar} alt=""/> : ''}
                </AvatarContainer>
                <Div>
                    <Login access={this.props.access}>
                        {this.props.login}
                    </Login>
                    <LabelsContainer>
                        <Label term={this.props.term}>
                            Semestr: {this.props.term}
                        </Label>
                        <Label level={this.props.level}>
                            Level: {this.props.level}
                        </Label>
                    </LabelsContainer>
                </Div>
                <BattleIcon access={this.props.access} src={battleIcon} />
            </Item>
        );
    }
}

export default UserListItem;