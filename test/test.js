
const {setAlias, clear} = require('../index');

setAlias({
	'component': "./render/component",
	'hh': "./main",
	'a': './render/component/a',
	'b': './render/component/b',
});

var a = require('a');
var b  = require('b');

clear();
