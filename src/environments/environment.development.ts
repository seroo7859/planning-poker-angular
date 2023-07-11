export const environment = {
  production: false,
  name: 'dev',
  apiUrl: `${window.location.origin}/api`,
  brokerUrl: `${window.location.origin.replace(/^https?/, 'ws')}/ws`
};
