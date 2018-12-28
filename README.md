# require-alias-node
### A tool which could set an alias for the module's path which is required in the `require` of nodejs

#### Install
~~~bash
npm install require-alias-node
~~~

Sometimes, we may use a module with a long path to be required, and the path may contain many level, is's not very intuitive ! 
~~~javascript
const component = require('../../../src/component');
const moduleA = require('../../../src/component/render/moduleA');
~~~

Now we can use this tool `require-alias-node` to set alias for the moduleA, such as :
~~~javascript
const requireAliasNode = require('require-alias-node');
requireAliasNode.setAlias({
	'component': '../../../src/component',
	'moduleA': '../../../src/component/render/moduleA'
});
const moduleA = require('moduleA');
const moduleB = require('component/main/moduleB')'
~~~

It's so gracefully !
