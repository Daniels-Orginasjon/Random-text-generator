// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { openai, openAi } from '../../../lib/server/openai';
import { CreateCompletionResponse } from 'openai';
import fs from 'fs';
import { ResponseData } from '../../../types/apiresponse';
import { handler } from '../../../middleware/handler';
let quotes = JSON.parse(fs.readFileSync('./public/quotes.json', 'utf-8'));

interface PromptApiRequest extends NextApiRequest {
  query: {
    category: string;
  };
}

const shuffleArray = (arr: any[]) => arr.sort(() => 0.5 - Math.random());

handler.get(
  async (req: PromptApiRequest, res: NextApiResponse<ResponseData>) => {
    let category = req.query.category;
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
    let _quotes = shuffleArray(quotes).slice(0, 5);
    for (let o of _quotes) {
      ai._addExample(`This is a quote: "${o}"`);
    }
    ai._addExample(`Create a ${category} quote`);
    ai._addExample('This is a quote: "');

    let call = await ai.generate();
    res.status(200).json({ response: call.data });
  },
);

export default handler;
