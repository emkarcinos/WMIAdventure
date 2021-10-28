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
import termIcon from '../../../../../assets/images/termIcon.png';
import levelIcon from '../../../../../assets/icons/levelIcon.svg';
import rankIcon from '../../../../../assets/images/rankIcon.png';

class UserListItem extends React.Component {

    notAccessToFightMessage = () => {
        alert("Nie możesz walczyć z tym graczem.");
    }

    render() {
        return (
            <Item onClick={this.props.access ?
                this.props.runUserPreviewHandler : this.notAccessToFightMessage}
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
                        <UserLabel setMargin={'0 10px 0 0'} icon={termIcon}
                                   term={this.props.term} number={this.props.term} />
                        <UserLabel setMargin={'0 10px 0 0'}  icon={levelIcon}
                                   level={this.props.level} number={this.props.level} />
                        <UserLabel setMargin={'0'} icon={rankIcon}
                                   rank={'2'} number={'2'} />
                    </LabelsContainer>
                </Div>
                <BattleIcon access={this.props.access} src={battleIcon} />
            </Item>
        );
    }
}

export default UserListItem;