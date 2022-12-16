import React, { useState, useEffect } from "react";
import "../styles/PokemonList.css";

export default function PokemonList() {
  
  const [listOfPokemon, setListOfPokemon] = useState([{ index: 0, pokemon: "Pikachu" }])
  const [searchInputBox, setInput] = useState("")
  
  // async function loadData() {
  //   const response = await fetch("http://localhost:8000/names")
  //   //const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
  //   const data = await response.json()
  //   console.log(data)
  //   setListOfPokemon(data)
  // }

  async function submitForm(e) {
    e.preventDefault()
    console.log(e)
    const response = await fetch(`http://localhost:8000/names?number_to_search=${searchInputBox}`);
    const data = await response.json();
    console.log(data)
    setListOfPokemon(data)
  }

  async function changeInputBox(e) {
    const { name, value } = e.target
    console.log(value)
    setInput(value)
  }

  return (
    <div align="center">
      <form onSubmit={(e) => submitForm(e)}>
        <input value={searchInputBox} className=" text-black " placeholder="How many Pokemon do you want to list, starting from #1?" onChange={(e) => changeInputBox(e)} />
        <span className="px-2"></span>
        <button className="bg-blue-500 hover:bg-blue-800 hover:underline rounded px-4 py-2" type="submit">Show Pokemon</button>
      </form>
      {listOfPokemon.length == 0 ? <b>No Pokemon Shown yet.</b> :
      <h1>Here is the first {searchInputBox} Pokemon in the Pokedex<br></br></h1>}      
      {/* This is how to do a list in Javascript */}
      {/* <ul>
        {listOfPokemon?.map((pokemon, index) => (
          <li key={index}>
            #{pokemon.pokedex_number} | {pokemon.name}
          </li>
        ))}
      </ul> */}
      <table style={{ "textAlign": "center" }}>
        <thead>
          <tr>
            <th>Pokedex No#</th>
            <th>Name</th>
            <th>German Name</th>
            <th>Japanese Name</th>
          </tr>
        </thead>
        <tbody>
          {listOfPokemon?.map((pokemon, index) => (
            <tr key={index}>
              <td>{pokemon.pokedex_number}</td>
              <td>{pokemon.name}</td>
              <td>{pokemon.german_name}</td>
              <td>{pokemon.japanese_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// {listOfPokemon.map((pokemon, idx) => {
//   return <li key={idx}><a href={pokemon.url}>{pokemon.name}</a></li>
// })}