import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { ErrorResponse, ResponseData } from '../types/apiresponse';
let WEB_URL = "http://localhost:3000/"


export default function Pickup() {
    const [pickup, setPickup] = useState("");
    const [loading, setLoading] = useState(false);
    const [pickupArray, setPickupArray] = useState<string[]>([]);
    const handleClick = () => {
          if (loading === true) return false;
        setLoading(true);
        
          fetch(WEB_URL + "api/openai/pickups")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res.json();
      }
    )
      .then((data: ResponseData) => {
        if (data.response.choices !== undefined && data.response.choices.length > 0 && typeof data.response.choices[0].text === "string") {
          setPickup(data.response.choices[0].text)
          setPickupArray([...pickupArray, data.response.choices[0].text])
          
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
    <div className='container mx-auto border mt-5 min-h-96 border-zinc-700'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='text-center py-32'>
          <button disabled={loading} onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-slate-200 disabled:cursor-wait" >
          Generate Picup-Line
          </button>
            <div className='py-12 text-xl'>{pickup}</div>
        </div>
        <div>
            <div className='text-center'>{pickupArray.map((item, i) => {
            return <h1 key={i}>{item}</h1>
          })}</div>
        </div>
      </div>
    </div>
    )
}