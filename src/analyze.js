const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { BasicAuthenticator } = require('ibm-watson/auth');

const apiKey = process.env.WATSON_API_KEY;
const baseUrl = process.env.BASE_URL;

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new BasicAuthenticator({
    username: 'apikey',
    password: apiKey,
  }),
  url: baseUrl,
});

const analyze = async (input) => toneAnalyzer.tone({
  toneInput: input,
  contentType: 'text/plain',
}).then((response) => JSON.stringify(response.result, null, 2));

module.exports = analyze;
