// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { openai, openAi } from '../../../lib/server/openai';
import { CreateCompletionResponse } from 'openai';
import nc from 'next-connect';

export type ResponseData = {
  response?: CreateCompletionResponse;
  error?: string;
};

interface PromptApiRequest extends NextApiRequest {
  query: {
    prompt: string;
    ingredient: string[] | string;
  };
}
const shuffleArray = (arr: any[]) => arr.sort(() => 0.5 - Math.random());

const handler = nc({
  onError: (err, req: NextApiRequest, res: NextApiResponse, next) => {
    res.status(500).send('Server error');
  },
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    res.status(404).send('Not found!');
  },
});

handler.get(
  async (req: PromptApiRequest, res: NextApiResponse<ResponseData>) => {
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
    if (!req.query.ingredient)
      return res.status(200).json({ error: 'No ingredients selected' });
    let ingridentsQuery = req.query.ingredient;
    let ingredients: string[] =
      typeof ingridentsQuery === 'string' ? [ingridentsQuery] : ingridentsQuery;

    let ingredientsAsString = ingredients
      .map((ingredient, i, a) =>
        a.length - 1 === i && a.length !== 1 ? `and ${ingredient}` : ingredient,
      )
      .join(', ');
    console.log(ingredientsAsString);
    ai._addExample(
      `Create a random recipe that includes the ingredients ${ingredientsAsString}:`,
    );
    console.log(ai._prompt);
    //let call = await ai.generate();
    //res.status(200).json({ response: call.data });
  },
);

export default handler;
