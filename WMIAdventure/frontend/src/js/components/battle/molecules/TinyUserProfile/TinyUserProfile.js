import React from 'react';
import Article from './styled-components/Article';
import ContentContainer from './styled-components/ContentContainer';
import Div from './styled-components/Div';
import H2 from './styled-components/H2';
import ImageContainer from './styled-components/ImageContainer';
import Avatar from './styled-components/Avatar';
import UserLabel from '../../atoms/UserLabel';

class TinyUserProfile extends React.Component {
    render() {
        return (
            <Article setMargin={this.props.setMargin}>
                <ContentContainer>
                    <H2>
                        {this.props.displayedUsername}
                    </H2>
                    <Div>
                        <UserLabel term={this.props.term} setMargin={'0 6px 0 0'}>
                            Semestr: {this.props.term}
                        </UserLabel>
                        <UserLabel level={this.props.level} setMargin={'0'}>
                            Level: {this.props.level}
                        </UserLabel>
                    </Div>
                    <UserLabel rank={this.props.rank} setMargin={'0'}>
                        Rank: {this.props.rank}
                    </UserLabel>
                </ContentContainer>
                <ImageContainer>
                    {this.props.avatar ? <Avatar src={this.props.avatar} alt="" /> : ''}
                </ImageContainer>
            </Article>
        );
    }
}

export default TinyUserProfile;