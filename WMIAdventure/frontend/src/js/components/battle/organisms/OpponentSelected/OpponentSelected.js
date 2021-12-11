import React from 'react';
import TinyUserProfile from '../../molecules/TinyUserProfile';
import KuceVs from '../../atoms/KuceVs/KuceVs';
import TinyCards from '../../atoms/TinyCards/TinyCards';
import theme from '../../../../utils/theme';
import xClose from '../../../../../assets/icons/x-close.svg';
import battleIcon from '../../../../../assets/images/battleIcon.png';
import fastIcon from '../../../../../assets/icons/fast.svg';
import Media from 'react-media';
import FlexGapContainer from '../../../global/molecules/FlexGapContainer/FlexGapContainer';
import {desktop, mobile, nextStepAnimationDuration, popUpLoadingMinimalDuration} from '../../../../utils/globals';
import GridContainer from './styled-components/GridContainer';
import FlexEndContainer from './styled-components/FlexEndContainer';
import FlexCenterContainer from './styled-components/FlexCenterContainer';
import PostBattle from '../PostBattle';
import PopUp from '../../../global/organisms/PopUp';
import TransBack from '../../../global/organisms/TransBack';
import ColumnGapContainer from '../../../global/molecules/ColumnGapContainer';
import {getCurrentUserData, getCurrentUserDecks} from "../../../../storage/user/userData";
import {fightWithUser} from "../../../../api/gateways/BattleAPIGateway";
import BattleView from "../BattleView";
import GenericPopup from "../../../global/atoms/GenericPopup";
import {getCardById} from "../../../../storage/cards/cardStorage";
import UserInfo from "../../../global/atoms/UserInfo";
import ButtonWithIcon from "../../../global/atoms/ButtonWithIcon";
import {EditableDeck, nullEditableDeck} from "../../../../api/data-models/battle/EditableDeck";
import {cardsFromDeckData} from "../../../../api/data-models/battle/Card";

class OpponentSelected extends React.Component {

    state = {
        // states uses for mount postBattle
        postBattle: false,
        popUpHover: false,
        postBattlePos: '-100vh',
        postBattleOpacity: '0',
        userDeck: nullEditableDeck(),
        opponentDeck: nullEditableDeck(),

        isBattleStarting: false,
        // states uses for mount battleView
        battleView: {
            visible: false,
            translateY: '-100vh',
            scale: '0',
        },

        error: {
            visible: false,
            message: '',
        },
        caller: {
            username: '',
            id: 0,
            semester: 1,
            avatar: null
        }
    }

    async getDeck() {
        const data = await getCurrentUserDecks();
        if (!data)
            return;

        const userSpecificCards = await cardsFromDeckData(data);
        this.setState({userDeck: new EditableDeck(userSpecificCards)});
    }

    componentDidMount() {
        getCurrentUserData()
            .then(user => user ? this.setState({
                caller: {
                    username: user.displayedUsername,
                    id: user.user,
                    semester: user.semester,
                    avatar: user.image
                }
            }) : null)
        this.getDeck();
    }

    handleBattleErrors = (resp) => {
        switch (resp.status) {
            case 401:
                this.setState({
                    error: {
                        visible: true,
                        message: "Nie jesteś zalogowany!"
                    }
                });
                break;
            case 404:
                this.setState({
                    error: {
                        visible: true,
                        message: "Niekompletna talia kart!"
                    }
                })
                break;
            case 500:
                this.setState({
                    error: {
                        visible: true,
                        message: "Błąd serwera! Spróbuj ponownie później."
                    }
                })
                break;
            default:
                this.setState({
                    error: {
                        visible: true,
                        message: "Nieznany błąd. Spróbuj ponownie później."
                    }
                })
        }
    }

    errors = () => {
        const close = (event) => {
            event.preventDefault();
            this.setState({
                error: {
                    visible: false,
                    // Transition remembers component's message
                    message: this.state.error.message
                }
            })
        }

        return (
            <GenericPopup header={"Błąd!"} text={this.state.error.message} buttonText={"OK"}
                          show={this.state.error.visible}
                          onClickHandler={close}/>
        )
    }

