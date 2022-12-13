import React, {useState, useEffect} from "react";

export default function MyList(props) {
  //let color = props["color"]
  //const name = props.name
  const { color, children } = props
  const [ name, setName ] = useState("notset")
  //let name = "Anuj"
  async function loadData() {
    let response = await fetch("http://127.0.0.1:8000/home")
    let data = await response.json()
    console.log(data)
    setName(data.name)
  }

  useEffect(() => {
    loadData()
  }, [])
  return (
    <div>
      <h1 style={{ color: color }}>This is {name} list:</h1>
      <button onClick={loadData}>My Button</button>
      <ul>
        <li>Ohiyo</li>
        <li>Konichiwa</li>
        <li>Lets goooo</li>
      </ul>
      This is the children value: {children}
    </div>
  )
}

