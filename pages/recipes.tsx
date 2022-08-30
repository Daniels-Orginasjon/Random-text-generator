import React, { useEffect, useState } from 'react';
import { ResponseData } from '../pages/api/openai/pickups';
let WEB_URL = "http://localhost:3000/"


export default function Recipes() {
    const [recipe, setRecipe] = useState("");
    const [loading, setLoading] = useState(false);
    //const [pickupArray, setPickupArray] = useState([]);
    const handleClick = () => {
          if (loading === true) return false;
        setLoading(true);
        
          fetch(WEB_URL + "api/openai/recipes")
      .then((res) => 
        res.json()
    )
      .then((data: ResponseData) => {
          if (data.response.choices !== undefined && data.response.choices.length > 0 && typeof data.response.choices[0].text === "string") {
          setRecipe(data.response.choices[0].text)
          //setPickupArray(pickupArray.concat(<h2>{data.response.choices[0].text}</h2>))
                    
          
        }
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })

      
    }
    return (
    <div className='container mx-auto border mt-5 min-h-96 border-zinc-700'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='text-center py-32'>
          <button disabled={loading} onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-slate-200 disabled:cursor-wait" >
          Generate Dish
          </button>
            {/* <div className='py-12 text-xl'>{pickup}</div> */}
        </div>
        <div>
            <div className='text-center whitespace-pre-wrap'><p>{recipe}</p></div>
        </div>
      </div>
    </div>
    )
}