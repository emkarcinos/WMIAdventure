import {Route, Switch} from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import Profile from './pages/Profile';

function App() {
  return (
    <Switch>
        <Route exact path='/' component={MainMenu} />
        <Route path='/profile' component={Profile} />
    </Switch>
  );
}

export default App;
