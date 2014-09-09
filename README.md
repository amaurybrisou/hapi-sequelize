A simple Hapi Seuqlize Plugin.

config example, at the moment I developed it only for sqlite


		'../../../plugins/hapi-sequelize': [{
      options: {
        dialect: 'sqlite', // or sqlite, postgres, mariadb
        //port:    5432, // or 5432 (for postgres)
        storage: __dirname + '/plugins/dictionary-rdbms/LeBrisou.sqlite',
        sync: {
          force: true
        },
        logging: console.log,
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
          timestamps: false
        },
        pool: {
          maxConnections: 1,
          maxIdleTime: 30
        }, //currently useless for sqlite maybe in another version
      },
      select: ['my-server-label']
    }],