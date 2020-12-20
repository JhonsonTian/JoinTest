import Constants from 'expo-constants';

type Environment = {
  envName: string;
  baseUrl: string;
};

export const getEnvironment = () => {
  let releaseChannel = Constants.manifest.releaseChannel;

  if (releaseChannel === undefined) {
    return {
      envName: 'DEVELOPMENT',
      baseUrl: 'https://dev3-api.development.tastelabgroup.com/api/v1',
    };
  }
  if (releaseChannel.indexOf('prod') !== -1) {
    return {
      envName: 'PRODUCTION',
      baseUrl: 'https://dev3-api.development.tastelabgroup.com/api/v1',
    };
  }
  if (releaseChannel.indexOf('staging') !== -1) {
    return {
      envName: 'STAGING',
      baseUrl: 'https://staging-api.development.tastelabgroup.com/api/v1',
    };
  }
  return {};
};
