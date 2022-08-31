import { CreateCompletionResponse } from 'openai';

export type ResponseData = {
  response: CreateCompletionResponse;
};

export type ErrorResponse = {
  error: string;
};
