import React from 'react';
import Container from './styled-components/Container';
import NickDiv from './styled-components/NickDiv';
import Avatar from './styled-components/Avatar';
import kuc1 from '../../../../../assets/icons/kuc1.svg';
import Nick from './styled-components/Nick';
import FlexGapContainer from '../../../global/molecules/FlexGapContainer/FlexGapContainer';
import Icon from './styled-components/Icon';
import health from '../../../../../assets/icons/health.svg';
import shield from '../../../../../assets/icons/shield.svg'
import UserStatistic from "../../atoms/UserStatistic";
import ColumnGapContainer from "../../../global/molecules/ColumnGapContainer";
import Media from "react-media";
import {desktop, mobile} from "../../../../utils/globals";
import EffectFrame from "./styled-components/EffectFrame";

class EnemyStateContainer extends React.Component {

    /*
    props:
        hp <- information about health points
        shield <- information about shield points
        setTranslateX <- handle init animation
     */

    render() {
        return (
            <>
                <Media query={mobile}>
                    <Container setTranslateX={this.props.setTranslateX}>
                        <NickDiv>
                            <Avatar src={this.props.image ? this.props.image : kuc1}/>
                            <Nick>
                                {this.props.username}
                            </Nick>
                        </NickDiv>
                        <ColumnGapContainer gap={'8px'}>
                            <EffectFrame setOpacity={this.props.effectFrameOpacity}
                                         type={this.props.frameOpacityType}/>
                            <FlexGapContainer gap={'16px'}>
                                <Icon src={health}/>
                                <UserStatistic type={'hp'} statisticNumber={this.props.hp}/>
                            </FlexGapContainer>
                            <FlexGapContainer gap={'16px'}>
                                <Icon src={shield}/>
                                <UserStatistic type={'shield'} statisticNumber={this.props.shield}/>
                            </FlexGapContainer>
                        </ColumnGapContainer>
                    </Container>
                </Media>

                <Media query={desktop}>
                    <Container setTranslateY={this.props.setTranslateY}>
                        <FlexGapContainer gap={'24px'} setMargin={'auto 0'}>
                            <Avatar src={this.props.image ? this.props.image : kuc1}/>
                            <ColumnGapContainer gap={'8px'}>
                                <EffectFrame setOpacity={this.props.effectFrameOpacity}
                                             type={this.props.frameOpacityType}/>
                                <FlexGapContainer gap={'16px'}>
                                    <Icon src={shield}/>
                                    <UserStatistic type={'shield'} statisticNumber={this.props.shield}/>
                                </FlexGapContainer>
                                <FlexGapContainer gap={'16px'}>
                                    <Icon src={health}/>
                                    <UserStatistic type={'hp'} statisticNumber={this.props.hp}/>
                                </FlexGapContainer>
                            </ColumnGapContainer>
                        </FlexGapContainer>
                        <NickDiv>
                            <Nick>
                                {this.props.username}
                            </Nick>
                        </NickDiv>
                    </Container>
                </Media>
            </>

        );
    }
}

export default EnemyStateContainer;