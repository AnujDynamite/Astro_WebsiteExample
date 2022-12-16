import React, { useState, useEffect } from 'react'

export default function AbilityComponent() {
  const [listOfAbility, setAbility] = useState([{ index: 0, pokemon: "Pikachu" }])
  const [abilityInputBox, setInput] = useState("")

  // The submitForm function will fetch all Pokemon with the ability inputted via the abilityInputBox variable
  // The string in fetch(`${}`) is surrounded by tilde (``), NOT single/double quote marks('')/("")
  // e.preventDefault() function fixes an issue where cached values are used, make sure to Ctrl+F5 to refresh
  // without the cached data.
  async function submitForm(e) {
    e.preventDefault()
    console.log(e)
    const response = await fetch(`http://localhost:8000/abilities?ability_name=${abilityInputBox}`);
    const data = await response.json();
    console.log(data)
    setAbility(data);
  }

  // This function will update the text box as each letter is inputted, taking an event(e) as a function variable.
  async function changeInputBox(e) {
    const { name, value } = e.target
    console.log(value)
    setInput(value)
  }

  return (
    <div align="center">
      {/* Form is used to display a text box to type/input something in. onSubmit will send the input into a function.
      <input /> is where you input the string itself into on the website, placeholder is a default text in the text box
      when the website is first loaded. In this case I have chosen to link the form to 'button type="submit"'
      The (e) represents an event that should take place (further clarification needed) */}
      <form onSubmit={(e) => submitForm(e)}>
        <input value={abilityInputBox} className=" text-black " placeholder="Set Ability Here..." onChange={(e) => changeInputBox(e)} />
        <span className='px-2'></span>
        <button className='bg-blue-500 hover:bg-blue-800 hover:underline rounded px-4 py-2' type="submit">Show Ability</button>
      </form>
      {/* Here we check my database if there are any Pokemon with the ability that was typed into the text box.
      Left side of the : is true, while right side of the : is false, in which case all pokemon in the database with
      the ability typed in the text box will be displayed on the website when the Show Ability button is clicked.
      The resulting data is shown in a table format here */}
      {listOfAbility.length == 0 ? <b>No Ability by that name...</b> : <b>Pokemon with {abilityInputBox}</b>}
      <table style={{ "textAlign": "center" }}>
        <thead>
          <tr>
            <th>Pokedex No#</th>
            <th>Name</th>
            <th>First Ability</th>
            <th>Second Ability</th>
            <th>Hidden Ability</th>
          </tr>
        </thead>
        <tbody>
          {listOfAbility?.map((pokemon, index) => (
            <tr key={index}>
              <td>{pokemon.pokedex_number}</td>
              <td>{pokemon.name}</td>
              <td>{pokemon.ability_1}</td>
              <td>{pokemon.ability_2}</td>
              <td>{pokemon.hidden_ability}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* The resulting data is shown in an unordered list format here. */}
      {/* <ul>
        {listOfAbility?.map((pokemon, index) => (
          <li key={index}>
            #{pokemon.pokedex_number} | {pokemon.name} | {pokemon.ability_1} | 
            {pokemon.ability_2} | {pokemon.hidden_ability}
          </li>
        ))}
      </ul> */}
    </div>
  );
}