import {Route, Switch} from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import Profile from './pages/Profile';
import AdventureMode from './pages/AdventureMode';
import BattleMode from './pages/BattleMode/BattleMode';
import Ranking from './pages/Ranking/Ranking';
import Event from './pages/Event';
import Quiz from './pages/Quiz';

function App() {
  return (
    <Switch>
        <Route exact path='/' component={MainMenu} />
        <Route path='/profile' component={Profile} />
        <Route path='/adventure' component={AdventureMode} />
        <Route path='/battle' component={BattleMode} />
        <Route path='/ranking' component={Ranking} />
        <Route path='/event' component={Event} />
        <Route path='/quiz' component={Quiz} />
    </Switch>
  );
}

export default App;
