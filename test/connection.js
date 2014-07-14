var Hapi = require('hapi')
var assert = require('assert')

describe('Hapi server', function() {
  var server = null

  beforeEach(function() {
    server = new Hapi.Server()
  })

  afterEach(function () {
    server = null
  })

  it('should be able to register plugin with just storage & dialect', function(done) {
    server.pack.register({
      plugin: require('../'),
      options: {
        storage: __dirname + '/testDb.sqlite',
        dialect: 'sqlite'
      }
    }, function (err) {
      assert(err === undefined, 'An error was thrown but should not have been.')
      done()
    })
  })

  it('should be able to register plugin with storage & dialect & more', function(done) {
    server.pack.register({
      plugin: require('../'),
      options: {
        storage: __dirname + '/testDb.sqlite',
        dialect: 'sqlite',

        drop: false,
        ready_timeout: 0,
        dialect: "sqlite", // or 'sqlite', 'postgres', 'mariadb'
        //port:    5432, // or 5432 (for postgres)
        storage: __dirname + '/testDb.sqlite',
        sync: { force : true },
        logging: console.log,//console.log,
        maxConcurrentQueries: 1,
        native: true,
        define: {
          underscored: false,
          freezeTableName: false,
          syncOnAssociation: true,
          charset: 'utf8',
          collate: 'utf8_general_ci',
          // classMethods: {method1: function() {}},
          // instanceMethods: {method2: function() {}},
          timestamps: true
        },
        pool: { maxConnections: 1, maxIdleTime: 30}, //currently useless for sqlite maybe in another version
      }
    }, function (err) {
       assert(err === undefined, 'An error was thrown but should not have been.')
       done()
    })
  })

  it('should be able to find the plugin exposed objects', function(done) {
    server.pack.register({
      plugin: require('../'),
      options: {
        storage: __dirname + '/testDb.sqlite',
        dialect: 'sqlite',
      }
    }, function (err) {
      server.route({ method: 'GET', path: '/', handler: function(request, reply) {
        assert(request.server.plugins['hapi-sequelize'].sequelize, 'Could not find sequelize object')
        assert(request.server.plugins['hapi-sequelize'].Sequelize, 'Could not find Sequelize object')

        done()
      }})

      server.inject({ method: 'GET', url: '/' }, function() {})
    })
  })
})
