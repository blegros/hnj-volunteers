const google = require('googleapis');

module.exports.authenticationContext = function(bearer, scopes){
  const authenticationContext = new google.auth.JWT(bearer.client_email, null, bearer.private_key, scopes, null);

  return new Promise((resolve, reject) => {
    authenticationContext.authorize((error, tokens) => {
      error ? reject(error) : resolve(authenticationContext);
    });
  });
}
