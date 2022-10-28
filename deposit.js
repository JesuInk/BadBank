

function Deposit(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [deposit, setDeposit  ] = React.useState('');

  const ctx = React.useContext(UserContext);

  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  function handleDeposit(){
    console.log(deposit);
    if (!validate(deposit, 'deposit')) return;
    
    // agregar deposit a currentuser balance
    //ctx.users.push({name,email,password,balance:100});
    ctx.users[ctx.currentuserId].balance += parseInt(deposit);
    setShow(false);
  }    

  function clearForm(){
    setDeposit('');
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
      bgcolor="warning"
      header="Deposit"
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
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? (  
              <>
              <div> Balance of User:  </div>
              <input type="text" className="form-control" id="deposit" placeholder="Enter Deposit Amount" value={deposit}
               onChange={e => setDeposit(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-light" onClick={handleDeposit}>Deposit Amount</button>
              </>
            ):(
              <>
              <h5>Success</h5>

              <button type="submit" className="btn btn-light" onClick={clearForm}>Add more Money</button>
              </>
            )}
    />
  )
}