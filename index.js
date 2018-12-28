

const execSync = require('child_process').execSync;
const path = require('path');
const fs = require('fs');
const getCallerDir = require('caller-dir');
const stringifyParse = require('stringify-parse');
const rimraf = require('rimraf');

var aliases = {};

/**
 * 检查node_modules中是否已存在要设置的别名的目录或link, 如已存在，给出报错，如不存在，存到aliases并缓存到./node_modules/alias_list中
 * @param {*} alias 
 */
function setAlias(alias) {

	var dir = getCallerDir();

	var existsModules = checkoutIsExist(alias);
	if(existsModules.length) {
		throw Error('The modules named ' + existsModules.join(', ') + ' is exist, please change anthor name')
	}

	for(var k in alias) {
		mklink(path.resolve(dir, alias[k]), `./node_modules/${k}`)
	}
	aliases = {...alias, ...aliases};
	saveLocalAlias(aliases);
}

function checkoutIsExist(alias) {

	var aliasLocal = getLocalAlias();
	var exists = [];
	for(var k in alias) {
		if(!aliasLocal.hasOwnProperty(k) && fs.existsSync(`./node_modules/${k}`)) {
			exists.push(k);
		}
	}

	return exists;
}


function saveLocalAlias(alias) {
	if(!alias) {
		return;
	}
	var str = stringifyParse.stringify(alias);
	fs.writeFileSync('./node_modules/alias_list', str);
}

function getLocalAlias() {
	var aliasLocal = "{}";
	try {
		aliasLocal = fs.readFileSync('./node_modules/alias_list', 'utf-8');
	} catch(e) {
	}

	return stringifyParse.parse(aliasLocal);
}

function clear() {
	for(var k in aliases) {
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
	execSync(cmd)
}

module.exports = {
	setAlias,
	clear
}

