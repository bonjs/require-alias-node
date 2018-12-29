
var assert  = require("assert");
var requireAliasNode = require('../index')
requireAliasNode.setAlias({
	'component': "./render/component",
	'a': './render/component/a',
	'b': './render/component/b',
});

describe('test index.js', function() {

	it('it should require the component, a and b module successfully', function() {
		try {
			var a = require('a');
			var b = require('b');
			console.log(a);
			console.log(b);
		} catch(e) {
			throw new Error("could not require the component, a, b");
		}
    });
});