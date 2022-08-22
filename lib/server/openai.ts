import { Configuration } from 'openai';
import {
  ConfigurationParameters,
  CreateCompletionRequest,
  OpenAIApi,
} from 'openai';
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
interface openAiStructure {
  openAi: OpenAIApi;
  prompt: string;
  settings: CreateCompletionRequest;
}

class openAi {
  _prompt: string;
  _openAi: OpenAIApi;
  _settings: CreateCompletionRequest;
  constructor({ openAi, prompt, settings }: openAiStructure) {
    this._prompt = prompt;
    this._openAi = openAi;
    this._settings = settings;
  }
  _addExample(text: string) {
    this._prompt += `\n\n${text}`;
  }
  setSettings(settings: CreateCompletionRequest) {
    this._settings = settings;
  }

  async generate() {
    let settings = this._settings;
    settings.prompt = this._prompt;
    let generateCompletion = await this._openAi.createCompletion(
      this._settings,
    );
    return generateCompletion;
  }
}

export { openai, openAi };

/*
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
  model: "text-davinci-002",
  prompt: "This is a quote: \"Your time is limited, don't waste it living someone else's life.ø",
  temperature: 1,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  stop: ["\""],
});
*/
