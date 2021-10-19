import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MainMenu from './pages/entertainment/MainMenu';
import Profile from './pages/entertainment/Profile';
import AdventureMode from './pages/entertainment/AdventureMode';
import BattleMode from './pages/entertainment/BattleMode';
import Ranking from './pages/entertainment/Ranking/Ranking';
import Event from './pages/entertainment/Event';
import Quiz from './pages/entertainment/Quiz';
import HistoryCreator from './pages/creative/HistoryCreator';
import AnswerCreator from './pages/creative/AnswerCreator';
import {ThemeProvider} from 'styled-components';
import theme from './utils/theme';
import CardsCreatorCreate from './pages/creative/CardsCreatorCreate';
import CardsCreatorStart from './pages/creative/CardsCreatorStart';
import CardsCreatorEdit from './pages/creative/CardsCreatorEdit';

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
            <Route path='/cards-creator-start' component={CardsCreatorStart} />
            <Route path='/cards-creator-edit' component={CardsCreatorEdit} />
            <Route path='/cards-creator-create' component={CardsCreatorCreate} />
            <Route path='/answer-creator' component={AnswerCreator} />
          </Switch>
      </ThemeProvider>
  );
}

export default App;
