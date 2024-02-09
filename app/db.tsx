const mysql = require("mysql2/promise");

const connection = mysql.createPool({ //using pool create better memory  management
  host: "127.0.0.1",//localhost or 127.0.0.1
  user: "root", //database username
  password: "root", //database password
  database: "next_training", //database name
});

export async function query(sql: any, values: any) { //this function will be call from other files,see export usage
  const [rows, fields] = await connection.execute(sql, values); //await is for synchronization of funcions/events
  return rows;
}
