import {Route, Switch} from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import Profile from './pages/Profile';
import AdventureMode from './pages/AdventureMode';
import BattleMode from './pages/BattleMode/BattleMode';
import Ranking from './pages/Ranking/Ranking';
import Event from './pages/Event';
import Quiz from './pages/Quiz';
import HistoryCreator from './pages/HistoryCreator';
import AnswerCreator from './pages/AnswerCreator';
import CardsCreator from './pages/CardsCreator';
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
