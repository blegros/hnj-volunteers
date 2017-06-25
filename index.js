'use strict';

module.exports.downloadVolunteerLog = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: 'HOWDY!',
  };

  callback(null, response);
};
