import React from 'react';
import ColumnGapContainer from "../../../global/molecules/ColumnGapContainer";
import H3 from "./styled-components/H3";
import P from "./styled-components/P";
import UserInfo from "../../../global/atoms/UserInfo";
import theme from "../../../../utils/theme";
import FlexGapContainer from "../../../global/molecules/FlexGapContainer/FlexGapContainer";
import upgrade from "../../../../../assets/icons/upgrade-light.svg";
import ButtonWithIcon from "../../../global/atoms/ButtonWithIcon";

class UpgradeApprove extends React.Component {

    upgradeCard = () => {
        // TODO: implement card upgrade
    }

    render() {
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
        );
    }
}

export default UpgradeApprove;