import React, {  useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { ErrorResponse, ResponseData } from '../types/apiresponse';

let WEB_URL = "http://localhost:3000/"
function Quotes() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [quotesArray, setQuotesArray] = useState<string[]>([]);
  const [category, setCategory] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let selected = event.target.value;
    setCategory(selected);
  }

  const handleClick = () => {
    if (loading === true) return false;
    setLoading(true);

    let WEB_URL_CAT = new URL(WEB_URL + "api/openai/quotes")
    WEB_URL_CAT.searchParams.append("category", category)

    fetch(WEB_URL_CAT.href)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res.json();
      }
    )
      .then((data: ResponseData) => {
        if (data.response.choices !== undefined && data.response.choices.length > 0 && typeof data.response.choices[0].text === "string") {
          setQuote(data.response.choices[0].text)
          setQuotesArray([...quotesArray, data.response.choices[0].text])
          
        }
        setLoading(false)
      })
      .catch(async (err: Promise<ErrorResponse>) => {
        let error = await err;
        toast.error(error.error);
        setLoading(false);
      })

  }

  return (
    <div className='container mx-auto border mt-5 h-auto border-zinc-700'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='grid grid-flow-row-dense mt-2 grid-cols-3 grid-rows-3'>
          <div className='border col-span-2 text-center'>
            <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-slate-200 disabled:cursor-wait" disabled={loading}>
              Generate random quote
            </button>
          </div>
          <div className='border'>
            <select id="countries" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>Choose a category</option>
              <option value="inspired">Inspired</option>
              <option value="emotional">Emotional</option>
              <option value="random">Random</option>
              <option value="funny">Funny</option>
            </select>
          </div>
          <div className='border col-span-3 text-center'>
            <h1 className='text-xl'>{quote}</h1>
          </div>
        </div>
        <div>
          <div className='text-center'>{quotesArray.map((item, i) => {
            return <h1 key={i}>{item}</h1>
          })}</div>
        </div>
      </div>
    </div>
  )
}

export default Quotes