    quickBattleRunHandler = () => {
        this.props.closeUserPreviewHandler();
        this.props.kuceStartFight('Szybka Walka');
        fightWithUser(this.props.opponent.id)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(data => {
                            this.setState({isBattleStarting: true});
                            this.postBattle(data);
                            this.postBattleOpenHandler();
                        })
                } else {
                    this.handleBattleErrors(response);
                    this.props.kuceStopFight();
                }
            });
    }

    postBattle = (data) => {
        this.props.kuceStopFight();
        cardsFromDeckData([data.outcome.defender.deck])
            .then(cards => {
                this.setState({
                    postBattle: true,
                    opponentDeck: new EditableDeck(cards)
                });
            })
        if (data.outcome.winner === null) {
            this.setState({win: null})
            return
        }
        data.outcome.winner === data.attacker.id ?
            this.setState({win: true}) : this.setState({win: false});
    }

    postBattleOpenHandler = () => {
        setTimeout(() => {
            this.setState({
                postBattlePos: '0',
                postBattleOpacity: '1'
            });
        }, popUpLoadingMinimalDuration);
    }

    quickBattleCloseHandler = () => {
        this.setState({
            postBattlePos: '-100vh',
            postBattleOpacity: '0'
        });

        setTimeout(() => {
            this.setState({
                postBattle: false,
            });
        }, nextStepAnimationDuration);
    }

    cacheEnemyCards = async (battleData) => {
        for (const card of battleData.defender.deck) {
            await getCardById(card.id); // We just make sure those are cached
        }
    }

    onFightButton = () => {
        this.props.closeUserPreviewHandler();
        this.props.kuceStartFight('Walka');
        fightWithUser(this.props.opponent.id)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(data => {
                            this.setState({isBattleStarting: true});
                            this.setState({battleData: data})
                            this.cacheEnemyCards(data).then(() =>
                                this.battleViewRunHandler());
                        })
                } else {
                    this.handleBattleErrors(response);
                    this.props.kuceStopFight();
                }
            });
    }
    // method that run dynamic battle view
    battleViewRunHandler = () => {
        this.props.closeUserPreviewHandler();

        this.props.kuceStopFight();
        this.setState({
            battleView: {visible: true, translateY: '-100vh', scale: '0'},
        });

        setTimeout(() => {
            this.setState({
                battleView: {visible: true, translateY: '0', scale: '1'},
            });
        }, popUpLoadingMinimalDuration);
    }

    // method that close dynamic battle view
    battleViewCloseHandler = () => {
        this.setState({
            battleView: {visible: true, translateY: '-100vh', scale: '0'},
        });

        setTimeout(() => {
            this.setState({
                battleView: {visible: false, translateY: '-100vh', scale: '0'},
            });
        }, 550);

        this.postBattleOpenHandler();
    }

    hoverTrue = () => {
        this.setState({popUpHover: true});
    }

    hoverFalse = () => {
        this.setState({popUpHover: false});
    }

    handleHiding = () => {
        if (!this.state.popUpHover)
            this.props.closeUserPreviewHandler();
    }

    renderBattleView(isDesktop) {
        if (isDesktop) {
            return (
                <>
                    <PostBattle postBattle={this.state.postBattle} win={this.state.win}
                                closeHandler={this.quickBattleCloseHandler}
                                attacker={this.state.caller}
                                attackerDeck={this.state.userDeck}
                                opponent={this.props.opponent}
                                opponentDeck={this.state.opponentDeck}
                                setOpacity={this.state.postBattleOpacity}
                                setTranslateY={this.state.postBattlePos}/>
                    <BattleView visible={this.state.battleView.visible}
                                battleData={this.state.battleData}
                                runPostBattle={this.postBattle}
                                showPostBattle={this.postBattleOpenHandler}
                                closeHandler={this.battleViewCloseHandler}
                                setScale={this.state.battleView.scale}
                                desktop={true}/>
                </>
            )
        } else {
            return (
                <>
                    <PostBattle postBattle={this.state.postBattle} win={this.state.win}
                                closeHandler={this.quickBattleCloseHandler}
                                attacker={this.state.caller}
                                attackerDeck={this.state.userDeck}
                                opponent={this.props.opponent}
                                opponentDeck={this.state.opponentDeck}
                                setTranslateY={this.state.postBattlePos}/>
                    <BattleView visible={this.state.battleView.visible}
                                battleData={this.state.battleData}
                                runPostBattle={this.postBattle}
                                showPostBattle={this.postBattleOpenHandler}
                                closeHandler={this.battleViewCloseHandler}
                                setTranslateY={this.state.battleView.translateY}
                                desktop={false}/>
                </>
            )
        }
    }

    render() {
        return (
            <>
                <Media query={mobile}>
                    <>
                        <PopUp visible={this.props.visible}
                               closeHandler={this.props.closeUserPreviewHandler}
                               setTranslateY={this.props.setTranslateY}>
                            <GridContainer>
                                <FlexCenterContainer>
                                    <FlexGapContainer gap={'40px'} setMargin={'32px 0 0 0'}>
                                        <UserInfo label={'Wygrane'} value={'24'} setMargin={'0'}/>
                                        <UserInfo label={'Przegrane'} value={'24'} setMargin={'0'}/>
                                        <UserInfo label={'Ratio'} value={'50%'} setMargin={'0'}/>
                                    </FlexGapContainer>
                                    <TinyUserProfile displayedUsername={this.state.caller.username}
                                                     setMargin={'24px 0 0 0'}
                                                     term={7} level={50} rank={2} avatar={this.state.caller.avatar}/>
                                    <KuceVs/>
                                    <TinyUserProfile displayedUsername={this.props.opponent.username}
                                                     setMargin={'0 0 24px 0'}
                                                     term={7} level={39} rank={15} avatar={this.props.opponent.avatar}/>
                                    <FlexGapContainer gap={'40px'}>
                                        <UserInfo label={'Wygrane'} value={'24'} setMargin={'0'}/>
                                        <UserInfo label={'Przegrane'} value={'24'} setMargin={'0'}/>
                                        <UserInfo label={'Ratio'} value={'50%'} setMargin={'0'}/>
                                    </FlexGapContainer>
                                </FlexCenterContainer>

                                <FlexEndContainer>
                                    <TinyCards deck={this.state.userDeck} setMargin={'24px 0 36px 0'}/>
                                    <FlexGapContainer gap={'36px'}>
                                        <ButtonWithIcon setMargin={'0 36px 0 0'}
                                                        handler={this.props.closeUserPreviewHandler}
                                                        color={theme.colors.yellowyOrangy} icon={xClose}>
                                            Wróć
                                        </ButtonWithIcon>
                                        <ButtonWithIcon setMargin={'0'} handler={this.onFightButton}
                                                        color={theme.colors.purplyPinky} icon={battleIcon}>
                                            Walcz
                                        </ButtonWithIcon>
                                    </FlexGapContainer>
                                    <ButtonWithIcon handler={this.quickBattleRunHandler} setMargin={'14px 0 16px 0'}
                                                    color={theme.colors.greenyBluey} icon={fastIcon}>
                                        Szybka walka
                                    </ButtonWithIcon>
                                </FlexEndContainer>
                            </GridContainer>
                        </PopUp>
                        {this.state.isBattleStarting ? this.renderBattleView(false) : null}
                        {this.errors()}
                    </>
                </Media>

                <Media query={desktop}>
                    <>
                        <TransBack closeHandler={this.handleHiding}
                                   visible={this.props.visible}
                                   setOpacity={this.props.setOpacity}>
                            <PopUp visible={this.props.visible}
                                   closeHandler={this.props.closeUserPreviewHandler}
                                   setTranslateY={this.props.setTranslateY}
                                   hoverTrue={this.hoverTrue} hoverFalse={this.hoverFalse}>
                                <FlexGapContainer gap={'10px'} setWidth={'100%'}>
                                    <ColumnGapContainer gap={'24px'} setMargin={'0 0 0 26px'}>
                                        <TinyUserProfile displayedUsername={this.state.caller.username} setMargin={'0'}
                                                         term={7} level={39} rank={15} avatar={this.state.caller.avatar}
                                                         vertical/>
                                        <FlexGapContainer gap={'52px'}>
                                            <UserInfo label={'Wygrane'} value={'24'} setMargin={'0'}/>
                                            <UserInfo label={'Przegrane'} value={'24'} setMargin={'0'}/>
                                            <UserInfo label={'Ratio'} value={'50%'} setMargin={'0'}/>
                                        </FlexGapContainer>
                                        <TinyCards deck={this.state.userDeck} setMargin={'0'} gap={'10px'}/>
                                    </ColumnGapContainer>
                                    <KuceVs/>
                                    <ColumnGapContainer gap={'24px'} setMargin={'0 26px 0 0'}>
                                        <TinyUserProfile displayedUsername={this.props.opponent.username}
                                                         setMargin={'0'}
                                                         term={7} level={39} rank={15}
                                                         avatar={this.props.opponent.avatar} vertical/>
                                        <FlexGapContainer gap={'52px'}>
                                            <UserInfo label={'Wygrane'} value={'24'} setMargin={'0'}/>
                                            <UserInfo label={'Przegrane'} value={'24'} setMargin={'0'}/>
                                            <UserInfo label={'Ratio'} value={'50%'} setMargin={'0'}/>
                                        </FlexGapContainer>
                                        <TinyCards deck={nullEditableDeck()} setMargin={'0'} gap={'10px'}/>
                                    </ColumnGapContainer>
                                </FlexGapContainer>

                                <FlexGapContainer gap={'40px'} setMargin={'36px 0 0 0'}>
                                    <ButtonWithIcon setMargin={'0'} handler={this.props.closeUserPreviewHandler}
                                                    color={theme.colors.yellowyOrangy} icon={xClose}>
                                        Wróć
                                    </ButtonWithIcon>
                                    <ButtonWithIcon setMargin={'0'} handler={this.onFightButton}
                                                    color={theme.colors.purplyPinky} icon={battleIcon}>
                                        Walcz
                                    </ButtonWithIcon>
                                    <ButtonWithIcon handler={this.quickBattleRunHandler} setMargin={'0'}
                                                    color={theme.colors.greenyBluey} icon={fastIcon}>
                                        Szybka walka
                                    </ButtonWithIcon>
                                </FlexGapContainer>
                            </PopUp>
                        </TransBack>
                        {this.state.isBattleStarting ? this.renderBattleView(true) : null}
                        {this.errors()}
                    </>
                </Media>
            </>
        );
    }
}

export default OpponentSelected;