import React, { useEffect, useState } from 'react'
import { ResponseData } from '../pages/api/openai/quotes';
let WEB_URL = "http://localhost:3000/"

function Quotes() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (loading === true) return false;
    setLoading(true);

    fetch(WEB_URL + "api/openai/quotes")
      .then((res) => 
        res.json()
    )
      .then((data: ResponseData) => {
        if (data.response.choices !== undefined && data.response.choices.length > 0 && typeof data.response.choices[0].text === "string") {
          setQuote(data.response.choices[0].text)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
    })
  }

  return (
    <div className='container mx-auto border mt-5 h-96 border-zinc-700'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='text-center py-32'>
          <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-slate-200 disabled:cursor-wait" disabled={loading}>
          Generate random quote
          </button>
          <h1 className='py-12 text-xl'>{quote}</h1>
        </div>
        <div>
          <h1 className='text-center'>The other side</h1>
        </div>
      </div>
    </div>
  )
}

export default Quotes