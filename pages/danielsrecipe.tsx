import { openai, openAi } from '../lib/server/openai';
import React, { useState } from 'react';
import { ResponseData } from './api/openai/recipeDaniel';
let WEB_URL = 'http://localhost:3000/';

export default function Danielsquote() {
  const [generatedLines, setGeneratedLines] = useState<string[]>([]);
  const [availableIngredients, setAvailableIngredients] = useState<string[]>([
    'egg',
    'flour',
    'sugar',
    'milk',
  ]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  let selectableIngredients = availableIngredients.filter(
    (ingredient) => !selectedIngredients.includes(ingredient),
  );
  const removeThis = (id: number): void => {
    setSelectedIngredients((prevArr): string[] => {
      let newArr = [...prevArr];
      if (newArr.length > id) {
        let old = newArr.splice(id, 1);
        return newArr;
      }
      return newArr;
    });
  };
  const addIngredient = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void | boolean => {
    setSelectedIngredient(event.target.value);
    const selected: string = event.target.value;
    if (selected === 'none') return false;
    setSelectedIngredients([...selectedIngredients, selected]);
    setSelectedIngredient('none');
  };
  const generateQuote = (): void | boolean => {
    if (loading === true) return false;
    const apiUrl = new URL(WEB_URL + 'api/openai/recipeDaniel');
    if (selectedIngredients.length === 0)
      return setError('No ingredient(s) selected...');
    setLoading(true);

    for (let o of selectedIngredients) {
      apiUrl.searchParams.append('ingredient', o);
    }

    fetch(apiUrl.href)
      .then((res) => res.json())
      .then((data: ResponseData) => {
        if (
          data.response &&
          data.response.choices !== undefined &&
          data.response.choices.length > 0 &&
          typeof data.response.choices[0].text === 'string'
        ) {
          setGeneratedLines([...generatedLines, data.response.choices[0].text]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="m-auto w-max">
      <div className="m-0 w-52 h-52">
        <div className="p-0 min-w-max m-0 block text-center self-center">
          {selectedIngredients.map((ingredient, i) => {
            return (
              <div
                key={i}
                className="w-auto cursor-pointer border content-center m-1"
              >
                <label
                  className=" cursor-pointer
                   "
                  htmlFor={String(i)}
                >
                  {ingredient}
                </label>
                <button
                  className="text-red-600 cursor-pointer float-right w-5 "
                  id={String(i)}
                  onClick={() => {
                    removeThis(i);
                  }}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
        {selectableIngredients.length > 0 && (
          <select value={selectedIngredient} onChange={addIngredient}>
            <option value="none">Select a ingredient!</option>
            {selectableIngredients
              .filter((ingredient) => !selectedIngredients.includes(ingredient))
              .map((ingredient, i) => {
                return (
                  <option key={i} value={ingredient}>
                    {ingredient}
                  </option>
                );
              })}
          </select>
        )}
      </div>
      <div className="mt-10">
        {error !== '' && (
          <div className="text-red-500">
            <label>{error}</label>
          </div>
        )}
        <button
          onClick={generateQuote}
          className={
            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-slate-200 disabled:cursor-wait '
          }
          disabled={loading}
        >
          Generate
        </button>
      </div>
    </div>
  );
}
