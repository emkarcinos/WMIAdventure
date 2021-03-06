import React from 'react';
import Article from './styled-components/Article';
import ContentContainer from './styled-components/ContentContainer';
import H2 from './styled-components/H2';
import ImageContainer from './styled-components/ImageContainer';
import Avatar from './styled-components/Avatar';
import FlexGapContainer from '../../../global/molecules/FlexGapContainer/FlexGapContainer';
import Media from 'react-media';
import {desktop} from '../../../../utils/globals';
import UserLevel from '../../molecules/UserLevel';
import UserLabel from "../../../global/atoms/UserLabel";
import kuc1 from '../../../../../assets/icons/kuc1.svg';

class TinyUserProfile extends React.Component {

    renderSkillPoints = (showSkillPoints) => {
        if (showSkillPoints) {
            return (
                <UserLabel skillPoints={true}
                           number={this.props.user.skillpoints}
                           setMargin={'0'}
                />
            )
        }
    }

    render() {
        return (
            <Article setMargin={this.props.setMargin} vertical={this.props.vertical}>
                <ContentContainer>
                    <H2 as={this.props.vertical ? 'p' : 'h2'} vertical={this.props.vertical}>
                        {this.props.user.username}
                    </H2>
                    <FlexGapContainer gap={this.props.vertical ? '24px' : '6px'}>
                        {/*<UserLabel term={'1'}*/}
                        {/*           number={'1'}*/}
                        {/*           setMargin={'0'}/>*/}
                        <UserLabel level={this.props.user.level}
                                   number={this.props.user.level}
                                   setMargin={'0'}/>
                        {this.renderSkillPoints(this.props.showSkillPoints)}
                        {/*<UserLabel rank={'1'} number={'1'}*/}
                        {/*           setMargin={'0'}/>*/}
                    </FlexGapContainer>
                    <Media query={desktop}>
                        {
                            this.props.vertical ? '' :
                                <UserLevel
                                    level={this.props.user.statistics ? this.props.user.getLevelObject().level : 0}
                                    percentage={this.props.user.statistics ? this.props.user.getLevelObject().percentage : 0}
                                    setMargin={'14px 0 0 0'}
                                />
                        }
                    </Media>
                </ContentContainer>
                <ImageContainer vertical={this.props.vertical} avatar>
                    <Avatar src={this.props.user.image ? this.props.user.image : kuc1}
                            vertical={this.props.vertical} alt="profile-pic"/>
                </ImageContainer>
            </Article>
        );
    }
}

export default TinyUserProfile;