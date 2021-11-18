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
import {getUsersDecks} from "../../../../storage/user/userData";

class SwipeProfile extends React.Component {

    state = {
        hide: true,
        tinyDeckVisible: true,
        tinyDeckDisplay: true,
        userDeck: null
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

    componentDidUpdate(prevProps) {
        if (prevProps.userId === this.props.userId) return;

        getUsersDecks(this.props.userId)
            .then(resp => {
                if (resp) {
                    const attackerDeck = resp[0];
                    this.setState({userDeck: attackerDeck});
                }
            });
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

            <Media query={mobile}>
                <Div hide={this.state.hide}>
                    <TinyDeck
                        showHandler={this.showHandler}
                        deck={this.state.userDeck}
                        tinyDeckVisible={this.state.tinyDeckVisible}
                        tinyDeckDisplay={this.state.tinyDeckDisplay}
                    />
                    <Article visible={!this.state.hide}>
                        <Close onClick={this.hideHandler}/>
                        <>
                            <FlexCenterContainer>
                                <TinyUserProfile displayedUsername={this.props.username} setMargin={'0 0 24px 0'}
                                                 term={7} level={50} rank={2} avatar={null}/>
                                <FlexGapContainer gap={'40px'} setMargin={'0 0 40px 0'}>
                                    <UserInfo label={'Wygrane'} value={'24'} setMargin={'0'}/>
                                    <UserInfo label={'Przegrane'} value={'24'} setMargin={'0'}/>
                                    <UserInfo label={'Ratio'} value={'50%'} setMargin={'0'}/>
                                </FlexGapContainer>
                            </FlexCenterContainer>
                            <FlexCenterContainer>
                                <Deck deck={this.state.userDeck}/>
                                <Edit>
                                    Edytuj
                                </Edit>
                            </FlexCenterContainer>
                        </>
                    </Article>
                </Div>
            </Media>
        );
    }
}

export default SwipeProfile;