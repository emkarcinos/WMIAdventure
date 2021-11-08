import React from 'react';
import TinyUserProfile from '../../molecules/TinyUserProfile';
import UserInfo from '../../atoms/UserInfo';
import KuceVs from '../../atoms/KuceVs/KuceVs';
import TinyCards from '../../atoms/TinyCards/TinyCards';
import ButtonWithIcon from '../../atoms/ButtonWithIcon';
import theme from '../../../../utils/theme';
import xClose from '../../../../../assets/icons/x-close.svg';
import battleIcon from '../../../../../assets/images/battleIcon.png';
import fastIcon from '../../../../../assets/icons/fast.svg';
import Media from 'react-media';
import FlexGapContainer from '../../../global/molecules/FlexGapContainer/FlexGapContainer';
import {desktop, loadingMinimalDuration, mobile} from '../../../../utils/globals';
import GridContainer from './styled-components/GridContainer';
import FlexEndContainer from './styled-components/FlexEndContainer';
import FlexCenterContainer from './styled-components/FlexCenterContainer';
import PostBattle from '../PostBattle';
import PopUp from '../../../global/organisms/PopUp';
import TransBack from '../../../global/organisms/TransBack';
import ColumnGapContainer from '../../../global/molecules/ColumnGapContainer';
import {getCurrentUserDecks, getCurrentUsername} from "../../../../utils/userData";
import {fightWithUser} from "../../../../api/gateways/BattleAPIGateway";

class OpponentSelected extends React.Component {

    state = {
        postBattle: false,
        popUpHover: false,
        postBattlePos: '-100vh',
        postBattleOpacity: '0',
        userDeck: null
    }

    componentDidMount() {
        getCurrentUsername()
            .then(user => this.setState({caller: user}))
        getCurrentUserDecks()
            .then(resp => {
                if (resp) {
                    const attackerDeck = resp[0];
                    this.setState({userDeck: attackerDeck});
                }
            });
    }

    quickBattleRunHandler = () => {
        this.props.closeUserPreviewHandler();
        this.props.kuceStartFight();
        fightWithUser(this.props.opponent.id)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(data => {
                            this.postBattle(data);
                            this.postBattleOpenHandler();
                        })
                }
            });
    }

    postBattle = (data) => {
        this.props.kuceStopFight();
        this.setState({
            postBattle: true,
            opponentDeck: data.defender.deck
        });
        data.winner === data.attacker.id ?
            this.setState({win: true}) : this.setState({win: false});
    }

    postBattleOpenHandler = () => {
        setTimeout(() => {
            this.setState({
                postBattlePos: '0',
                postBattleOpacity: '1'
            });
        }, loadingMinimalDuration);
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
        }, 550);
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
                                    <TinyUserProfile displayedUsername={this.state.caller} setMargin={'24px 0 0 0'}
                                                     term={7} level={50} rank={2} avatar={null}/>
                                    <KuceVs/>
                                    <TinyUserProfile displayedUsername={this.props.opponent.username}
                                                     setMargin={'0 0 24px 0'}
                                                     term={7} level={39} rank={15} avatar={null}/>
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
                                        <ButtonWithIcon setMargin={'0'} color={theme.colors.purplyPinky}
                                                        icon={battleIcon}>
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
                        <PostBattle postBattle={this.state.postBattle} win={this.state.win}
                                    closeHandler={this.quickBattleCloseHandler}
                                    attacker={this.state.caller}
                                    attackerDeck={this.state.userDeck}
                                    opponent={this.props.opponent.username}
                                    opponentDeck={this.state.opponentDeck}
                                    setTranslateY={this.state.postBattlePos}/>
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
                                        <TinyUserProfile displayedUsername={this.state.caller} setMargin={'0'}
                                                         term={7} level={39} rank={15} avatar={null} vertical/>
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
                                                         term={7} level={39} rank={15} avatar={null} vertical/>
                                        <FlexGapContainer gap={'52px'}>
                                            <UserInfo label={'Wygrane'} value={'24'} setMargin={'0'}/>
                                            <UserInfo label={'Przegrane'} value={'24'} setMargin={'0'}/>
                                            <UserInfo label={'Ratio'} value={'50%'} setMargin={'0'}/>
                                        </FlexGapContainer>
                                        <TinyCards deck={null} setMargin={'0'} gap={'10px'}/>
                                    </ColumnGapContainer>
                                </FlexGapContainer>

                                <FlexGapContainer gap={'40px'} setMargin={'36px 0 0 0'}>
                                    <ButtonWithIcon setMargin={'0'} handler={this.props.closeUserPreviewHandler}
                                                    color={theme.colors.yellowyOrangy} icon={xClose}>
                                        Wróć
                                    </ButtonWithIcon>
                                    <ButtonWithIcon setMargin={'0'} color={theme.colors.purplyPinky} icon={battleIcon}>
                                        Walcz
                                    </ButtonWithIcon>
                                    <ButtonWithIcon handler={this.quickBattleRunHandler} setMargin={'0'}
                                                    color={theme.colors.greenyBluey} icon={fastIcon}>
                                        Szybka walka
                                    </ButtonWithIcon>
                                </FlexGapContainer>
                            </PopUp>
                        </TransBack>
                        <PostBattle postBattle={this.state.postBattle} win={this.state.win}
                                    closeHandler={this.quickBattleCloseHandler}
                                    attacker={this.state.caller}
                                    attackerDeck={this.state.userDeck}
                                    opponent={this.props.opponent.username}
                                    opponentDeck={this.state.opponentDeck}
                                    setOpacity={this.state.postBattleOpacity}
                                    setTranslateY={this.state.postBattlePos}/>
                    </>
                </Media>
            </>
        );
    }
}

export default OpponentSelected;