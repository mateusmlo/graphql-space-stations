export const dbConfig = () => {
  return {
    dbPassword: process.env.MYSQL_PASSWORD,
    db: process.env.MYSQL_DATABASE,
    dbPort: process.env.MYSQL_TCP_PORT,
    dbUser: process.env.MYSQL_USER,
    dbHost: process.env.MYSQL_HOST
  };
};
