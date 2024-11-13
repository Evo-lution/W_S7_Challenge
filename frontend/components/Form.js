import React, { useEffect, useState } from 'react'

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}
// 👇 Here you will create your schema.
// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]

const pizzasize = [
  { pizzasize_id: 'S', text: 'Small' },
  { pizzasize_id: 'M', text: 'Medium' },
  { pizzasize_id: 'L', text: 'Large' },
]

export default function Form() {
  const [validationErrors, setValidationErrors] = useState(false)
  const [formReadyForSubmit, setFormReadyForSubmit] = useState(false)
  const [fullname, setFullname] = useState("");
  const [pizzaSizeSelection, setPizzaSize] = useState("X")

function handleSubmitClick()

{
  //useEffect(() => { setFormSubmitted(true) }, false)
}



function IsFullNameValid(props) {
  const fullnameLength = props.fullnameLength;
  if (fullnameLength > 20) {
    setValidationErrors(true);
    return <div className='error'>{validationErrors.fullNameTooLong}654</div>;
  }  

  if (fullnameLength > 0 && fullnameLength < 3) {
    setValidationErrors(true);
    return <div className='error'>{validationErrors.fullNameTooShort}123</div>;
  }
  return "";
}

function IsPizzaSizeValid(props) {
  const pizzaSize = props.pizzaSizeSelection;
  if(pizzaSize === 'X') {
    setPizzaSize(pizzaSize);
    return <div className='error'>{validationErrors.sizeIncorrect}booh!</div>;
  }
  setPizzaSize(pizzaSize);
  return <div className='error'>yeah!</div>;
}

  return (
    <form method='post' action='www.programiz.com/user'>

      <h2>Order Your Pizza</h2>

      {!validationErrors && formReadyForSubmit && <div className='success'>Thank you for your order!</div>}
      {validationErrors && formReadyForSubmit && <div className='failure'>Something went wrong</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input name="fullname" placeholder="Type full name" id="fullName" type="text" onChange={(e) => setFullname(e.target.value)}/>
        </div>
        <IsFullNameValid fullnameLength={fullname.length} />
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select name="size" id="size" onChange={(e) => setPizzaSize(e.target.value)}>
            <option key="X" value="X">----Choose Size----</option>
            {pizzasize.map((list)=> (
              <option key={list.pizzasize_id} value={list.pizzasize_id}>{list.text}</option>
            ))}
          </select>
        </div>
        <IsPizzaSizeValid pizzaSizeSelection={pizzaSizeSelection} />   
      </div>

      <div className="input-group">
        {
          toppings.map((list)=> (
            <label key={list.topping_id}>
              <input name={list.text} id={list.text} type="checkbox" />{list.text}<br />
            </label>
          ))
        }
      </div>

      {fullname.length} {pizzaSizeSelection}

      <input disabled={ (fullname.length > 2 && fullname.length < 20) ? false : true } type="submit" onClick={handleSubmitClick()}/>
    </form>
  )
}