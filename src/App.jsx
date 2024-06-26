import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './Pages/Authpage';
import HomePage from './Pages/HomePage';
import { useContext } from 'react';
import AuthContext from './store/Auth-Context';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

function App() {
  const authCtx = useContext(AuthContext)
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && <Route path='/auth'>
          <AuthPage />
        </Route>}
        <Route path='/profile'>
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && < Redirect to = '/auth'/>}
        </Route>
        <Route path = '*'>
          <Redirect to = '/'/>
        </Route>
        </Switch>
    </Layout>
  );
}

export default App;
