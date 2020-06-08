module.exports = {
  chainWebpack: config => {
    config.entryPoints
      .clear()
      .end()
      .entry('app')
      .add('./example/index.ts');
  }
};
