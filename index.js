'use strict';
var httpWell = require('know-your-http-well');
var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');
var nginxFolder = path.join(__dirname, 'nginx-errors');
var nginxConfig = '\n\tlocation ^~ /nginx-errors/ {\n\t\tinternal;\n\t\troot   <REPLACE BY PATH TO A FOLDER CONTAINING THE ERROR FILES>;\n\t}';
rimraf(path.join(nginxFolder, '*'), function(e) {
	if (e) { return console.error(e); }
	httpWell.statusCodes
	.filter(function(item) {
	 	var code = parseInt(item.code, 10);
	 	if (code.toString() !== item.code) {
	    return;
	  } else if (code<399) {
	  	return;
	  }
	  return true;
	})
	.forEach(function(item) {
		var e = {
			message: item.phrase + ': ' + item.description.slice(1,-1),
			link: item.spec_href,
			code: item.code
		};
		nginxConfig = '\terror_page ' + item.code + ' /nginx-errors/' + item.code + '.json;\n' + nginxConfig;

		fs.writeFileSync(path.join(nginxFolder, item.code + '.json'), JSON.stringify(e), 'utf8');
	});
	console.log('Copy the content of the nginx-errors folder in the folder that nginx will serve, update the path and copy paste the below nginx config snippet in your server directive:\n' + nginxConfig);
});
