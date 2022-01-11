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
import {nextStepAnimationDuration} from "../../../../utils/globals";
import PopUp from "../../../global/organisms/PopUp";
import UpgradeApprove from "../../atoms/UpgradeApprove";
import TransparentBackground from "./styled-components/TransparentBackground";
import {getCardById} from "../../../../storage/cards/cardStorage";

class UpgradeCardSection extends React.Component {
    state = {
        upgradeApprovePopUp: {
            visible: false,
            opacity: 0,
            translateY: '-100vh',
        },
        cardLevels: null,
        approvePopUpHover: true,
    }

    componentDidMount() {
        const cardPromise = getCardById(this.props.cardId);
        const levels = [];
        cardPromise.then(result => {
            for (let elem of result.levels) {
                levels.push(elem.level);
            }
            this.setState({
                cardLevels: levels
            });
        });
    }

    getNextCardLevel = () => {
        if (this.state.cardLevels !== null) {
            if (this.props.cardLevel === 1)
                // case [1, 2] and [1, 3]
                return this.state.cardLevels[1];
            else if (this.props.cardLevel === 2)
                // case [1, 2, 3]
                return this.state.cardLevels[2];
        }
    }

    hoverTrue = () => {
        this.setState({approvePopUpHover: true});
    }

    hoverFalse = () => {
        this.setState({approvePopUpHover: false});
    }

    hideByClickOutsideApprovePopUp = () => {
        if (!this.state.approvePopUpHover)
            this.hideUpgradeApprovePopUp();
    }

    showUpgradeApprovePopUp = () => {
        this.setState({
            upgradeApprovePopUp: {
                visible: true,
                opacity: 0,
                translateY: '-100vh',
            }
        });

        setTimeout(() => {
            this.setState({
                upgradeApprovePopUp: {
                    visible: true,
                    opacity: 1,
                    translateY: '0',
                }
            });
        }, 10);
    }

    hideUpgradeApprovePopUp = () => {
        this.setState({
            upgradeApprovePopUp: {
                visible: true,
                opacity: 0,
                translateY: '-100vh',
            }
        });

        setTimeout(() => {
            this.setState({
                upgradeApprovePopUp: {
                    visible: false,
                    opacity: 0,
                    translateY: '-100vh',
                }
            });
        }, nextStepAnimationDuration);
    }

    renderUpgradeApprove() {
        if (this.state.upgradeApprovePopUp.visible) {
            return (
                <TransparentBackground onClick={this.hideByClickOutsideApprovePopUp}
                                       setOpacity={this.state.upgradeApprovePopUp.opacity}>
                    <PopUp hoverTrue={this.hoverTrue} hoverFalse={this.hoverFalse}
                           visible closeHandler={this.hideUpgradeApprovePopUp} borderRadius
                           setHeight={'auto'} setTop={'0'} setPosition={'static'}
                           setTranslateY={this.state.upgradeApprovePopUp.translateY}>
                        <UpgradeApprove/>
                    </PopUp>
                </TransparentBackground>
            );
        }

    }

    render() {
        return (
            <ColumnGapContainer as={'section'} gap={'10px'} setMargin={'0'}>
                <H2>
                    Ulepsz kartę
                </H2>
                <FlexGapContainer gap={'12px'}>
                    <CompactCardView decorationHeight={'24px'} setWidth={'122px'}
                                     setHeight={'200px'} setMargin={'0'} shadow
                                     cardLevel={this.props.cardLevel} cardName={this.props.cardName}/>
                    <Description>
                        Zadaje przeciwnikowi 15 - 25 obrażeń i zatrzymuje gracza na 1 turę.
                    </Description>
                </FlexGapContainer>
                <On>
                    Na
                </On>
                <FlexGapContainer gap={'12px'}>
                    <CompactCardView decorationHeight={'24px'} setWidth={'122px'}
                                     setHeight={'200px'} setMargin={'0'} shadow
                                     cardLevel={this.getNextCardLevel()} cardName={this.props.cardName}/>
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
                                handler={this.showUpgradeApprovePopUp} access>
                    Ulepsz
                </ButtonWithIcon>
                {this.renderUpgradeApprove()}
            </ColumnGapContainer>
        );
    }
}

export default UpgradeCardSection;