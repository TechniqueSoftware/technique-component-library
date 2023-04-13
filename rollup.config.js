import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import postcss from 'rollup-plugin-postcss'
import alias from '@rollup/plugin-alias'
import babel from 'rollup-plugin-babel'
import json from '@rollup/plugin-json'
import image from '@rollup/plugin-image';

import dotenv from 'dotenv'

dotenv.config({ path: `./.env.${process.env.APP_ENV}` })
const packageJson = require('./package.json')

const customResolver = resolve({
    extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss', '/index.js']
})

export default [
    {
        input: 'src/index.js',
        output: [
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true
            }
        ],
        plugins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
                'process.env.APP_TEST_USER': JSON.stringify(process.env.APP_TEST_USER),
                'process.env.ASF_IFRAME_SRC': JSON.stringify(process.env.ASF_IFRAME_SRC),
                preventAssignment: true
            }),
            alias({
                entries: {
                    '@axios': `${__dirname}/src/axios`,
                    '@components': `${__dirname}/src/components`,
                    '@global': `${__dirname}/src/global`,
                    '@parts': `${__dirname}/src/parts`,
                    '@redux': `${__dirname}/src/redux`,
                    '@utils': `${__dirname}/src/utils`
                },
                customResolver
            }),
            peerDepsExternal(),
            babel({
                exclude: 'node_modules/**',
                runtimeHelpers: true
            }),
            image(),
            json(),
            postcss(),
            resolve({ preferBuiltins: true, mainFields: ['browser'] }),
            commonjs()
        ]
    }
]
