
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.callDir = factory();
	}
})(this, function () {
	
	var reg = /(?<=\()[^():]+(?=\/[^/]+\.js)/g;

	function getCallDir() {

		var stack = new Error().stack;
		return stack.match(reg)[2];
	}

	return getCallDir;
});

