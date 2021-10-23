import React from 'react';
import Article from './styled-components/Article';
import ContentContainer from './styled-components/ContentContainer';
import Div from './styled-components/Div';
import H2 from './styled-components/H2';
import ImageContainer from './styled-components/ImageContainer';
import Avatar from './styled-components/Avatar';
import UserLabel from '../../atoms/UserLabel';
import termIcon from '../../../../../assets/images/termIcon.png';
import levelIcon from '../../../../../assets/icons/levelIcon.svg';
import rankIcon from '../../../../../assets/images/rankIcon.png';

class TinyUserProfile extends React.Component {
    render() {
        return (
            <Article setMargin={this.props.setMargin}>
                <ContentContainer>
                    <H2>
                        {this.props.displayedUsername}
                    </H2>
                    <Div>
                        <UserLabel term={this.props.term}
                                   icon={termIcon} number={this.props.term}
                                   setMargin={'0 6px 0 0'} />
                        <UserLabel level={this.props.level} number={this.props.level}
                                   icon={levelIcon} setMargin={'0'} />
                    </Div>
                    <UserLabel rank={this.props.rank} number={'6'}
                               icon={rankIcon} setMargin={'0'} />
                </ContentContainer>
                <ImageContainer>
                    {this.props.avatar ? <Avatar src={this.props.avatar} alt="" /> : ''}
                </ImageContainer>
            </Article>
        );
    }
}

export default TinyUserProfile;