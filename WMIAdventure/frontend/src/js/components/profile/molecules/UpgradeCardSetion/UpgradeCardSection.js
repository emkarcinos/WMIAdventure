import React from 'react';
import ColumnGapContainer from "../../../global/molecules/ColumnGapContainer";
import H2 from "./styled-components/H2";
import FlexGapContainer from "../../../global/molecules/FlexGapContainer/FlexGapContainer";
import On from "./styled-components/On";
import UserInfo from "../../../global/atoms/UserInfo";
import upgrade from "../../../../../assets/icons/upgrade-light.svg";
import theme from "../../../../utils/theme";
import ButtonWithIcon from "../../../global/atoms/ButtonWithIcon";
import CompactCardView from "../../../global/atoms/CompactCardView";
import Description from "./styled-components/Description";

class UpgradeCardSection extends React.Component {
    render() {
        return (
            <ColumnGapContainer gap={'10px'} setMargin={'32px 0'}>
                <H2>
                    Ulepsz kartę
                </H2>
                <FlexGapContainer gap={'12px'}>
                    <CompactCardView decorationHeight={'24px'} setWidth={'132px'}
                                     setHeight={'200px'} setMargin={'0'} shadow
                                     cardLevel={1} cardName={'placeholder'}/>
                    <Description>
                        Zadaje przeciwnikowi 15 - 25 obrażeń i zatrzymuje gracza na 1 turę.
                    </Description>
                </FlexGapContainer>
                <On>
                    Na
                </On>
                <FlexGapContainer gap={'12px'}>
                    <CompactCardView decorationHeight={'24px'} setWidth={'132px'}
                                     setHeight={'200px'} setMargin={'0'} shadow
                                     cardLevel={2} cardName={'placeholder'}/>
                    <Description>
                        Zadaje przeciwnikowi 25 - 40 obrażeń, zamienia losowo kolejność
                        kart przeciwnika i zatrzymuje gracza na 1 turę.
                    </Description>
                </FlexGapContainer>
                <FlexGapContainer gap={'36px'}>
                    <UserInfo label={'Koszt'} points={'5'} setPointsColor={theme.colors.greenyBluey} value={'PN'}/>
                    <UserInfo label={'Posiadane punkty'} points={'17'} value={'PN'}/>
                </FlexGapContainer>
                <ButtonWithIcon icon={upgrade} color={theme.colors.greenyBluey}
                                handler={this.showUpgradeCardPopUp} access>
                    Ulepsz
                </ButtonWithIcon>
            </ColumnGapContainer>
        );
    }
}

export default UpgradeCardSection;