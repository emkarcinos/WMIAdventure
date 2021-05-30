import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MainMenu from './pages/entertainment/MainMenu';
import Profile from './pages/entertainment/Profile';
import AdventureMode from './pages/entertainment/AdventureMode';
import BattleMode from './pages/entertainment/BattleMode/BattleMode';
import Ranking from './pages/entertainment/Ranking/Ranking';
import Event from './pages/entertainment/Event';
import Quiz from './pages/entertainment/Quiz';
import HistoryCreator from './pages/creative/HistoryCreator';
import AnswerCreator from './pages/creative/AnswerCreator';
import CardsCreator from './pages/creative/CardsCreator';
import {ThemeProvider} from 'styled-components';
import theme from './utils/theme';

function App() {
  return (
      <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path='/' component={MainMenu} />
            <Route path='/profile' component={Profile} />
            <Route path='/adventure' component={AdventureMode} />
            <Route path='/battle' component={BattleMode} />
            <Route path='/ranking' component={Ranking} />
            <Route path='/event' component={Event} />
            <Route path='/quiz' component={Quiz} />
            <Route path='/history-creator' component={HistoryCreator} />
            <Route path='/cards-creator' component={CardsCreator} />
            <Route path='/answer-creator' component={AnswerCreator} />
          </Switch>
      </ThemeProvider>
  );
}

export default App;
