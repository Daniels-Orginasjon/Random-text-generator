// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { openai, openAi } from '../../../lib/server/openai';
import { CreateCompletionResponse } from 'openai';
import fs from 'fs';
let quotes = JSON.parse(fs.readFileSync('./public/quotes.json', 'utf-8'));
console.log(quotes);
type Data = {
  response: CreateCompletionResponse;
};

interface PromptApiRequest extends NextApiRequest {
  query: {
    prompt: string;
  };
}
const shuffleArray = (arr: any[]) => arr.sort(() => 0.5 - Math.random());

export default async function handler(
  req: PromptApiRequest,
  res: NextApiResponse<Data>,
) {
  let ai = new openAi({
    openAi: openai,
    prompt: '',
    settings: {
      model: 'text-davinci-002',
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ['"'],
    },
  });
  let _quotes = shuffleArray(quotes).slice(0, 10);
  for (let o of _quotes) {
    ai._addExample(`This is a quote: "${o}"`);
  }
  ai._addExample('This is a quote: "');
  let call = await ai.generate();
  console.log(call);
}
