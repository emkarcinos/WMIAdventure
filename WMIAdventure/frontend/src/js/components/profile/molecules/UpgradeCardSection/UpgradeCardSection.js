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
import {desktop, mobile, nextStepAnimationDuration} from "../../../../utils/globals";
import PopUp from "../../../global/organisms/PopUp";
import UpgradeApprove from "../../atoms/UpgradeApprove";
import TransparentBackground from "./styled-components/TransparentBackground";
import {getCardById} from "../../../../storage/cards/cardStorage";
import {getCurrentUserData} from "../../../../storage/user/userData";
import Media from "react-media";
import FullCardView from "../../../global/atoms/FullCardView";

class UpgradeCardSection extends React.Component {
    state = {
        upgradeApprovePopUp: {
            visible: false,
            opacity: 0,
            translateY: '-100vh',
        },
        cardLevels: null,
        cardDescriptions: null,
        approvePopUpHover: false,
        userPoints: null
    }

    componentDidMount() {
        this.loadCardLevelsAndDescriptions();
        this.getUserPoints();
    }

    async getUserPoints() {
        const user = await getCurrentUserData()
        if (!user)
            return;

        this.setState({userPoints: user.skill_points})
    }

    async loadCardLevelsAndDescriptions() {
        const card = await getCardById(this.props.cardId);
        let levels = [];
        let descriptions = [];
        for (let elem of card.levels) {
            levels.push(elem.level);
            descriptions.push(elem.effects_description);
        }
        this.setState({
            cardLevels: levels,
            cardDescriptions: descriptions
        });
    }

    getNextCardData = (data) => {
        if (data === null || data === undefined)
            return null;
        if (data.length === 2)
            // case [1, 2], [2, 3] and [1, 3]
            return data[1];
        else if (data.length === 3) {
            // case [1, 2, 3]
            if (this.props.cardLevel === 1)
                // when typical return gold
                return data[1];
            else if (this.props.cardLevel === 2)
                // when gold return epic
                return data[2];
        }
    }

    getNextCardLevel = () => {
        return this.getNextCardData(this.state.cardLevels);
    }

