import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'
import path from 'path'

const banner = `/**
 * name: ${pkg.name}
 * version: v${pkg.version}
 * author: ${pkg.author}
 */
`
const base = {
  input: './src/index.ts',
  output: {
    banner,
    sourcemap: false,
    globals: {}
  },
  external: {
    jquery: '$'
  },
  plugins: [
    resolve(),
    typescript({
      // resolveJsonModule: true,
      // include: ['src/**/*.ts', 'types/main.d.ts'],
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    json()
  ]
}

const merge = conf =>
  Object.assign({}, base, {
    ...conf,
    output: Object.assign({}, base.output, conf.output)
  })

const esm = merge({
  output: {
    file: 'lib/router.esm.js',
    format: 'esm'
  }
})

const umd = merge({
  output: {
    file: 'lib/router.umd.js',
    format: 'umd',
    name: 'Router'
  }
})
const min = merge({
  output: {
    file: 'lib/router.js',
    format: 'umd',
    name: 'Router'
  },
  plugins: [...base.plugins, terser()]
})
const cjs = merge({
  output: {
    file: 'lib/router.common.js',
    format: 'cjs',
    exports: 'default'
  },
  plugins: [...base.plugins, commonjs()]
})

export default [esm, umd, min, cjs]
