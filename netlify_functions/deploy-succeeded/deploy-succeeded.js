const axios = require('axios');

const { ONE_SIGNAL_API_KEY, ONE_SIGNAL_APP_ID } = process.env;

exports.handler = async function ({ body = '{}' }) {
  const { payload = {} } = JSON.parse(body);

  const ret = {
    statusCode: 200,
  };

  if (payload.branch !== 'master') {
    return ret;
  }

  const { data } = await axios.get(
    `https://api.github.com/repos/fevrcoding/fevrcoding.github.io/commits/${payload.commit_ref}`,
  );

  const [, eventPath] =
    data.commit.message.match(/fevrcoding\/cms\/event\/(.+?)\n/) || [];

  if (!eventPath) {
    return ret;
  }

  const eventFile = data.files.find(
    ({ filename, status }) =>
      status === 'added' && filename.includes(eventPath),
  );

  if (!eventFile) {
    return ret;
  }

  const { data: eventTxt } = await axios.get(eventFile.raw_url, {
    responseType: 'text',
  });

  const [, eventTitle] = eventTxt.match(/title:(.+?)\n/) || [];

  if (!eventTitle) {
    return ret;
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
  return ret;
};
