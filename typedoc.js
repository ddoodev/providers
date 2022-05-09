const packages = [
  'cache',
  'gateway',
  'ipc',
  'rest'
]

module.exports = {
  json: './docs/docs.json',
  entryPoints: packages.map(e => `./src/${e}/index.ts`),
  name: 'Providers',
  excludeExternals: true,
}