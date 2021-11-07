import React from 'react';
import Article from './styled-components/Article';
import ContentContainer from './styled-components/ContentContainer';
import H2 from './styled-components/H2';
import ImageContainer from './styled-components/ImageContainer';
import Avatar from './styled-components/Avatar';
import UserLabel from '../../atoms/UserLabel';
import termIcon from '../../../../../assets/images/termIcon.png';
import levelIcon from '../../../../../assets/icons/levelIcon.svg';
import rankIcon from '../../../../../assets/images/rankIcon.png';
import FlexGapContainer from '../../../global/molecules/FlexGapContainer/FlexGapContainer';
import Media from 'react-media';
import {desktop} from '../../../../utils/globals';
import UserStatistic from '../../atoms/UserStat';

class TinyUserProfile extends React.Component {
    render() {
        return (
            <Article setMargin={this.props.setMargin} vertical={this.props.vertical}>
                <ContentContainer>
                    <H2 as={this.props.vertical ? 'p' : 'h2'} vertical={this.props.vertical}>
                        {this.props.displayedUsername}
                    </H2>
                    <FlexGapContainer gap={this.props.vertical ? '24px' : '6px'}>
                        <UserLabel term={this.props.term}
                                   icon={termIcon} number={this.props.term}
                                   setMargin={'0'} />
                        <UserLabel level={this.props.level} number={this.props.level}
                                   icon={levelIcon} setMargin={'0'} />
                        <UserLabel rank={this.props.rank} number={this.props.rank}
                                   icon={rankIcon} setMargin={'0'} />
                    </FlexGapContainer>
                    <Media query={desktop}>
                        {this.props.vertical ? '' :
                            <UserStatistic statisticNumber={'20'} type={'level'} currentLvlValue={'40'} setMargin={'14px 0 0 0'} />}
                    </Media>
                </ContentContainer>
                <ImageContainer vertical={this.props.vertical}>
                    {this.props.avatar ? <Avatar src={this.props.avatar}
                                                 vertical={this.props.vertical} alt="" /> : ''}
                </ImageContainer>
            </Article>
        );
    }
}

export default TinyUserProfile;