    getNextCardDescription = () => {
        return this.getNextCardData(this.state.cardDescriptions);
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
        if (!this.canUpgrade()) return;
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
                    <>
                        <Media query={mobile}>
                            <PopUp hoverTrue={this.hoverTrue} hoverFalse={this.hoverFalse}
                                   visible closeHandler={this.hideUpgradeApprovePopUp} borderRadius
                                   setHeight={'auto'} setTop={'0'} setPosition={'static'}
                                   setTranslateY={this.state.upgradeApprovePopUp.translateY}>
                                <UpgradeApprove cardName={this.props.cardName}
                                                nextLevelCost={this.props.nextLevelCost}
                                                skillPoints={this.state.userPoints}
                                />
                            </PopUp>
                        </Media>

                        <Media query={desktop}>
                            <PopUp hoverTrue={this.hoverTrue} hoverFalse={this.hoverFalse}
                                   visible closeHandler={this.hideUpgradeApprovePopUp} borderRadius
                                   setWidth={'436px'} setHeight={'300px'} setTop={'0'} setPosition={'static'}
                                   setTranslateY={this.state.upgradeApprovePopUp.translateY}>
                                <UpgradeApprove cardName={this.props.cardName}
                                                nextLevelCost={this.props.nextLevelCost}
                                                skillPoints={this.state.userPoints}
                                />
                            </PopUp>
                        </Media>
                    </>
                </TransparentBackground>
            );
        }

    }

    canUpgrade() {
        if (this.state.userPoints === null || this.state.userPoints === undefined) return true;

        return this.state.userPoints >= this.props.nextLevelCost;
    }

    render() {
        return (
            <>
                <Media query={mobile}>
                    <ColumnGapContainer as={'section'} gap={'10px'} setMargin={'0'}>
                        <H2>
                            Ulepsz kartę
                        </H2>
                        <FlexGapContainer gap={'12px'}>
                            <CompactCardView decorationHeight={'24px'} setWidth={'122px'}
                                             setHeight={'200px'} setMargin={'0'} shadow cardImage={this.props.cardImage}
                                             cardLevel={this.props.cardLevel} cardName={this.props.cardName}/>
                            <Description>
                                {this.props.cardDescription}
                            </Description>
                        </FlexGapContainer>
                        <On>
                            Na
                        </On>
                        <FlexGapContainer gap={'12px'}>
                            <CompactCardView decorationHeight={'24px'} setWidth={'122px'}
                                             setHeight={'200px'} setMargin={'0'} shadow cardImage={this.props.cardImage}
                                             cardLevel={this.getNextCardLevel()} cardName={this.props.cardName}/>
                            <Description>
                                {this.getNextCardDescription()}
                            </Description>
                        </FlexGapContainer>
                        <FlexGapContainer gap={'36px'}>
                            <UserInfo label={'Koszt'} points={this.props.nextLevelCost}
                                      setPointsColor={this.canUpgrade() ? theme.colors.greenyBluey : theme.colors.red}
                                      value={'PN'}/>
                            <UserInfo label={'Posiadane punkty'} points={this.state.userPoints}
                                      value={'PN'}/>
                        </FlexGapContainer>
                        <ButtonWithIcon icon={upgrade} color={theme.colors.greenyBluey}
                                        handler={this.showUpgradeApprovePopUp} access={this.canUpgrade()}>
                            Ulepsz
                        </ButtonWithIcon>
                        {this.renderUpgradeApprove()}
                    </ColumnGapContainer>
                </Media>
                <Media query={desktop}>
                    <ColumnGapContainer as={'section'} gap={'10px'} setMargin={'0'}>
                        <H2>
                            Ulepsz kartę
                        </H2>
                        <FlexGapContainer gap={'40px'}>
                            <FullCardView setWidth={'258px'} setHeight={'458px'} setMargin={'0'}
                                          cardName={this.props.cardName}
                                          cardLevel={this.props.cardLevel}
                                          cardImage={this.props.cardImage}
                                          cardSubject={this.props.cardSubject}
                                          cardTooltip={this.props.cardTooltip}
                                          description={this.props.cardDescription}
                                          common={this.props.cardLevel === 1}
                                          gold={this.props.cardLevel === 2}
                                          epic={this.props.cardLevel === 3}/>
                            <On>
                                Na
                            </On>
                            <FullCardView setWidth={'258px'} setHeight={'458px'} setMargin={'0'}
                                          cardName={this.props.cardName}
                                          cardLevel={this.getNextCardLevel()}
                                          cardImage={this.props.cardImage}
                                          cardSubject={this.props.cardSubject}
                                          cardTooltip={this.props.cardTooltip}
                                          description={this.getNextCardDescription()}
                                          common={this.getNextCardLevel() === 1}
                                          gold={this.getNextCardLevel() === 2}
                                          epic={this.getNextCardLevel() === 3}/>
                        </FlexGapContainer>
                        <FlexGapContainer gap={'40px'}>
                            <UserInfo label={'Koszt'} points={this.props.nextLevelCost}
                                      setPointsColor={this.canUpgrade() ? theme.colors.greenyBluey : theme.colors.red}
                                      value={'PN'}/>
                            <UserInfo label={'Posiadane punkty'} points={this.state.userPoints}
                                      value={'PN'}/>
                        </FlexGapContainer>
                        <ButtonWithIcon icon={upgrade} color={theme.colors.greenyBluey}
                                        handler={this.showUpgradeApprovePopUp} access={this.canUpgrade()}>
                            Ulepsz
                        </ButtonWithIcon>
                        {this.renderUpgradeApprove()}
                    </ColumnGapContainer>
                </Media>
            </>
        );
    }
}

export default UpgradeCardSection;