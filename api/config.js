const path = require('path');

const rootPath = __dirname;

const env = process.env.NODE_ENV;

let database = 'mongodb://localhost/critics';
let port = 8000;

if (env === 'test') {
  database = 'mongodb://localhost/critics-test';
  port = 8010;
}

module.exports = {
  port,
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  uploadGalleryPath: path.join(rootPath, 'public/uploads/gallery/'),
  database,
  databaseOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
};
