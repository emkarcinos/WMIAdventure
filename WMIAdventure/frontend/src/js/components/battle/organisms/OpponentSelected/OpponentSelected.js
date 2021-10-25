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
import {desktop, mobile} from '../../../../utils/globals';
import GridContainer from './styled-components/GridContainer';
import FlexEndContainer from './styled-components/FlexEndContainer';
import FlexCenterContainer from './styled-components/FlexCenterContainer';
import PostBattle from '../PostBattle';
import PopUp from '../../../global/organisms/PopUp';
import TransBack from '../../../global/organisms/TransBack';

class OpponentSelected extends React.Component {

    state = {
        postBattle: false,
    }

    quickBattleRunHandler = () => {
        this.props.closeUserPreviewHandler();
        this.setState({
            postBattle: true,
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
                        <PopUp visible={this.props.visible} closeHandler={this.props.closeUserPreviewHandler}
                               setTranslateY={this.props.setTranslateY}>
                            <GridContainer>
                                <FlexCenterContainer>
                                    <FlexGapContainer gap={'40px'} setMargin={'32px 0 0 0'}>
                                        <UserInfo label={'Wygrane'} value={'24'} setMargin={'0'} />
                                        <UserInfo label={'Przegrane'} value={'24'} setMargin={'0'} />
                                        <UserInfo label={'Ratio'} value={'50%'} setMargin={'0'} />
                                    </FlexGapContainer>
                                    <TinyUserProfile displayedUsername={'skromnośćToPotęga'} setMargin={'24px 0 0 0'}
                                                     term={7} level={50} rank={2} avatar={null}/>
                                    <KuceVs />
                                    <TinyUserProfile displayedUsername={'Emkarcinos'} setMargin={'0 0 24px 0'}
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
                        </PopUp>
                        <PostBattle postBattle={this.state.postBattle} win={true}
                                    closeHandler={this.quickBattleCloseHandler} />
                    </>
                </Media>

                <Media query={desktop}>
                    <TransBack visible={this.props.visible} setOpacity={this.props.setOpacity}>
                        <PopUp visible={this.props.visible} closeHandler={this.props.closeUserPreviewHandler}
                                     setTranslateY={this.props.setTranslateY}>
                            <TinyUserProfile displayedUsername={'Emkarcinos'} setMargin={'0 0 24px 0'}
                                             term={7} level={39} rank={15} avatar={null} vertical/>
                            <TinyCards cardImages={[]} setMargin={'24px 0 36px 0'} />
                            <FlexGapContainer gap={'36px'}>
                                <ButtonWithIcon setMargin={'0'} handler={this.props.closeUserPreviewHandler}
                                                color={theme.colors.gold} icon={xClose}>
                                    Wróć
                                </ButtonWithIcon>
                                <ButtonWithIcon setMargin={'0'} color={theme.colors.epic} icon={battleIcon}>
                                    Walcz
                                </ButtonWithIcon>
                                <ButtonWithIcon handler={this.quickBattleRunHandler} setMargin={'0'}
                                                color={theme.colors.common} icon={fastIcon}>
                                    Szybka walka
                                </ButtonWithIcon>
                            </FlexGapContainer>
                        </PopUp>
                        <PostBattle postBattle={this.state.postBattle} win={true}
                                    closeHandler={this.quickBattleCloseHandler} />
                    </TransBack>
                </Media>
            </>
        );
    }
}

export default OpponentSelected;