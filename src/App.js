import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [loading, setLoading] = useState(true);
  const [coins , setCoins] = useState([]);
  const [cost, setCost] = useState(1);
  const [input, setInput] = useState(1);
  const [result, setResult] =useState(1);
  useEffect(() => {
      async function fetchData (){
        const response = await fetch("https://api.coinpaprika.com/v1/tickers?limit=10");
        const coinsData = await response.json();
        setCoins(coinsData);
        setLoading(false);
         }
        fetchData();
      }
  ,[]);
     
  const onChanage = (e)=>{
    console.dir(e.target.value);
    setCost(e.target.value);
    console.log(cost);

    
  }
  const handleInputChange = (e)=>{
    setInput(e.target.value)
    console.log(input);
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    setResult(input / cost);
    
    
  }

  return(
    <div>
      <h1> The Coins</h1>

      {loading ? <strong> Loading....</strong> :
        <select onChange={onChanage}>
          <option> select Coin</option>
          {
            coins.map((coin)=>(
              <option
              key={coin.symbol} 
              value={coin.quotes.USD.price}                 
              >
                {coin.name}({coin.symbol}) : ${coin.quotes.USD.price} USD
              </option>
            ))
          }
        </select>

      }

      <form onSubmit={handleSubmit}>
        <input
          type='number'
          value={input}
          placeholder='dollor'
          onChange={handleInputChange}
          />
        <input
        type='submit'/>

      </form>

      <h2>코인은 ? {result}</h2>

      
      
     
    
    
    </div> 
  )
    }

export default App;
