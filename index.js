

const execSync = require('child_process').execSync;
const path = require('path');
const fs = require('fs');
const getCallerDir = require('caller-dir');
const stringifyParse = require('stringify-parse');
const rimraf = require('rimraf');

var aliases = {};

clear();

/**
 * Check if there is already a directory or link for the alias to be set in node_modules. 
 * If it already exists, give an error. If it does not exist, save it to aliases and cache it in ./node_modules/alias_list.
 * @param {*} alias 
 */
function setAlias(alias) {

	var dir = getCallerDir();

	var existsModules = checkIsExist(alias);
	if(existsModules.length) {
		throw Error('The modules named ' + existsModules.join(', ') + ' is exist, please change anthor name')
	}

	for(var k in alias) {
		mklink(path.resolve(dir, alias[k]), `./node_modules/${k}`)
	}
	aliases = {...alias, ...aliases};
	saveLocalAlias(aliases);
}

/**
 * Check if it exist a module with the name of the alias
 * @param {*} alias 
 */
function checkIsExist(alias) {

	var aliasLocal = getLocalAlias();
	var exists = [];
	for(var k in alias) {
		if(!aliasLocal.hasOwnProperty(k) && fs.existsSync(`./node_modules/${k}`)) {
			exists.push(k);
		}
	}

	return exists;
}

/**
 * Save the aliases in ./node_modules/alias_list
 * @param {*} alias 
 */
function saveLocalAlias(alias) {
	if(!alias) {
		return;
	}
	var str = stringifyParse.stringify(alias);
	fs.writeFileSync('./node_modules/alias_list', str);
}

/**
 * Get the local aliases from ./node_modules/alias_list
 */
function getLocalAlias() {
	var aliasLocal = "{}";
	try {
		aliasLocal = fs.readFileSync('./node_modules/alias_list', 'utf-8');
	} catch(e) {
	}

	return stringifyParse.parse(aliasLocal);
}


/**
 * remove the alias
 * @param {*} alias 
 */
function clear(alias) {

	// remove all aliases, use no parameters
	if(typeof alias == 'undefined') {
		var aliasKeys = Object.getOwnPropertyNames(getLocalAlias());
		var aliasKeysPaths = aliasKeys.map(function(it) {
			return `./node_modules/${it}`;
		}).join(' ');
		console.log('aliasKeysPaths', aliasKeysPaths)
		executeCommond(`rm -rf ${aliasKeysPaths}`);
		aliases = {};

	// if the first parameter`s type is array
	} else if(Array.isArray(alias)) {
		alias.forEach(clear);
	// if the first parameter`s type is string
	} else if(typeof alias == 'string') {
		executeCommond(`rm -rf ./node_modules/${alias}`);
		delete aliases[alias];
	}

	saveLocalAlias(aliases);
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

