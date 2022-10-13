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
    file: 'lib/tracking.esm.js',
    format: 'esm'
  }
})

const umd = merge({
  output: {
    file: 'lib/tracking.umd.js',
    format: 'umd',
    name: 'tracking'
  }
})
const min = merge({
  output: {
    file: 'lib/tracking.js',
    format: 'umd',
    name: 'tracking'
  },
  plugins: [...base.plugins, terser()]
})
const cjs = merge({
  output: {
    file: 'lib/tracking.common.js',
    format: 'cjs'
  },
  plugins: [...base.plugins, commonjs()]
})

export default [esm, umd, min, cjs]
