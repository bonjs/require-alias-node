
import {setAlias, clear} from ('../index');

setAlias({
	'component': "./render/component",
	'hh': "./main",
	'a': './render/component/a',
	'b': './render/component/b',
});

import a from './a';

clear();
