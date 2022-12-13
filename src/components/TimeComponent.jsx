import React, { useState, useEffect } from 'react'

export default function TimeComponent() {
  const [time, setTime] = useState('No Time Yet');

  const loadData = async () => {
    try {
      let response = await fetch('http://worldtimeapi.org/api/timezone/Pacific/Auckland');
      const json = await response.json();
      const newTime = json['unixtime'];
      setTime(newTime);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    //const timer = setTimeout(loadData, 1000)
    //return () => clearTimeout(timer)
    const timer = setInterval(() => loadData(), 1000)
    return () => clearInterval(timer)
  }, [])


  return (
    <div>
      {/* <button onClick={loadData}>Load data</button> */}
      <button onClick={() => setTimeout(loadData, 1000)}>Start Time</button>
      <h2>Time: {time}</h2>
    </div>
  );
}