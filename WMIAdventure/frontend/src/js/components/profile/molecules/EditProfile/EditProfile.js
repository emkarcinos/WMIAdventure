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
    render() {
        return (
            <ColumnGapContainer as={'section'} gap={'12px'}>
                <Header>
                    Edytuj profil
                </Header>
                <UserNameInput/>
                <UserAvatarInput/>
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