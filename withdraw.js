

function Withdraw(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [withdraw, setWithdraw  ] = React.useState('');

  const ctx = React.useContext(UserContext);

  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  function handleWithdraw(){
    console.log(withdraw);
    if (!validate(withdraw, 'withdraw')) return;
    
    // agregar withdraw a currentuser balance
    //ctx.users.push({name,email,password,balance:100});
    if (currentUser.balance<parseInt(withdraw)){
      setStatus('Can\'t withdraw more than what you got');
      setTimeout(() => setStatus(''),3000);
      return;
    }

    currentUser.balance -= parseInt(withdraw);
    setShow(false);
  }    

  function clearForm(){
    setWithdraw('');
    setShow(true);
  }

  let currentUser = null;
  if (ctx.currentuserId != null) {
    currentUser = ctx.users[ctx.currentuserId];
  }
  console.log(currentUser, ctx.currentuserId);

  if (currentUser === null){
    return (
      <Card
      bgcolor="danger"
      header="withdraw"
      status={status}
      body={ 
            <>
              <div> Need to Login First </div>
            </>
        }
      />
    )
  }

  return (
    <Card
      bgcolor="danger"
      header="withdraw"
      status={status}
      body={show ? (  
              <>
              <div> Balance of User:  </div>
              <input type="text" className="form-control" id="withdraw" placeholder="Enter withdraw Amount" value={withdraw}
               onChange={e => setWithdraw(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-light" onClick={handleWithdraw}>withdraw Amount</button>
              </>
            ):(
              <>
              <h5>Success</h5>

              <button type="submit" className="btn btn-light" onClick={clearForm}>Withdraw more Money</button>
              </>
            )}
    />
  )
}