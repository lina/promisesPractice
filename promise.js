
var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

var options = {
  uri: 'https://api.github.com/zen',
  headers: { 'User-Agent': 'stubUserAgent' }
};

var writeFilePath = __dirname + '/../lib/file_to_write_to';

var getFromAPIAndWriteToFile = function (apiURL, writeFilePath) {
  var requestWithPromise = function(apiURL) {
  	return new Promise(function(resolve, reject) {
  		request(options, function(err, response, body) {
  			if(err) { 
  				return reject(err);
  			}
  			resolve(JSON.stringify(response));
  		})
  	})
  }

  var writeToFileWithPromise = function(content) {
  	return new Promise(function(resolve, reject) {
  		fs.writeFile(writeFilePath, content, function(err) {
  			if(err) {
  				return reject(err);
  			}
  			resolve();
  			
  		})
  	})
  }

  requestWithPromise(apiURL)
  .then(writeToFileWithPromise)
  .catch(function(err) {throw new Error(err); });
}('https://api.github.com/zen', 'file_to_write_to'); 


module.exports = getFromAPIAndWriteToFile;

