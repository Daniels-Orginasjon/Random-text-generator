
import React, { useEffect, useState } from 'react'
import { ResponseData } from '../pages/api/openai/quotes';
let WEB_URL = "http://localhost:3000/"

function quotes() {
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
    <div>
      <p>{quote}</p>
      <button onClick={handleClick} className="bg-indigo-500 disabled:bg-slate-200 disabled:cursor-wait" disabled={loading}>
        wwww
      </button>
    </div>
  )
}

export default quotes