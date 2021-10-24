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
import {mobile} from '../../../../utils/globals';
import GridContainer from './styled-components/GridContainer';
import FlexEndContainer from './styled-components/FlexEndContainer';
import FlexCenterContainer from './styled-components/FlexCenterContainer';
import PostBattle from '../PostBattle';
import MobilePopUp from '../MobilePopUp';
import {getCurrentUsername} from "../../../../utils/userData";
import {fightWithUser} from "../../../../api/gateways/BattleAPIGateway";

class OpponentSelected extends React.Component {

    state = {
        postBattle: false,
        caller: null,
        win: null
    }

    componentDidMount() {
        getCurrentUsername()
            .then(user => this.setState({caller: user}))
    }

    postBattle = (data) => {
        this.setState({
            postBattle: true,
        });
        data.winner === data.attacker.id ? this.setState({win: true}) : this.setState({win: false})
    }

    quickBattleRunHandler = () => {
        this.props.closeUserPreviewHandler();
        fightWithUser(this.props.opponent.id)
            .then(response => {
                if(response.ok) {
                    response.json()
                        .then(data => this.postBattle(data))
                }
            });
    }

    quickBattleCloseHandler = () => {
        this.setState({
            postBattle: false,
        });
    }

    render() {
        return (
            <>
                <Media query={mobile}>
                    <>
                        <MobilePopUp visible={this.props.visible} closeHandler={this.props.closeUserPreviewHandler}
                                     setTranslateY={this.props.setTranslateY}>
                            <GridContainer>
                                <FlexCenterContainer>
                                    <FlexGapContainer gap={'40px'} setMargin={'32px 0 0 0'}>
                                        <UserInfo label={'Wygrane'} value={'24'} setMargin={'0'} />
                                        <UserInfo label={'Przegrane'} value={'24'} setMargin={'0'} />
                                        <UserInfo label={'Ratio'} value={'50%'} setMargin={'0'} />
                                    </FlexGapContainer>
                                    <TinyUserProfile displayedUsername={this.state.caller} setMargin={'24px 0 0 0'}
                                                     term={7} level={50} rank={2} avatar={null}/>
                                    <KuceVs />
                                    <TinyUserProfile displayedUsername={this.props.opponent.username} setMargin={'0 0 24px 0'}
                                                     term={7} level={39} rank={15} avatar={null}/>
                                    <FlexGapContainer gap={'40px'}>
                                        <UserInfo label={'Wygrane'} value={'24'} setMargin={'0'} />
                                        <UserInfo label={'Przegrane'} value={'24'} setMargin={'0'} />
                                        <UserInfo label={'Ratio'} value={'50%'} setMargin={'0'} />
                                    </FlexGapContainer>
                                </FlexCenterContainer>

                                <FlexEndContainer>
                                    <TinyCards cardImages={[]} setMargin={'24px 0 36px 0'} />
                                    <FlexGapContainer gap={'36px'}>
                                        <ButtonWithIcon setMargin={'0 36px 0 0'} handler={this.props.closeUserPreviewHandler}
                                                        color={theme.colors.gold} icon={xClose}>
                                            Wróć
                                        </ButtonWithIcon>
                                        <ButtonWithIcon setMargin={'0'} color={theme.colors.epic} icon={battleIcon}>
                                            Walcz
                                        </ButtonWithIcon>
                                    </FlexGapContainer>
                                    <ButtonWithIcon handler={this.quickBattleRunHandler} setMargin={'14px 0 16px 0'}
                                                    color={theme.colors.common} icon={fastIcon}>
                                        Szybka walka
                                    </ButtonWithIcon>
                                </FlexEndContainer>
                            </GridContainer>
                        </MobilePopUp>
                        <PostBattle postBattle={this.state.postBattle} win={this.state.win}
                                    closeHandler={this.quickBattleCloseHandler}
                                    attacker={this.state.caller}
                                    opponent={this.props.opponent.username} />
                    </>
                </Media>
            </>
        );
    }
}

export default OpponentSelected;