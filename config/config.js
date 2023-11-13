module.exports = {
  development: {
    username: "freedb_falpyllal",
    password: "$W43kseRV$A7Y4P",
    database: "freedb_databasetugas",
    host: "sql.freedb.tech",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
