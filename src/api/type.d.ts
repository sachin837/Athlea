type APIerrorsResponse = {
  message: string;
  path?: string;
  __typename?: string;
  validation?: string;
};

export type ReturnResponse<T> = T;

export type OpenAIResponse = {
  id: string;
  model: string;
  object: string;
  created: number;
  choices: [
    {
      message: {
        role: string;
        content: string;
      };
      index: number;
      logprobs: any; // Replace 'any' with a more specific type if needed
      finish_reason: string;
    },
  ];
};
