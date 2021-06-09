/**
 * Datastores
 * (sails.config.datastores)
 *
 * A set of datastore configurations which tell Sails where to fetch or save
 * data when you execute built-in model methods like `.find()` and `.create()`.
 *
 *  > This file is mainly useful for configuring your development database,
 *  > as well as any additional one-off databases used by individual models.
 *  > Ready to go live?  Head towards `config/env/production.js`.
 *
 * For more information on configuring datastores, check out:
 * https://sailsjs.com/config/datastores
 */

module.exports.datastores = {


  /***************************************************************************
  *                                                                          *
  * Your app's default datastore.                                            *
  *                                                                          *
  * Sails apps read and write to local disk by default, using a built-in     *
  * database adapter called `sails-disk`.  This feature is purely for        *
  * convenience during development; since `sails-disk` is not designed for   *
  * use in a production environment.                                         *
  *                                                                          *
  * To use a different db _in development_, follow the directions below.     *
  * Otherwise, just leave the default datastore as-is, with no `adapter`.    *
  *                                                                          *
  * (For production configuration, see `config/env/production.js`.)          *
  *                                                                          *
  ***************************************************************************/

  default: {

    /***************************************************************************
    *                                                                          *
    * Want to use a different database during development?                     *
    *                                                                          *
    * 1. Choose an adapter:                                                    *
    *    https://sailsjs.com/plugins/databases                                 *
    *                                                                          *
    * 2. Install it as a dependency of your Sails app.                         *
    *    (For example:  npm install sails-mysql --save)                        *
    *                                                                          *
    * 3. Then pass it in, along with a connection URL.                         *
    *    (See https://sailsjs.com/config/datastores for help.)                 *
    *                                                                          *
    ***************************************************************************/
    // adapter: 'sails-mysql',
    // url: 'mysql://user:password@host:port/database',

    // Activar para subir a heroku y comentar para correr el comando sails lift
    adapter: "sails-postgresql",
    url: process.env.DATABASE_URL,

    // Activar y correr en local para poder subir el squema en heroku
    adapter: "sails-postgresql",
    // host: 'ec2-34-230-115-172.compute-1.amazonaws.com',
    // batabase: 'd5sil2dl6e054u',
    // user: "yvwnwtxersugms",
    // port: '5432',
    // password: '4f2ee9b09dbc1470e7be1ac3a829fe1251b8be86d15792b153eb51911e80df61',
    // url:"postgres://yvwnwtxersugms:4f2ee9b09dbc1470e7be1ac3a829fe1251b8be86d15792b153eb51911e80df61@ec2-34-230-115-172.compute-1.amazonaws.com:5432/d5sil2dl6e054u",
    // ssl: false

    // URI: postgres://yvwnwtxersugms:4f2ee9b09dbc1470e7be1ac3a829fe1251b8be86d15792b153eb51911e80df61@ec2-34-230-115-172.compute-1.amazonaws.com:5432/d5sil2dl6e054u
    // Heroku CLI: heroku pg:psql postgresql-fitted-48686 --app unirsails

    // ========================================= PARA CORRER EN LOCAL ========================================
    // adapter: 'sails-postgresql',
    // url: 'postgres://castean:Gr3Nitas@localhost:5432/soporteunir', // Replace with your own connection URL
    //  postgres://{user}:{password}@{hostname}:{port}/{database-name}


    //  port: '5432',
    //  host: 'localhost',
    //  user: 'castean',
    //  password: 'Gr3Nitas',
    //  database: 'soporteunir'

  },


};