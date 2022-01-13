import React from 'react';
import ColumnGapContainer from "../../../global/molecules/ColumnGapContainer";
import H3 from "./styled-components/H3";
import P from "./styled-components/P";
import UserInfo from "../../../global/atoms/UserInfo";
import theme from "../../../../utils/theme";
import FlexGapContainer from "../../../global/molecules/FlexGapContainer/FlexGapContainer";
import upgrade from "../../../../../assets/icons/upgrade-light.svg";
import ButtonWithIcon from "../../../global/atoms/ButtonWithIcon";
import {upgradeCurrentUserCard} from "../../../../storage/user/userData";

class UpgradeApprove extends React.Component {

    state = {
        success: false,
        error: false
    }

    upgradeCard = () => {
        upgradeCurrentUserCard(this.props.cardId)
            .then(response => {
                if (response.ok) {
                    this.setState({success: true});
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500)
                } else {
                    this.setState({error: true});
                }
            })
            .catch(() => this.setState({error: true}));
    }

    renderDefault = () => {
        if (!(this.state.success || this.state.error)) {
            return (
                <ColumnGapContainer as={'article'} gap={'20px'} setMargin={'32px'}>
                    <H3>
                        Ulepszyć {this.props.cardName}?
                    </H3>
                    <ColumnGapContainer gap={'30px'}>
                        <P>
                            Czy na pewno chcesz ulepszyć&nbsp;<strong>{this.props.cardName}</strong>&nbsp;
                            na nowy poziom? Stracisz Punkty Nauki - tego nie można cofnąć.
                        </P>
                        <FlexGapContainer gap={'30px'}>
                            <UserInfo label={'Koszt'} points={this.props.nextLevelCost}
                                      setPointsColor={theme.colors.greenyBluey} value={'PN'}/>
                            <UserInfo label={'Saldo punktów po ulepszeniu'}
                                      setPointsColor={theme.colors.red}
                                      points={this.props.skillPoints - this.props.nextLevelCost} value={'PN'}/>
                        </FlexGapContainer>
                        <ButtonWithIcon icon={upgrade} handler={this.upgradeCard} color={theme.colors.greenyBluey}>
                            Tak
                        </ButtonWithIcon>
                    </ColumnGapContainer>
                </ColumnGapContainer>
            )
        }
    }

    renderSuccess = () => {
        if (this.state.success) {
            return (
                <ColumnGapContainer as={'article'} gap={'32px'}>
                    <H3>
                        Sukces!
                    </H3>
                    <ColumnGapContainer gap={'30px'}>
                        <P>
                            Karta &nbsp;<strong>{this.props.cardName}</strong>&nbsp; ulepszona na nowy poziom.
                        </P>
                    </ColumnGapContainer>
                </ColumnGapContainer>
            )
        }
    }

    renderErrors = () => {
        if (this.state.error) {
            return (
                <ColumnGapContainer as={'article'} gap={'32px'} setMargin={'32px'}>
                    <H3>
                        Błąd!
                    </H3>
                    <ColumnGapContainer gap={'30px'}>
                        <P>
                            Wystąpił błąd przy ulepszaniu karty.
                        </P>
                    </ColumnGapContainer>
                </ColumnGapContainer>
            )
        }
    }

    render() {
        return (
            <>
                {this.renderDefault()}
                {this.renderSuccess()}
                {this.renderErrors()}
            </>
        );
    }
}

export default UpgradeApprove;