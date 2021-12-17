import React, {useEffect, useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import LandingPage from "./pages/LandingPage";
import MainMenu from './pages/MainMenu';
import Profile from './pages/Profile';
import UserRegistrationPage from "./pages/UserRegistration";
import AdventureMode from './pages/AdventureMode';
import BattleMode from './pages/BattleMode';
import Ranking from './pages/Ranking';
import HistoryCreator from './pages/HistoryCreator';
import {ThemeProvider} from 'styled-components';
import theme from './utils/theme';
import CardsCreatorCreate from './pages/CardsCreatorCreate';
import CardsCreatorStart from './pages/CardsCreatorStart';
import CardsCreatorEdit from './pages/CardsCreatorEdit';
import LoginPage from "./pages/LoginPage/LoginPage";
import {isLoggedIn} from "./storage/user/userData";

function App() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(undefined)

    useEffect(() => {
        isLoggedIn()
            .then(resp => setIsUserLoggedIn(resp));
    });

    return (
        <ThemeProvider theme={theme}>
            <Switch>
                {isUserLoggedIn ?
                    <>
                        <Route path='/main' component={MainMenu}/>
                        <Route path='/profile' component={Profile}/>
                        <Route path='/adventure' component={AdventureMode}/>
                        <Route path='/battle' component={BattleMode}/>
                        <Route path='/ranking' component={Ranking}/>
                        <Route path='/history-creator' component={HistoryCreator}/>
                        <Route path='/cards-creator-start' component={CardsCreatorStart}/>
                        <Route path='/cards-creator-edit' component={CardsCreatorEdit}/>
                        <Route path='/cards-creator-create' component={CardsCreatorCreate}/>
                        <Redirect to="/main"/>
                    </> :
                    <>
                        <Route exact path='/' component={LandingPage}/>
                        <Route path='/login' component={LoginPage}/>
                        <Route path='/registration' component={UserRegistrationPage}/>
                        <Redirect to="/"/>
                    </>
                }
            </Switch>
        </ThemeProvider>
    );
}

export default App;
