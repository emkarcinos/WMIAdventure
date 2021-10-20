import React from 'react';
import {Helmet} from 'react-helmet';
import NavBar from '../../components/prototype/organisms/NavBar';
import Wrapper from './styled-components/Wrapper';
import Main from './styled-components/Main';
import MobilePopUp from '../../components/battle/organisms/MobilePopUp';
import TinyUserProfile from '../../components/battle/molecules/TinyUserProfile';
import darkImagePlaceholder from '../../../assets/icons/upload_image_dark.svg';

class BattleMode extends React.Component {

    state = {
        users: [],
        currentUserDecks: [],
        defenderDecks: [],

        userPreviewRun: false,
        userPreviewPos: '-100vh',
    }

    runUserPreviewHandler = () => {
        this.setState({
            userPreviewRun: true,
        });

        setTimeout(() => {
            this.setState({
                userPreviewPos: '0',
            });
        }, 5);
    }

    closeUserPreviewHandler = () => {
        this.setState({
            userPreviewPos: '-100vh',
        });

        setTimeout(() => {
            this.setState({
                userPreviewRun: false,
            });
        }, 550);
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Tryb Battle</title>
                </Helmet>
                <Wrapper>
                    <NavBar />
                    <Main>
                        <button onClick={this.runUserPreviewHandler}>
                            run popup
                        </button>
                        <MobilePopUp visible={this.state.userPreviewRun}
                                     setTranslateY={this.state.userPreviewPos}
                                     closeHandler={this.closeUserPreviewHandler}>
                            <TinyUserProfile displayedUsername={'skromnośćToPotęga'}
                                             term={2} level={22} rank={11} avatar={darkImagePlaceholder}/>
                        </MobilePopUp>
                    </Main>
                </Wrapper>
            </>
        );
    }
}

export default BattleMode;