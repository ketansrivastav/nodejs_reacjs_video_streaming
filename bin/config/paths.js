const path = require('path');

module.exports =   {
    serverPath: path.resolve('.','backend/server'),
    backend: path.resolve('.','backend'),
    frontend_src: path.resolve('.','frontend/src'),
    www: path.resolve('.',"www"),
    dev_www: path.resolve('.','frontend/dev-www'),
    express_views: path.resolve('.','backend/views'),
    assets_path : path.resolve('.','assets')
}