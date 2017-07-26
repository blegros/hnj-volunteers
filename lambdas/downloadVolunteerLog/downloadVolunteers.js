const apis = require('googleapis');

module.exports.downloadVolunteers = function(authenticationContext, resourceId, queryRange) {
  let sheets = apis.sheets('v4'),
    resource = {
      auth: authenticationContext,
      spreadsheetId: resourceId,
      range: queryRange,
    };

  let readPromise = new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get(resource, (err, response) => {
      return err ? reject(err) : resolve(response);
    });
  });

  return readPromise
    .then(response => {
      let rows = response.values;
      if (rows.length == 0) {
        console.log('No data found.');
        return [];
      }

      return rows.map(([name, booth, x, date, start_time, end_time, duration]) => {
        return {
          name,
          booth,
          date,
          start_time,
          end_time,
          duration
        };
      });
    })
    .catch(error => {
      console.log('The API returned an error: ' + error);
      return Promise.reject(error);
    });
};
