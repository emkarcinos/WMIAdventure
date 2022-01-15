import React from 'react';
import Item from './styled-components/Item';
import Avatar from './styled-components/Avatar';
import Login from './styled-components/Login';
import Div from './styled-components/Div';
import BattleIcon from './styled-components/BattleIcon';
import LabelsContainer from './styled-components/LabelsContainer';
import AvatarContainer from './styled-components/AvatarContainer';
import battleIcon from './../../../../../assets/images/battleIcon.png';
import UserLabel from "../../../global/atoms/UserLabel";
import kuc1 from '../../../../../assets/icons/kuc1.svg';

class UserListItem extends React.Component {

    notAccessToFightMessage = () => {
        alert("Nie możesz walczyć z tym graczem.");
    }

    render() {
        return (
            <Item onClick={this.props.access ?
                this.props.runUserPreviewHandler : this.notAccessToFightMessage}
                  displayedUsername={this.props.user.username}
                  searchInput={this.props.searchInput}>
                <AvatarContainer access={this.props.access} avatar>
                    <Avatar access={this.props.access} src={this.props.user.image ? this.props.user.image : kuc1}
                            alt="profile-pic"/>
                </AvatarContainer>
                <Div>
                    <Login access={this.props.access}>
                        {this.props.user.username}
                    </Login>
                    <LabelsContainer>
                        {/*<UserLabel setMargin={'0 10px 0 0'}*/}
                        {/*           term={1} number={1}/>*/}
                        <UserLabel setMargin={'0 10px 0 0'}
                                   level={this.props.user.level} number={this.props.user.level}/>
                        {/*<UserLabel setMargin={'0'}*/}
                        {/*           rank={'2'} number={'2'}/>*/}
                    </LabelsContainer>
                </Div>
                <BattleIcon access={this.props.access} src={battleIcon}/>
            </Item>
        );
    }
}

export default UserListItem;