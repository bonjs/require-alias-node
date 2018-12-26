

const execSync = require('child_process').execSync;
const path = require('path');
const getCallerDir = require('caller-dir');
const rimraf = require('rimraf');

var aliases = {};

/**
 * 
 * @param {*} alias 
 */
function setAlias(alias) {

	var dir = getCallerDir();

	for(var k in alias) {
		//console.log(path.resolve(dir, alias[k]))
		//executeCommond(`ln -nsf ${alias[k]} ${k}`);
		//executeCommond(`ln -nsf ../src/render/component ./node_modules/a`);
		//executeCommond(`ln -nsf ${path.resolve(dir, alias[k])} ./node_modules/${k}`);
		mklink(path.resolve(dir, alias[k]), `./node_modules/${k}`)
	}
	aliases = {...alias, ...aliases};
}

function clear() {
	for(var k in aliases) {
		//executeCommond(`rm -rf ${k}`);
		delete aliases[k];
		rimraf(`./node_modules/${k}`, function(err, a) {
			if(err) {
				console.log(err);
			}
		});
	}
}

var mklink = function() {
	if(/win32/.test(process.platform)) { 
		return function(source, target) {
			executeCommond(`mklink /D ${target} ${source}`);
		}
	} else {
		return function(source, target) {
			executeCommond(`ln -nsf ${source} ${target}`);
		}
	}
}();

function executeCommond(cmd) {
	console.log(cmd)
	execSync(cmd)
}

module.exports = {
	setAlias,
	clear
}

