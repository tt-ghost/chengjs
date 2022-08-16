console.log(1212, process.env)
module.exports = {
  server: {
    port: 8000,
    host: '0.0.0.0',
    servedir: __dirname,
    onRequest: (args) => {
      // remoteAddress: string;
      // method: string;
      // path: string;
      // status: number;
      // timeInMS: number;
      console.log('request args: ', args)
    }
  },
  entryPoints: ['example/src/main.ts'],
  // entryPoints: ['src/main.jsx'],
  bundle: true,
  // minify: true,
  // sourcemap: true,
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  external: ['node_modules'],
  // outfile: './dist/example.min.js',
  outdir: 'example/dist'
}