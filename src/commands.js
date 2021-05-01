export const parseJsonLocation = (args) => {
  if (args.length <= 2) {
    throw new Error('invalid number of arguments provided');
  }

  const configFile = args.pop();

  if (!configFile.includes('-config')) {
    throw new Error('invalid arguments provided');
  }

  return configFile.replace('-config=', '');
};
