import{ useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';


export default function Register(){

  const {user, userRegister} = useAuth();
  const [credintial, setCredintal] = useState({
    name : '',
    email:'',
    password : '',
    passwordConifrm : ''
  });
  
  const navigate = useNavigate();
  const handelFormChange = (event) => {
    let name = event.target.id;
    let value = event.target.value;
    console.log(name, value)
    setCredintal({...credintial, [name]:value})
  };

  useEffect(() => {
    if(user){
      navigate("/room");
    }
  },[]);

  return (
    <div>
      <form onSubmit={(event) => {userRegister(event, credintial)}}>
        <input 
        type='text'
        id='name' 
        placeholder="Name" 
        value={credintial.name} 
        onChange={handelFormChange} 
        />
        <input 
        type="email"
        id='email' 
        placeholder="Email" 
        value={credintial.email} 
        onChange={handelFormChange} 
        />
        <input 
        type="password"
        id='password' 
        placeholder="Password" 
        value={credintial.password} 
        onChange={handelFormChange} 
        />
        <input 
        type="password"
        id="passwordConifrm" 
        placeholder="PasswordConfirm" 
        value={credintial.passwordConifrm} 
        onChange={handelFormChange} />
        <input type='submit' value="Register"/>
      </form>
    </div>
  );
}

