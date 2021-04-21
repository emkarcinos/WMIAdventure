import {Route, Switch} from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import Profile from './pages/Profile';
import AdventureMode from './pages/AdventureMode';
import BattleMode from './pages/BattleMode/BattleMode';

function App() {
  return (
    <Switch>
        <Route exact path='/' component={MainMenu} />
        <Route path='/profile' component={Profile} />
        <Route path='/adventure' component={AdventureMode} />
        <Route path='/battle' component={BattleMode} />
    </Switch>
  );
}

export default App;
