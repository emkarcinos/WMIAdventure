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
import BasicUserData from "../../../../api/data-models/user/BasicUserData";
import EditUserProfileAPIGateway from "../../../../api/gateways/user-profile-update/EditUserProfileAPIGateway";
import {purgeUserData} from "../../../../storage/user/userData";
import GenericPopup from "../../../global/atoms/GenericPopup";

class EditProfile extends React.Component {

    state = {
        newUsername: this.props.username ? this.props.username : '',
        newAvatar: this.props.avatar ? this.props.avatar : '',
        newAvatarPath: this.props.avatar ? this.props.avatar : null,
        error: false,
        success: false,
    }

    updateUserName = (event) => {
        this.setState({
            newUsername: event.target.value
        });
    }

    updateAvatar = (event) => {
        if (event.target.files[0]) {
            this.setState({
                newAvatar: event.target.files[0],
                newAvatarPath: URL.createObjectURL(event.target.files[0])
            });
        }
    }

    userDataUpdateSuccess = () => {
        this.setState({
            success: true,
        });
        purgeUserData();
    }

    userDataUpdateFail = () => {
        this.setState({
            error: true,
        });
    }

    closeSuccess = () => {
        window.location.reload();
    }

    closeError = () => {
        this.setState({
            error: false,
        });
    }

    updateUserInApi = () => {
        const basicUserData = new BasicUserData(
            this.props.userId, this.state.newUsername, 2, this.state.newAvatar);
        EditUserProfileAPIGateway.sendUserNewData(basicUserData, this.userDataUpdateSuccess, this.userDataUpdateFail)
            .catch(err => {
                console.log(err);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        return (
            <>
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
                        <ButtonWithIcon icon={pencil} handler={this.updateUserInApi}>
                            Zapisz
                        </ButtonWithIcon>
                    </FlexGapContainer>
                </ColumnGapContainer>
                <GenericPopup header={"Błąd!"}
                              text={`Nie udało się dokonać zmian profilu użytkownika.`}
                              buttonText={"OK"}
                              show={this.state.error}
                              onClickHandler={this.closeError}/>
                <GenericPopup header={"Sukces!"}
                              text={"Modyfikacja profilu powiodła się."}
                              buttonText={"OK"}
                              show={this.state.success}
                              onClickHandler={this.closeSuccess}/>
            </>
        );
    }
}

export default EditProfile;