import React from 'react';
import Article from './styled-components/Article';
import ContentContainer from './styled-components/ContentContainer';
import H2 from './styled-components/H2';
import ImageContainer from './styled-components/ImageContainer';
import Avatar from './styled-components/Avatar';
import FlexGapContainer from '../../../global/molecules/FlexGapContainer/FlexGapContainer';
import Media from 'react-media';
import {desktop} from '../../../../utils/globals';
import UserStatistic from '../../atoms/UserStatistic';
import UserLabel from "../../../global/atoms/UserLabel";

class TinyUserProfile extends React.Component {
    render() {
        return (
            <Article setMargin={this.props.setMargin} vertical={this.props.vertical}>
                <ContentContainer>
                    <H2 as={this.props.vertical ? 'p' : 'h2'} vertical={this.props.vertical}>
                        {this.props.user.username}
                    </H2>
                    <FlexGapContainer gap={this.props.vertical ? '24px' : '6px'}>
                        <UserLabel term={'1'}
                                   number={'1'}
                                   setMargin={'0'}/>
                        <UserLabel level={this.props.user.level} number={this.props.user.level}
                                   setMargin={'0'}/>
                        <UserLabel rank={'1'} number={'1'}
                                   setMargin={'0'}/>
                    </FlexGapContainer>
                    <Media query={desktop}>
                        {this.props.vertical ? '' :
                            <UserStatistic
                                statisticNumber={this.props.user.statistics ? this.props.user.getLevelObject().level : '0'}
                                type={'level'}
                                currentLvlValue={this.props.user.statistics ? this.props.user.getLevelObject().percentage : '0'}
                                setMargin={'14px 0 0 0'}/>}
                    </Media>
                </ContentContainer>
                <ImageContainer vertical={this.props.vertical} avatar={this.props.user.image}>
                    {this.props.user.image ? <Avatar src={this.props.user.image}
                                                     vertical={this.props.vertical} alt=""/> : ''}
                </ImageContainer>
            </Article>
        );
    }
}

export default TinyUserProfile;