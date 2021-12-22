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
import {hasSessionCookie} from "./storage/user/userData";
import Navbar from "./components/global/molecules/Navbar";

function App() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(hasSessionCookie())

    useEffect(() => {
        setIsUserLoggedIn(hasSessionCookie());
    });

    return (
        <ThemeProvider theme={theme}>
            <Switch>
                {isUserLoggedIn ?
                    <>
                        <Navbar/>
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
