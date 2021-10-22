import React from 'react';
import Item from './styled-components/Item';
import Avatar from './styled-components/Avatar';
import Login from './styled-components/Login';
import Div from './styled-components/Div';
import BattleIcon from './styled-components/BattleIcon';
import LabelsContainer from './styled-components/LabelsContainer';
import AvatarContainer from './styled-components/AvatarContainer';
import battleIcon from './../../../../../assets/images/battleIcon.png';
import UserLabel from '../../atoms/UserLabel';

class UserListItem extends React.Component {
    render() {
        return (
            <Item onClick={this.props.runUserPreviewHandler}
                  displayedUsername={this.props.displayedUsername}
                  searchInput={this.props.searchInput}>
                <AvatarContainer access={this.props.access}>
                    {this.props.avatar ? <Avatar access={this.props.access} src={this.props.avatar} alt=""/> : ''}
                </AvatarContainer>
                <Div>
                    <Login access={this.props.access}>
                        {this.props.displayedUsername}
                    </Login>
                    <LabelsContainer>
                        <UserLabel setMargin={'0 10px 0 0'} term={this.props.term}>
                            Semestr: {this.props.term}
                        </UserLabel>
                        <UserLabel setMargin={'0'} level={this.props.level}>
                            Level: {this.props.level}
                        </UserLabel>
                    </LabelsContainer>
                </Div>
                <BattleIcon access={this.props.access} src={battleIcon} />
            </Item>
        );
    }
}

export default UserListItem;