import React from 'react';
import Header from "./styled-components/Header";
import ColumnGapContainer from "../../../global/molecules/ColumnGapContainer";
import FlexGapContainer from "../../../global/molecules/FlexGapContainer/FlexGapContainer";
import ButtonWithIcon from "../../../global/atoms/ButtonWithIcon";
import UserNameInput from "../../atoms/UserNameInput";
import UserAvatarInput from "../../atoms/UserAvatarInput";
import theme from "../../../../utils/theme";
import pencil from '../../../../../assets/icons/pencil.svg';
import xClose from '../../../../../assets/icons/x-close.svg';

class EditProfile extends React.Component {

    state = {
        newUsername: this.props.username ? this.props.username : '',
        newAvatar: this.props.avatar ? this.props.avatar : '',
        newAvatarPath: null,
    }

    updateUserName = (event) => {
        this.setState({
            newUsername: event.target.value
        });
    }

    updateAvatar = (event) => {
        this.setState({
            newAvatar: event.target.files[0],
            newAvatarPath: URL.createObjectURL(event.target.files[0])
        });
    }

    render() {
        return (
            <ColumnGapContainer setWidth={'100%'} as={'section'} gap={'12px'}>
                <Header>
                    Edytuj profil
                </Header>
                <UserNameInput currentUsername={this.state.newUsername}
                               updateUserName={this.updateUserName}/>
                <UserAvatarInput currentAvatar={this.state.newAvatarPath}
                                 updateAvatar={this.updateAvatar}/>
                <FlexGapContainer gap={'10px'} setMargin={'20px 0'}>
                    <ButtonWithIcon icon={xClose}
                                    color={theme.colors.dark}
                                    handler={this.props.closeHandler}>
                        Wróć
                    </ButtonWithIcon>
                    <ButtonWithIcon icon={pencil}>
                        Zapisz
                    </ButtonWithIcon>
                </FlexGapContainer>
            </ColumnGapContainer>
        );
    }
}

export default EditProfile;