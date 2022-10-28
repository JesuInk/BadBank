
function Balance(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [balance, setBalance  ] = React.useState('');

  const ctx = React.useContext(UserContext);

  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  function handleBalance(){
    console.log(balance);
    if (!validate(balance, 'balance')) return;
    
    // agregar balance a currentuser balance
    //ctx.users.push({name,email,password,balance:100});
    ctx.users[ctx.currentuserId].balance += parseInt(balance);
    setShow(false);
  }    

  function clearForm(){
    setBalance('');
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
      bgcolor="secondary"
      header="Balance"
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
      bgcolor="secondary"
      header="balance"
      status={status}
      body={
            <>
            <div> Balance of User:  {currentUser.name} </div>
            <p>{currentUser.balance}</p>
            </>
           }
    />
  )
}