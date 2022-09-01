// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { openai, openAi } from '../../../lib/server/openai';
import { CreateCompletionResponse } from 'openai';
import { ResponseData } from '../../../types/apiresponse';
import { handler } from '../../../middleware/handler';

interface PromptApiRequest extends NextApiRequest {
  query: {
    prompt: string;
  };
}
const shuffleArray = (arr: any[]) => arr.sort(() => 0.5 - Math.random());

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
