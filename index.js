

var execSync = require('child_process').execSync;
var path = require('path');
var getCallerDir = require('caller-dir');

var aliases = {};

/**
 * 
 * @param {*} alias 
 */
function setAlias(alias) {

	var dir = getCallerDir();

	for(var k in alias) {
		console.log(path.resolve(dir, alias[k]))
		//executeCommond(`ln -nsf ${alias[k]} ${k}`);
		//executeCommond(`ln -nsf ../src/render/component ./node_modules/a`);
		executeCommond(`ln -nsbf ${path.resolve(dir, alias[k])} ./node_modules/${k}`);
	}
	aliases = {...alias, ...aliases};
}

function clear() {
	for(var k in aliases) {
		executeCommond(`rm -rf ${k}`);
		delete aliases[k];
	}
}

async function executeCommond(cmd) {
	console.log(cmd)
	return new Promise(function (resolve, reject) {
		execSync(cmd, function (err, stdout, stderr) {
			resolve(stdout);
		})
	});
}

module.exports = {
	setAlias,
	clear
}

