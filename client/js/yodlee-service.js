export class YodleeService {
  constructor() {

  }

  POST(loginName, clientID, secretKey) {
    let promise = new Promise(function (resolve, reject) {
      Meteor.call("getYodleeAccessToken", loginName, clientID, secretKey, function(error, results) {
        if (error) {
          reject(error);
        } else {
          if (results) {
            resolve(JSON.parse(results));
          } else {
            reject(results);
          }
        }
      });
    });
    return promise;
  }
}
