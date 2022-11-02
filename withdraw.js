

function Withdraw(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [withdraw, setWithdraw  ] = React.useState('');
  const [clickable, setClickable  ] = React.useState('');

  const ctx = React.useContext(UserContext);

  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      if (isNaN(field)) {
        setStatus('Not a Number, enter valid number: ' + field);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      if (field<0) {
        setStatus('Enter positive withdrawal amount: ' + field);
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
    setClickable(false);
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
      header="Withdraw"
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
      header="Withdraw"
      status={status}
      body={show ? (  
              <>
              <div> Balance:    {currentUser.balance} </div>
              <input type="text" className="form-control" id="withdraw" placeholder="Enter withdraw Amount" value={withdraw}
               onChange={e => {setWithdraw(e.currentTarget.value); setClickable(true);}}/><br/>
              <button type="submit" className="btn btn-light" onClick={handleWithdraw}
               disabled={!clickable}>Withdraw Amount</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <div> New Balance:   {currentUser.balance} </div>

              <button type="submit" className="btn btn-light" onClick={clearForm}>Withdraw more Money</button>
              </>
            )}
    />
  )
}