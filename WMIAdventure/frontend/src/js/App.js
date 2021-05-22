import {Route, Switch} from 'react-router-dom';
import MainMenu from './components/entertainment/pages/MainMenu';
import Profile from './components/entertainment/pages/Profile';
import AdventureMode from './components/entertainment/pages/AdventureMode';
import BattleMode from './components/entertainment/pages/BattleMode/BattleMode';
import Ranking from './components/entertainment/pages/Ranking/Ranking';
import Event from './components/entertainment/pages/Event';
import Quiz from './components/entertainment/pages/Quiz';
import HistoryCreator from './components/creative/pages/HistoryCreator';
import AnswerCreator from './components/creative/pages/AnswerCreator';
import CardsCreator from './components/creative/pages/CardsCreator';
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
