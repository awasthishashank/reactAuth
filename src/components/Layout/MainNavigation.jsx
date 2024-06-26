import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import AuthContext from '../../store/Auth-Context';

const MainNavigation = () => {
  const history  = useHistory()
  const logoutHandler = () =>{
    authCtx.logout();
    history.replace("/auth")
  }
  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (<li>
            <Link to='/auth'>Login</Link>
          </li>)}
          {isLoggedIn && (<li>
            <Link to='/profile'>Profile</Link>
          </li>)}
          {isLoggedIn && (<li>
            <button onClick = {logoutHandler}>Logout</button>
          </li>)}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
