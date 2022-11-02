/*
function AllData(){
  const ctx = React.useContext(UserContext);
  return (
    <>
    <h5>All Data in Store</h5>
    {JSON.stringify(ctx)}<br/>
    </>
  );
}
*/

function AllData(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [balance, setBalance  ] = React.useState('');

  const ctx = React.useContext(UserContext);

  let currentUser = null;
  if (ctx.currentuserId != null) {
    currentUser = ctx.users[ctx.currentuserId];
  }
  console.log(currentUser, ctx.currentuserId);

  if (currentUser === null){
    return (
      <Card
      bgcolor="secondary"
      header="Non-Existent User"
      status={status}
      body={ 
            <>
              <div> Need to Login First </div>
            </>
        }
      />
    )
  }
//    ctx.users.forEach(currentUser => {

  return (
    <Card
      bgcolor="secondary"
      header="balance"
      status={status}
      body={
            <>
            <div> Balance of User:  {currentUser.name} </div>
            <p>{currentUser.balance}</p>
            <p>{currentUser.email}</p>
            <p>{currentUser.password}</p>
            </>
           }
    />
  )
}
