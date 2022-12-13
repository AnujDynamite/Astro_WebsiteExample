import React, { useState, useEffect } from "react";

export default function PokemonList() {
  
  const [listOfPokemon, setListOfPokemon] = useState([{index:0, pokemon:"Pikachu"}])
  
  async function loadData() {
    const response = await fetch("http://localhost:8000/names")
    //const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
    const data = await response.json()
    console.log(data)
    setListOfPokemon(data)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <h1>Here is the first 100 Pokemon in the Pokedex</h1>
      <button onClick={loadData}>Load data</button>
      <ul>
        {listOfPokemon?.map((pokemon, index) => (
          <li key={index}>
            #{pokemon.pokedex_number} | {pokemon.name}
          </li>
        ))}
        {/* This is how to do a list in Javascript */}
      </ul>
    </>
  )
}

// {listOfPokemon.map((pokemon, idx) => {
//   return <li key={idx}><a href={pokemon.url}>{pokemon.name}</a></li>
// })}