exports.register = function (plugin, options, next) {

  var Sequelize = require('sequelize'),
    sequelize = new Sequelize(
      options.dialect + ':' + options.storage, options)

  sequelize
    .authenticate()
    .complete(function (err) {
      if (!!err) {
        plugin.log(['hapi-sequelize', 'error'], 'db.rdbms.squelize.authenticate')
        next(err)
      } else {

        plugin.log(['hapi-sequelize', 'info'], 'Sequelize connection has been established successfully.')

      }
    })

  plugin.servers.forEach(function (server) {
    plugin.expose('Sequelize', Sequelize)
    plugin.expose('sequelize', sequelize)
  })

  return next()
}

exports.register.attributes = {
  name: 'hapi-sequelize',
  pkg: require('./package.json')
}