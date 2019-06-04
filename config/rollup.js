var typescript = require('rollup-plugin-typescript2');
var babel = require('rollup-plugin-babel');

var pkg = require('../package.json');

// compatible with utils and @cyb/utils
// @cyb/utils -> utils
var name = pkg.name.split('/').pop();
var version = pkg.version;
var date = (new Date).getFullYear();

var banner = 
`/*!
 * ${pkg.name} ${version} (https://github.com/Azath0th/utils)
 * API https://github.com/Azath0th/utils/blob/master/doc/api.md
 * Copyright ${date === 2019 ? date : `2019 - ${date}`} Chen YuBen. All Rights Reserved
 * Licensed under MIT (https://github.com/Azath0th/utils/blob/master/LICENSE)
 */
`;

var type = pkg.srctype === 'ts' ? 'ts' : 'js';

function getCompiler(opt) {
    if (type === 'js') {
        return babel({
            babelrc: false,
            presets: [
                [
                    '@babel/preset-env',
                    {
                        'targets': {
                            'browsers': 'last 2 versions, > 1%, ie >= 6, Android >= 4, iOS >= 6, and_uc > 9',
                            'node': '0.10'
                        },
                        'modules': false,
                        'loose': false
                    }
                ]
            ],
            plugins: [
                [
                    '@babel/plugin-transform-runtime',
                    {
                        'helpers': false,
                        'regenerator': false
                    }
                ]
            ],
            runtimeHelpers: true,
            exclude: 'node_modules/**'
        });
    }

    opt = opt || {
        tsconfigOverride: { compilerOptions : { module: 'ES2015' } }
    };

    return typescript(opt);
}

exports.type = type;
exports.name = name;
exports.banner = banner;
exports.getCompiler = getCompiler;
