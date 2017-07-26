const GOOGLE_CREDENTIALS = JSON.parse(process.env.HNJ_VOLUNTEERS_JWT),
  SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  SHEET_RESOURCE_ID = '1nt0w3FpVl2RPbloI7H_tGWIaGF38PfXdcm7UnrpWXJM',
  SHEET_QUERY_RANGE = 'Work Log!A2:G',
  getAuthenticationContext = require('./authenticationContext').authenticationContext,
  downloadVolunteers = require('./downloadVolunteers').downloadVolunteers;

module.exports.downloadVolunteerLog = function (event, context, callback) {
  getAuthenticationContext(GOOGLE_CREDENTIALS, SCOPES)
    .then(authenticationContext => {
      return downloadVolunteers(authenticationContext, SHEET_RESOURCE_ID, SHEET_QUERY_RANGE);
    })
    .then(volunteers => {
      let response = {
        statusCode: 200,
        body: JSON.stringify(volunteers),
      };

      callback(null, response);
    })
    .catch(error => {
      callback(null, error);
    });
};
