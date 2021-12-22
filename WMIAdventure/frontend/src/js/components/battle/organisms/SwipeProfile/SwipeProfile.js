import React from 'react';
import Div from './styled-components/Div';
import TinyDeck from '../../molecules/TinyDeck';
import Article from './styled-components/Article';
import Close from './styled-components/Close';
import TinyUserProfile from '../../molecules/TinyUserProfile';
import Media from 'react-media';
import Deck from '../../molecules/Deck';
import {mobile} from '../../../../utils/globals';
import FlexCenterContainer from './styled-components/FlexCenterContainer';
import {getCurrentUserDecks} from "../../../../storage/user/userData";
import {EditableDeck, nullEditableDeck} from "../../../../api/data-models/battle/EditableDeck";
import {cardsFromDeckData} from "../../../../api/data-models/battle/Card";
import P from "./styled-components/P";

class SwipeProfile extends React.Component {

    state = {
        hide: true,
        tinyDeckVisible: true,
        tinyDeckDisplay: true,
        deck: nullEditableDeck()
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

    async getDeck() {
        const data = await getCurrentUserDecks();
        if (!data)
            return;

        const userSpecificCards = await cardsFromDeckData(data);
        this.setState({deck: new EditableDeck(userSpecificCards)});
    }

    componentDidMount() {
        this.getDeck()
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
                        deck={this.state.deck}
                        tinyDeckVisible={this.state.tinyDeckVisible}
                        tinyDeckDisplay={this.state.tinyDeckDisplay}
                    />
                    <Article visible={!this.state.hide}>
                        <Close onClick={this.hideHandler}/>
                        <>
                            <FlexCenterContainer>
                                <TinyUserProfile user={this.props.user} setMargin={'0 0 24px 0'}/>
                                {/*<FlexGapContainer gap={'40px'} setMargin={'0 0 40px 0'}>*/}
                                {/*    <UserInfo label={'Wygrane'} value={'24'} setMargin={'0'}/>*/}
                                {/*    <UserInfo label={'Przegrane'} value={'24'} setMargin={'0'}/>*/}
                                {/*    <UserInfo label={'Ratio'} value={'50%'} setMargin={'0'}/>*/}
                                {/*</FlexGapContainer>*/}
                            </FlexCenterContainer>
                            <FlexCenterContainer>
                                <Deck deck={this.state.deck}/>
                                <P>Dotknij kartę aby zmodyfikować talię</P>
                            </FlexCenterContainer>
                        </>
                    </Article>
                </Div>
            </Media>
        );
    }
}

export default SwipeProfile;