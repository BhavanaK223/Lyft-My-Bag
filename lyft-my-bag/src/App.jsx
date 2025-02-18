import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState('');
  
  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/data')
        .then(response => response.json())
        .then(data => setData(data.message))
        .catch(error => console.error('Error fetching data:', error));
}, []);

  return (
    <>
      <h1>Welcome to LyftMyBag</h1>
      <h2>Please Log in with your Gatorlink credentials</h2>

      Hello my name is Savannah

      <img src="https://www.shutterstock.com/image-vector/cute-crocodile-business-holding-suitcase-600nw-2223279211.jpg" 
          width="200"
          height="200"/>

      <form>
          <label htmlFor="fname">Gatorlink Username:</label><br />
          <input type="text" id="fname" name="fname" /><br />
          <label htmlFor="lname">Password:</label><br />
          <input type="text" id="lname" name="lname" /><br />
          <input type="submit" value="Login" />
      </form>
    </>
  )
}

export default App
