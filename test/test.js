
const {setAlias} = require('../index');

setAlias({
	'component': "./render/component",
	'main': "./main",
	'a': './render/component/a',
	'b': './render/component/b',
});


var a = require('a');
var b  = require('b');
