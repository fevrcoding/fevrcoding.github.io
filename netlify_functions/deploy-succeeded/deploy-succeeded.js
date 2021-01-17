const axios = require('axios');

const { ONE_SIGNAL_API_KEY, ONE_SIGNAL_APP_ID } = process.env;

function response(body = '') {
  console.log(body);
  return {
    statusCode: 200,
    body,
  };
}

exports.handler = async function ({ body = '{}' }) {
  const { payload = {} } = JSON.parse(body);

  if (payload.branch !== 'master') {
    return response('Nothing to do. Branch' + payload.branch);
  }

  const { data } = await axios.get(
    `https://api.github.com/repos/fevrcoding/fevrcoding.github.io/commits/${payload.commit_ref}`,
  );

  const [, eventPath] =
    data.commit.message.match(/fevrcoding\/cms\/event\/(.+?)\n/) || [];

  if (!eventPath) {
    return response(data.commit.message);
  }

  const eventFile = data.files.find(
    ({ filename, status }) =>
      status === 'added' && filename.includes(eventPath),
  );

  if (!eventFile) {
    return response(data.files.map(({ filename }) => filename));
  }

  const { data: eventTxt } = await axios.get(eventFile.raw_url, {
    responseType: 'text',
  });

  const [, eventTitle] = eventTxt.match(/title:(.+?)\n/) || [];

  if (!eventTitle) {
    return response(eventTxt);
  }

  axios.post(
    'https://onesignal.com/api/v1/notifications',
    {
      included_segments: ['Active Users'],
      app_id: ONE_SIGNAL_APP_ID,
      headings: {
        en: 'Nuovo evento!',
      },
      contents: {
        en: eventTitle,
      },
      web_url: 'https://www.fevr.it/',
    },
    {
      headers: { Authorization: `Basic ${ONE_SIGNAL_API_KEY}` },
    },
  );
  return response();
};
