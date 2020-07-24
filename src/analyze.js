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

const formatAnalaysis = (analysis) => {
  if (analysis.document_tone.tones.length > 0) {
    const tones = analysis.document_tone.tones.map(
      (tone) => `${tone.tone_name.padEnd(15)} ${(tone.score * 100).toFixed(4)}%`,
    );
    return ['Tone Analysis:', ...tones].join('\n');
  }
  return 'No tones detected.';
};

const analyze = async (input) => toneAnalyzer.tone({
  toneInput: input,
  contentType: 'text/plain',
}).then((response) => formatAnalaysis(response.result));

module.exports = analyze;
