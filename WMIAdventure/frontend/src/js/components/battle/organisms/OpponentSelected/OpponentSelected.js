import React from 'react';
import TinyUserProfile from '../../molecules/TinyUserProfile';
import UserInfo from '../../atoms/UserInfo';
import UserInfoContainer from './styled-components/UserInfoContainer';
import KuceVs from '../../atoms/KuceVs/KuceVs';

class OpponentSelected extends React.Component {
    render() {
        return (
            <>
                <TinyUserProfile displayedUsername={'skromnośćToPotęga'}
                                 term={7} level={50} rank={2} avatar={null}/>
                <UserInfoContainer>
                    <UserInfo label={'Wygrane'} value={'24'} setMargin={'0 40px 0 0'} />
                    <UserInfo label={'Przegrane'} value={'24'} setMargin={'0 40px 0 0'} />
                    <UserInfo label={'Ratio'} value={'50%'} setMargin={'0'} />
                </UserInfoContainer>
                <KuceVs />
                <TinyUserProfile displayedUsername={'Emkarcinos'}
                                 term={7} level={39} rank={15} avatar={null}/>
                <UserInfoContainer>
                    <UserInfo label={'Wygrane'} value={'24'} setMargin={'0 40px 0 0'} />
                    <UserInfo label={'Przegrane'} value={'24'} setMargin={'0 40px 0 0'} />
                    <UserInfo label={'Ratio'} value={'50%'} setMargin={'0'} />
                </UserInfoContainer>
            </>
        );
    }
}

export default OpponentSelected;