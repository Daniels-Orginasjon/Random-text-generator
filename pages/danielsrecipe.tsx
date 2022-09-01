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
  const [recentChange, setRecentChange] = useState<number>(-1);
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [hidableContent, setHidableContent] = useState<boolean>(true);
  let selectableIngredients = availableIngredients.filter(
    (ingredient) => !selectedIngredients.includes(ingredient),
  );
  const removeThis = (id: number): void => {
    setSelectedIngredients((prevArr): string[] => {
      let newArr = [...prevArr];
      if (newArr.length > id) {
        newArr.splice(id, 1);

        return newArr;
      }
      return newArr;
    });
  };

  let existsInArrayLowerCase = (arr1: any[], aString: string): boolean =>
    arr1.find((n) => n.toLowerCase() === aString.toLowerCase()) !== undefined;

  const addNewIngredient = (ingredient: string): void => {
    ingredient = ingredient.toLowerCase();
    if (
      existsInArrayLowerCase(selectedIngredients, ingredient) ||
      ingredient === ''
    )
      return;
    if (existsInArrayLowerCase(availableIngredients, ingredient)) {
      setSelectedIngredients((prevArr): string[] => {
        let newArr = [...prevArr];
        newArr.push(ingredient);
        return newArr;
      });
      setSearchText('');
      search('');
    } else {
      setAvailableIngredients((prevArr): string[] => {
        let newArr = [...prevArr];
        newArr.push(ingredient);
        return newArr;
      });

      setSelectedIngredients((prevArr): string[] => {
        let newArr = [...prevArr];
        newArr.push(ingredient);
        return newArr;
      });
    }
  };
  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchText('');
      addNewIngredient(event.currentTarget.value);
    }
  };
  const search = (searchTerm: string) => {
    let results = availableIngredients
      .filter((ingredient: string) => {
        return ingredient.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .filter((ingredient: string) => {
        return !selectedIngredients.includes(ingredient);
      });
    setSearchResults(results);
    return false;
  };
  const customInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void | boolean => {
    setSearchText(event.target.value);
    search(event.target.value);
  };
  const generateRecipe = (): void | boolean => {
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

        <input
          className="border w-auto   m-1"
          placeholder={`Custom/search ingredient `}
          type={'text'}
          onInput={customInput}
          value={searchText}
          onKeyUp={handleEnterPress}
        />
        <div>
          {searchText.length > 0 && <p>Search results for {searchText}:</p>}
          <div>
            {searchResults.map((result, id) => {
              return (
                <div
                  onClick={() => {
                    addNewIngredient(result);
                  }}
                  key={id}
                >
                  {result}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-10">
        {error !== '' && (
          <div className="text-red-500">
            <label>{error}</label>
          </div>
        )}
        <button
          onClick={generateRecipe}
          className={
            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-slate-200 disabled:cursor-wait '
          }
          disabled={loading}
        >
          Generate
        </button>
        <div className="whitespace-pre-wrap">{generatedLines.reverse()[0]}</div>

        {generatedLines.length > 1 && (
          <div className="mt-20">
            {!hidableContent && (
              <div>
                {generatedLines.slice(1).map((line, i) => {
                  return (
                    <div key={i} className="whitespace-pre-wrap">
                      {line}
                    </div>
                  );
                })}
              </div>
            )}
            <button
              onClick={() => {
                setHidableContent(!hidableContent);
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-4 min-w-full rounded"
            >
              {hidableContent && <p>Show</p>}
              {!hidableContent && <p>hide</p>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
