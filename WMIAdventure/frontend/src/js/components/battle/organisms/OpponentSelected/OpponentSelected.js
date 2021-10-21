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

class OpponentSelected extends React.Component {
    render() {
        return (
            <>
                <Media query={'(max-width: 399px)'}>
                    <>
                        <TinyUserProfile displayedUsername={'skromnośćToPotęga'} setMargin={'0 0 16px 0'}
                                         term={7} level={50} rank={2} avatar={null}/>
                        <FlexGapContainer gap={'40px'}>
                            <UserInfo label={'Wygrane'} value={'24'} setMargin={'0'} />
                            <UserInfo label={'Przegrane'} value={'24'} setMargin={'0'} />
                            <UserInfo label={'Ratio'} value={'50%'} setMargin={'0'} />
                        </FlexGapContainer>
                        <KuceVs />
                        <TinyUserProfile displayedUsername={'Emkarcinos'} setMargin={'0 0 16px 0'}
                                         term={7} level={39} rank={15} avatar={null}/>
                        <FlexGapContainer gap={'40px'}>
                            <UserInfo label={'Wygrane'} value={'24'} setMargin={'0'} />
                            <UserInfo label={'Przegrane'} value={'24'} setMargin={'0'} />
                            <UserInfo label={'Ratio'} value={'50%'} setMargin={'0'} />
                        </FlexGapContainer>
                        <TinyCards cardImages={[]} setMargin={'16px 0 16px 0'} />

                        <FlexGapContainer gap={'36px'}>
                            <ButtonWithIcon handler={this.props.closeUserPreviewHandler}
                                            setMargin={'0'} color={theme.colors.gold} icon={xClose}>
                                Wróć
                            </ButtonWithIcon>
                            <ButtonWithIcon setMargin={'0'} color={theme.colors.epic} icon={battleIcon}>
                                Walcz
                            </ButtonWithIcon>
                        </FlexGapContainer>
                        <ButtonWithIcon setMargin={'10px 0 0 0'} color={theme.colors.common} icon={fastIcon}>
                            Szybka walka
                        </ButtonWithIcon>
                    </>
                </Media>

                <Media query={'(min-width: 400px) and (max-width: 1024px)'}>
                    <>
                        <TinyUserProfile displayedUsername={'skromnośćToPotęga'} setMargin={'0 0 24px 0'}
                                         term={7} level={50} rank={2} avatar={null}/>
                        <FlexGapContainer gap={'40px'}>
                            <UserInfo label={'Wygrane'} value={'24'} setMargin={'0'} />
                            <UserInfo label={'Przegrane'} value={'24'} setMargin={'0'} />
                            <UserInfo label={'Ratio'} value={'50%'} setMargin={'0'} />
                        </FlexGapContainer>
                        <KuceVs />
                        <TinyUserProfile displayedUsername={'Emkarcinos'} setMargin={'0 0 24px 0'}
                                         term={7} level={39} rank={15} avatar={null}/>
                        <FlexGapContainer gap={'40px'}>
                            <UserInfo label={'Wygrane'} value={'24'} setMargin={'0'} />
                            <UserInfo label={'Przegrane'} value={'24'} setMargin={'0'} />
                            <UserInfo label={'Ratio'} value={'50%'} setMargin={'0'} />
                        </FlexGapContainer>
                        <TinyCards cardImages={[]} setMargin={'24px 0 24px 0'} />

                        <FlexGapContainer gap={'36px'}>
                            <ButtonWithIcon setMargin={'0'} handler={this.props.closeUserPreviewHandler}
                                            color={theme.colors.gold} icon={xClose}>
                                Wróć
                            </ButtonWithIcon>
                            <ButtonWithIcon setMargin={'0'} color={theme.colors.epic} icon={battleIcon}>
                                Walcz
                            </ButtonWithIcon>
                        </FlexGapContainer>
                        <ButtonWithIcon setMargin={'14px 0 0 0'} color={theme.colors.common} icon={fastIcon}>
                            Szybka walka
                        </ButtonWithIcon>
                    </>
                </Media>
            </>
        );
    }
}

export default OpponentSelected;