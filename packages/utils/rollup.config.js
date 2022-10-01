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
 * author: v${pkg.author}
 */
`
const base = {
  input: './src/main.ts',
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
      // include: ["src/**/*.ts", "types"],
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
    file: 'lib/utils.esm.js',
    format: 'esm'
  }
})

const umd = merge({
  output: {
    file: 'lib/utils.umd.js',
    format: 'umd',
    name: 'utils'
  }
})
const min = merge({
  output: {
    file: 'lib/utils.js',
    format: 'umd',
    name: 'utils'
  },
  plugins: [...base.plugins, terser()]
})
const cjs = merge({
  output: {
    file: 'lib/utils.common.js',
    format: 'cjs'
  },
  plugins: [...base.plugins, commonjs()]
})

export default [esm, umd, min, cjs]
