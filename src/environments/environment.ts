export const environment = {
  production: true,
  name: 'prod',
  apiUrl: `${window.location.origin}/api`,
  brokerUrl: `${window.location.origin.replace(/^https?/, 'ws')}/ws`
};
