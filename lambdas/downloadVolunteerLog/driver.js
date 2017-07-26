let lambdas = require('./index');
lambdas.downloadVolunteerLog({}, {}, (something, response) => {
  console.log(response);
});
