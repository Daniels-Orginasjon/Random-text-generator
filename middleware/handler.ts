import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { ErrorResponse, ResponseData } from '../types/apiresponse';

export const handler = nextConnect({
  onError: (
    err,
    req: ResponseData,
    res: NextApiResponse<ErrorResponse>,
    next,
  ) => {
    console.log('err');
    res.status(500).json({ error: 'Server error' });
  },
  onNoMatch: (req: ResponseData, res: NextApiResponse) => {
    res.status(404).send('Not found!');
  },
});
