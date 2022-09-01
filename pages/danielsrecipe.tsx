import { openai, openAi } from '../lib/server/openai';
import React, { useState } from 'react';
import { ResponseData } from './api/openai/recipeDaniel';
import { toast } from 'react-toastify';
let WEB_URL = 'http://localhost:3000/';

export default function Danielsquote() {
  const [generatedLines, setGeneratedLines] = useState<string[]>([]);
  const [selectedGeneratedLine, setSelectedGeneratedLine] = useState<number>(0);
  const [availableIngredients, setAvailableIngredients] = useState<string[]>([
    'egg',
    'flour',
    'sugar',
    'milk',
  ]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchSelection, setSearchSelection] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
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
  const handleKeyPressUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchText('');
      if (searchResults[searchSelection]) {
        addNewIngredient(searchResults[searchSelection]);
      }
    }
  };
  const handleKeyPressDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      if (searchResults[searchSelection + 1]) {
        setSearchSelection(searchSelection + 1);
      } else {
        setSearchSelection(0);
      }
    }
    if (event.key === 'ArrowUp') {
      if (searchResults[searchSelection - 1]) {
        setSearchSelection(searchSelection - 1);
      } else {
        setSearchSelection(searchResults.length - 1);
      }
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

    if (!existsInArrayLowerCase(results, searchTerm))
      results.unshift(searchTerm);
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
    if (selectedIngredients.length === 0) {
      toast.error('No ingredient(s) selected...');
      return setError('No ingredient(s) selected...');
    }
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
    // <div className="w-screen bg-green-50">
    //   <div className="w-max float-left bg-red-300">left side</div>
    //   <div className="w-max float-right bg-blue-200">right side</div>
    // </div>
    <div className="w-screen">
      <div className=" h-52 w-max mb-10 w-">
        <div
          className="p-0  w-60 min-w-max m-auto block text-center self-center float-left
        "
        >
          {selectedIngredients.map((ingredient, i) => {
            return (
              <div
                key={i}
                className="w- cursor-pointer border content-center m-1 "
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

        <div className="w-60 float-right">
          <input
            className="border w-60 rounded text-center   m-1"
            placeholder={`Custom/search ingredient `}
            type={'text'}
            onInput={customInput}
            value={searchText}
            onKeyDown={handleKeyPressDown}
            onKeyUp={handleKeyPressUp}
          />

          <div className="relative">
            <div className="aboslute bg-white w-60 border border-gray-300 text-center rounded-lg flex flex-col text-sm py-2 px-2 text-gray-500 shadow-lg">
              {searchResults.map((result, id) => {
                let isSelected = id === searchSelection ? 'bg-blue-100' : '';
                return (
                  <div
                    className={'hover:bg-gray-200 mt-1 rounded ' + isSelected}
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
      </div>
      <div className="mt-20 float-right text-center w-screen">
        {error !== '' && (
          <div className="text-red-500">
            <label>{error}</label>
          </div>
        )}
        {generatedLines.reverse()[selectedGeneratedLine - 1] !== undefined && (
          <button
            onClick={() => {
              setSelectedGeneratedLine(selectedGeneratedLine - 1);
            }}
            className={
              'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-slate-200 disabled:cursor-wait '
            }
            disabled={loading}
          >
            prev
          </button>
        )}
        <button
          onClick={generateRecipe}
          className={
            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-5 disabled:bg-slate-200 disabled:cursor-wait '
          }
          disabled={loading}
        >
          Generate
        </button>
        {generatedLines.reverse()[selectedGeneratedLine + 1] !== undefined && (
          <button
            onClick={() => {
              setSelectedGeneratedLine(selectedGeneratedLine + 1);
            }}
            className={
              'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-slate-200 disabled:cursor-wait '
            }
            disabled={loading}
          >
            next
          </button>
        )}
        <div className="whitespace-pre-wrap text-center ">
          {generatedLines.reverse()[selectedGeneratedLine]}
        </div>
      </div>
    </div>
  );
}
