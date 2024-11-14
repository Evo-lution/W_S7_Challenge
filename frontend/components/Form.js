import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
  const [fullname, setFullname] = useState("");
  const [nameValid, setNameValid] = useState(false)
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false)
  const [formSubmitFailure, setFormSubmitFailure] = useState(false)
  const [pizzaSizeSelection, setPizzaSize] = useState("")
  const [pizzaSizeValid, setpizzaSizeValid] = useState(false)
  const [readyRun, setreadyRun] = useState(false)

// function handleSubmitClick()
const handleSubmitClick = async () => {

  event.preventDefault();

// call endpoint using axios
if (readyRun != true) {
  return
}
// if success then
//useEffect(() => { setFormSubmitSuccess(true) }, false);
//useEffect(() => { setFormSubmitFailure(false) }, true);  

// if fail then
//useEffect(() => { setFormSubmitFailure(true) }, false);
//useEffect(() => { setFormSubmitSuccess(false) }, true);  

const {data} = await axios.post('http://localhost:9009/api/order', {
  fullName: 'Fred',
  size: 'S',
  toppings: [1, 2],
}, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}
)

}

function IsFullNameValid(props) {
  const fullnameLength = props.fullnameLength;
  if (fullnameLength > 20) {
    setNameValid(false);
    return <div className='error'>{validationErrors.fullNameTooLong}</div>;
  }  
  if (fullnameLength > 0 && fullnameLength < 3) {
    setNameValid(false);
    return <div className='error'>{validationErrors.fullNameTooShort}</div>;
  }
  setNameValid(true);
  return "";
}

function IsPizzaSizeValid(props) {
  const pizzaSize = props.pizzaSizeSelection;
  if(pizzaSize === 'X') {
    setPizzaSize(pizzaSize);
    setpizzaSizeValid(false);
    return <div className='error'>{validationErrors.sizeIncorrect}</div>;
  }
  setPizzaSize(pizzaSize);
  setpizzaSizeValid(true);
  return <div></div>;
}

  return (
    <form method='post'>
      <h2>Order Your Pizza</h2>
      
      {formSubmitSuccess && <div className='success'>Thank you for your order!</div>}
      {formSubmitFailure && <div className='failure'>Something went wrong</div>}

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
            <label for="topping"  key={list.topping_id}>
              <input name={list.text} id={list.text} type="checkbox" />{list.text}<br />
            </label>
          ))
        }
      </div>

      <input disabled={ (nameValid && pizzaSizeValid && fullname.length > 0 && pizzaSizeSelection !== '') ? false : true } type="submit" onClick="handleSubmitClick()"/>
      
    </form>
  )
}