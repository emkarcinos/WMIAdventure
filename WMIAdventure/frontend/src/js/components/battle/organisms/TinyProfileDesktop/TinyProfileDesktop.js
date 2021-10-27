import React from 'react';
import Div from './styled-components/Div';
import TinyUserProfile from '../../molecules/TinyUserProfile';
import ColumnGapContainer from '../../../global/molecules/ColumnGapContainer';
import FlexGapContainer from '../../../global/molecules/FlexGapContainer/FlexGapContainer';
import UserInfo from '../../atoms/UserInfo';
import CompactCardView from '../../../global/atoms/CompactCardView';
import Container from './styled-components/Container';

class TinyProfileDesktop extends React.Component {
    render() {
        return (
            <Div>
                <Container gap={'24px'}>
                    <TinyUserProfile displayedUsername={'skromnośćToPotęga'}
                                     term={7} level={50} rank={2} avatar={null} />

                    <ColumnGapContainer gap={'10px'}>
                        <FlexGapContainer gap={'52px'}>
                            <UserInfo label={'Wygrane'} value={'24'} />
                            <UserInfo label={'Przegrane'} value={'24'} />
                        </FlexGapContainer>
                        <UserInfo label={'Ratio'} value={'50%'} />
                    </ColumnGapContainer>
                </Container>
                <FlexGapContainer gap={'16px'}>
                    {[...Array(5)].map(
                        (e,i) => {
                            return (
                                <CompactCardView key={`compactCard-${i}`}
                                                 setWidth={'90px'}  setHeight={'150px'} common
                                                 setMargin={'0'} ownFontSize={'20px'}
                                                 setIconWidth={'60px'} setIconHeight={'60px'}
                                                 decorationHeight={'18px'} />
                            );
                        }
                    )}
                </FlexGapContainer>
            </Div>
        );
    }
}

export default TinyProfileDesktop;