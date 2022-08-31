// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { openai, openAi } from '../../../lib/server/openai';
import { CreateCompletionResponse } from 'openai';
import nc from 'next-connect';
import { ErrorResponse, ResponseData } from '../../../types/apiresponse';

interface PromptApiRequest extends NextApiRequest {
  query: {
    prompt: string;
  };
}
const shuffleArray = (arr: any[]) => arr.sort(() => 0.5 - Math.random());

const handler = nc({
  onError: (
    err,
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponse>,
    next,
  ) => {
    res.status(500).json({ error: 'Server Error' });
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

    ai._addExample(
      'Create a random recipe with ingredients, and give instructions for it.',
    );

    let call = await ai.generate();
    res.status(200).json({ response: call.data });
  },
);

export default handler;
