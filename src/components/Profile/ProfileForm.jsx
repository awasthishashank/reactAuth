import { useContext, useRef } from 'react';
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/Auth-Context';

const ProfileForm = () => {
  const history = useHistory()
  const authCtx = useContext(AuthContext)
  const newPasswordInputRef = useRef();
  const submithandler=(event)=>{
    event.preventDefault()
    const newPassword = newPasswordInputRef.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCAXPWS7glElI2GtGTTymPr5CokwDF8V3I',{
      method:'post',
      body:JSON.stringify({
        idToken : authCtx.token,
        password : newPassword,
        secureToken : false
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res =>{
      // always success
      history.replace("/")

    })
  }
  return (
    <form className={classes.form} onSubmit ={submithandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength = '7'ref= {newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
