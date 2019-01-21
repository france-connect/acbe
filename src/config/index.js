const path = require('path');

const APP_NAME = `ACBE`;
const CLIENT = '/client';

module.exports = {
  secret: `your_secret_key`, // Secret Key
  server: { // Express
    ip: 'int-cw',
    port: 4050,
  },
  log: true, // show logs
  // Roles: if a user has multiple roles, will take the time of the greater role
  roles: [
    {
      role: 'user',
      ttl: '7200 minutes',
    }, {
      role: 'admin',
      ttl: '5 days'
    }
  ],
  path: {
    disabled: '/:url(api|assets|auth|config|lib|views)/*' // paths 404
  },
  "socket.io": { // Socket.io
    port: 4050, // public port listen, change also in views/default/demo.js
    example: true, // router -> http://localhost:8000/socket 
    redis: { // Redis config
      host: '127.0.0.1',
      port: 6379
    }
  },
  "redis-jwt": { // Sessions
    //host: '/tmp/redis.sock', //unix domain
    host: '127.0.0.1', //can be IP or hostname
    port: 6379, // port
    maxretries: 10, //reconnect retries, default 10
    //auth: '123', //optional password, if needed
    db: 0, //optional db selection
    secret: 'secret_key', // secret key for Tokens!
    multiple: true, // single or multiple sessions by user
    kea: false // Enable notify-keyspace-events KEA
  },
  oAuth: { // oAuth
    local: {
      enabled: true
    },
    facebook: {
      enabled: false,
      clientID: '',
      clientSecret: '',
      callbackURL: '/auth/facebook/callback'
    },
    twitter: {
      enabled: false,
      clientID: '',
      clientSecret: '',
      callbackURL: '/auth/twitter/callback'
    },
    google: {
      enabled: false,
      clientID: '',
      clientSecret: '',
      callbackURL: '/auth/google/callback'
    },
    github: {
      enabled: true,
      clientID: '52be92c9a41f77a959eb',
      clientSecret: '76c9bb03c689d098506822fa80dba372a1fe29c8',
      callbackURL: '/auth/github/callback'
    },
    bitbucket: {
      enabled: false,
      clientID: '',
      clientSecret: '',
      callbackURL: '/auth/bitbucket/callback'
    }
  },
  // globals
  mode: process.env.NODE_ENV || 'development', // mode
  name: APP_NAME, // name 
  node: parseInt(process.env.NODE_APP_INSTANCE) || 0, // node instance
  root: path.normalize(`${__dirname}/../..`), // root
  base: path.normalize(`${__dirname}/..`), // base
  client: `${path.normalize(`${__dirname}/../..`)}${CLIENT}`, // client

  FC_URL: 'https://fca.int-cw.dev-franceconnect.fr',
  FS_URL: 'http://localhost:8080',
  AUTHORIZATION_FC_PATH: '/api/v1/authorize',
  TOKEN_FC_PATH: '/api/v1/token',
  USERINFO_FC_PATH: '/api/v1/userinfo',
  LOGOUT_FC_PATH: '/api/v1/logout',
  RESPONSE_TYPE: 'code',
  CLIENT_ID: 'bed269518423ee8e666e3b288c0059b03a7a1ba2feeb29d16ce9baa8ebf2d5d8',
  CLIENT_SECRET: '57cd7471c18b2f6faba732912079508567241e5162d69696d3dd17dc65e293f3',
  CALLBACK_FS_PATH: '/callback',
  LOGOUT_FS_PATH: '/logged-out',
  SCOPES: 'openid profile birth',
  ACR_VALUES: 'eidas2 siren organisation_name NAF_code',
  NAME: 'FSA1',
  FC_MODE: 'FranceConnect Agent'
};