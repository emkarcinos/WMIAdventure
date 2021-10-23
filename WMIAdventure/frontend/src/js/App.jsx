import React from 'react';
import {Route, Switch} from 'react-router-dom';

import MainMenu from './pages/MainMenu';
import Profile from './pages/Profile';
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

function App() {
  return (
      <ThemeProvider theme={theme}>
          <Switch>
              <Route exact path='/' component={MainMenu} />
              <Route path={'/login/'} component={LoginPage} />
              <Route path='/profile' component={Profile} />
              <Route path='/adventure' component={AdventureMode} />
              <Route path='/battle' component={BattleMode} />
              <Route path='/ranking' component={Ranking} />
              <Route path='/history-creator' component={HistoryCreator} />
              <Route path='/cards-creator-start' component={CardsCreatorStart} />
              <Route path='/cards-creator-edit' component={CardsCreatorEdit} />
              <Route path='/cards-creator-create' component={CardsCreatorCreate} />
          </Switch>
      </ThemeProvider>
  );
}

export default App;
