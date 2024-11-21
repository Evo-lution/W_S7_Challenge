import React, { useEffect, useState } from 'react'
import axios from 'axios'

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}
// typing this here just to get it to register my new commit
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

const inputElement = document.getElementById('myInput');

export default function Form() {
  const [fullName, setFullname] = useState("");
  const [nameValid, setNameValid] = useState(false)
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false)
  const [formSubmitFailure, setFormSubmitFailure] = useState(false)
  const [pizzaSizeSelected, setPizzaSizeSelected] = useState("")
  const [pizzaSizeValid, setpizzaSizeValid] = useState(false)
  const [selectedToppings, setSelectedToppings]= useState([])
  const [responseMessage, setResponseMessage]= useState([])

const handleCheckChange = (event) => {
  let tempSelectedToppings = selectedToppings;

  let item_id = event.target.name;
  let item_checked = event.target.checked === true;
  
  let index = tempSelectedToppings.indexOf(item_id);

  if (index > -1 && item_checked === false) { 
    tempSelectedToppings.splice(index, 1); 
  }

  if(index === -1 && item_checked === true) {
    tempSelectedToppings.push(item_id)
  }
  setSelectedToppings(tempSelectedToppings);
}

const handleSubmitClick = (event, submitted) => {
  event.preventDefault(); 
  let submitting = (nameValid && pizzaSizeValid && fullName.length > 0 && pizzaSizeSelected !== '') ? true : false;
  if(submitting){
    let size = pizzaSizeSelected
    let toppings = selectedToppings
    axios.post('http://localhost:9009/api/order', { fullName, size, toppings})
      .then(response => {
        console.log('Success:', response.data);
        setResponseMessage(response.data.message);
        setFormSubmitSuccess(true);
        setFormSubmitFailure(false);
        setFullname("");
        setNameValid(false);
        setPizzaSizeSelected("");
        setpizzaSizeValid(false);
        setSelectedToppings([]);
        document.querySelectorAll("input[type='checkbox']:checked").forEach((element) => {
          element.click();});
      })
      .catch(error => {
        console.error('Error:', error);
        setFormSubmitSuccess(false);
        setFormSubmitFailure(true);
      });
  }
};

function IsFullNameValid(props) {
  const removeExtraSpace = (s) => s.trim().split(/ +/).join(' ');
  const theFullName = removeExtraSpace(props.enteredFullName);
  const fullNameLength = theFullName.length

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
  if(pizzaSize === 'S' || pizzaSize === 'M' || pizzaSize === 'L') {
    setpizzaSizeValid(true);
    return <div></div>;
  }
  setpizzaSizeValid(false);
  return <div className='error'>{validationErrors.sizeIncorrect}</div>;
}

  return (
    <form onSubmit={handleSubmitClick}>
      <h2>Order Your Pizza</h2>
      
      {formSubmitSuccess && <div className='success'>{responseMessage}</div>}
      {formSubmitFailure && <div className='failure'>Something went wrong</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input id="fullName" value={fullName} placeholder="Type full name" type="text" onChange={(e) => setFullname(e.target.value)} />
        </div>
        <IsFullNameValid enteredFullName={fullName} />

      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select id="size" value={pizzaSizeSelected} onChange={(e) => setPizzaSizeSelected(e.target.value)} >
            <option value=''>----Choose Size----</option>
            {pizzasize.map((list)=> (
              <option value={list.pizzasize_id}>{list.text}</option>
            ))}
          </select>
        </div>
        <IsPizzaSizeValid sizeSelection={pizzaSizeSelected} />   
      </div>


      <div className="input-group">
        {
          toppings.map((list)=> (
            <label>
              <input name={list.topping_id} type="checkbox" onChange={handleCheckChange} />{list.text}<br />
            </label>
          ))
        }
      </div>

      <input disabled={ (nameValid && pizzaSizeValid && fullName.length > 0 && pizzaSizeSelected !== '') ? false : true } type="submit" />
      
    </form>
  )
}