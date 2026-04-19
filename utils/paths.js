const path = require('path');

const root = path.resolve(__dirname, '..');

module.exports = {
  root,
  public: path.join(root, 'public'),
  config: path.join(root, 'config'),
  controllers: path.join(root, 'controllers'),
  models: path.join(root, 'models'),
  routes: path.join(root, 'routes')
};
