import React from 'react';
import Div from './styled-components/Div';
import TinyDeck from '../../molecules/TinyDeck';
import Article from './styled-components/Article';
import Close from './styled-components/Close';
import TinyUserProfile from '../../molecules/TinyUserProfile';
import UserInfo from '../../atoms/UserInfo';
import FlexGapContainer from '../../../global/molecules/FlexGapContainer/FlexGapContainer';
import Media from 'react-media';
import Deck from '../../molecules/Deck';
import Edit from './styled-components/Edit';
import {mobile} from '../../../../utils/globals';
import FlexCenterContainer from './styled-components/FlexCenterContainer';

class SwipeProfile extends React.Component {

    state = {
        hide: true,
        tinyDeckVisible: true,
        tinyDeckDisplay: true,
    }

    showHandler = () => {
        this.setState({
            hide: false,
            tinyDeckVisible: false,
        });

        setTimeout(() => {
            this.setState({
                tinyDeckDisplay: false,
            });
        }, 500);

        this.props.hideScroll();
    }

    hideHandler = () => {
        this.setState({
            hide: true,
            tinyDeckDisplay: true,
        });

        setTimeout(() => {
            this.setState({
                tinyDeckVisible: true,
            });
        }, 5);

        this.props.showScroll();
    }

    render() {
        return (
            <Div hide={this.state.hide}>
                <TinyDeck
                    showHandler={this.showHandler}
                    cardImages={[]}
                    tinyDeckVisible={this.state.tinyDeckVisible}
                    tinyDeckDisplay={this.state.tinyDeckDisplay}
                />
                <Article visible={!this.state.hide}>
                    <Close onClick={this.hideHandler} />
                    <Media query={mobile}>
                        <>
                            <FlexCenterContainer>
                                <TinyUserProfile displayedUsername={'skromnośćToPotęga'} setMargin={'0 0 24px 0'}
                                                 term={7} level={50} rank={2} avatar={null}/>
                                <FlexGapContainer gap={'40px'}  setMargin={'0 0 40px 0'}>
                                    <UserInfo label={'Wygrane'} value={'24'} setMargin={'0'} />
                                    <UserInfo label={'Przegrane'} value={'24'} setMargin={'0'} />
                                    <UserInfo label={'Ratio'} value={'50%'} setMargin={'0'} />
                                </FlexGapContainer>
                            </FlexCenterContainer>
                            <FlexCenterContainer>
                                <Deck />
                                <Edit>
                                    Edytuj
                                </Edit>
                            </FlexCenterContainer>
                        </>
                    </Media>
                </Article>
            </Div>
        );
    }
}

export default SwipeProfile;