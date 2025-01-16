export type ErrorDefinition = {
  matches: string[];
  message: string;
};

export type CustomErrorMapping = {
  [key: string]: ErrorDefinition;
};
