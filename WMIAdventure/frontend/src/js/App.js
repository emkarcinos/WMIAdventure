import {Route, Switch} from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import Profile from './pages/Profile';
import AdventureMode from './pages/AdventureMode';

function App() {
  return (
    <Switch>
        <Route exact path='/' component={MainMenu} />
        <Route path='/profile' component={Profile} />
        <Route path='/adventure' component={AdventureMode} />
    </Switch>
  );
}

export default App;
