function Login(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);  

  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  function handleLogin(){
    console.log(email,password);
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;

    // check email exists
    let currentuserId = ctx.users.findIndex( (user) => user.email === email);
    if (currentuserId < 0){ // no match sets value to -1
      setStatus('Email does not exist');
      setTimeout(() => setStatus(''),3000);
      return;
    }

    // check password matches email
    if (ctx.users[currentuserId].password != password){
      setStatus('Wrong password');
      setTimeout(() => setStatus(''),3000);
      return;
    }


    // check existe y password es correcto
    // ctx.users.push({email,password,balance:100});
    ctx.currentuserId = currentuserId;
    setShow(false);
  }    

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <Card
      bgcolor="success"
      header="Login"
      status={status}
      body={show ? (  
              <>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>
              </>
            ):(
              <>
              <h5>Welcome {ctx.users[ctx.currentuserId].name}, you are logged in</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Logout</button>
              </>
            )}
    />
  )
}