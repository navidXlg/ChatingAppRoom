import{ useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';



export default function Login(){

  const {user,  handelLoginSubmit} = useAuth();
  const [credintial, setCredintal] = useState({
    email:'',
    password : ''
  });
  
  const navigate = useNavigate();
  const handelFormChange = (event) => {
    let name = event.target.type;
    let value = event.target.value;
    setCredintal({...credintial, [name]:value})
  };

  useEffect(() => {
    if(user){
      navigate("/room")
    }
  },[]);
  

  return (
    <div>
      <form onSubmit={(event) => {handelLoginSubmit(event, credintial)}}>
        <input 
        type="email" 
        placeholder="Email" 
        value={credintial.email} 
        onChange={handelFormChange} />

        <input type="password" 
        placeholder="Password" 
        value={credintial.password} 
        onChange={handelFormChange} />
        <input type='submit' value="logIn"/>
      </form>
      <p>Have you <Link to="./register">Registerd</Link></p>
    </div>
  );
}

