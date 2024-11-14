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
  const [fullName, setFullname] = useState("");
  const [nameValid, setNameValid] = useState(false)
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false)
  const [formSubmitFailure, setFormSubmitFailure] = useState(false)
  const [pizzaSizeSelected, setPizzaSizeSelected] = useState("")
  const [pizzaSizeValid, setpizzaSizeValid] = useState(false)

// function handleSubmitClick()
const handleSubmitClick = (event) => {
  event.preventDefault(); // Prevent default form submission
  let size = pizzaSizeSelected
  let toppings = [1, 2, 3]
  axios.post('http://localhost:9009/api/order', { fullName, size})
    .then(response => {
      console.log('Success:', response.data);
      setFormSubmitSuccess(true);
      setFormSubmitFailure(false);
    })
    .catch(error => {
      console.error('Error:', error);
      setFormSubmitSuccess(false);
      setFormSubmitFailure(true);
    });
};

function IsFullNameValid(props) {
  const fullNameLength = props.fullNameLength;
  if (fullNameLength > 20) {
    setNameValid(false);
    return <div className='error'>{validationErrors.fullNameTooLong}</div>;
  }  
  if (fullNameLength > 0 && fullNameLength < 3) {
    setNameValid(false);
    return <div className='error'>{validationErrors.fullNameTooShort}</div>;
  }
  setNameValid(true);
  return "";
}

function IsPizzaSizeValid(props) {
  const pizzaSize = props.sizeSelection;
  if(pizzaSize === 'X') {
    setpizzaSizeValid(false);
    return <div className='error'>{validationErrors.sizeIncorrect}</div>;
  }
  setpizzaSizeValid(true);
  return <div></div>;
}

  return (
    <form onSubmit={handleSubmitClick}>
      <h2>Order Your Pizza</h2>
      
      {formSubmitSuccess && <div className='success'>Thank you for your order!</div>}
      {formSubmitFailure && <div className='failure'>Something went wrong</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input name="fullName" placeholder="Type full name" id="fullName" type="text" onChange={(e) => setFullname(e.target.value)}/>
        </div>
        <IsFullNameValid fullNameLength={fullName.length} />
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select name="size" id="size" onChange={(e) => setPizzaSizeSelected(e.target.value)}>
            <option key="X" value="X">----Choose Size----</option>
            {pizzasize.map((list)=> (
              <option key={list.pizzasize_id} value={list.pizzasize_id}>{list.text}</option>
            ))}
          </select>
        </div>
        <IsPizzaSizeValid sizeSelection={pizzaSizeSelected} />   
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

      <input disabled={ (nameValid && pizzaSizeValid && fullName.length > 0 && pizzaSizeSelected !== '') ? false : true } type="submit" />
      
    </form>
  )
}