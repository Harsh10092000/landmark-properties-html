// import mysql from 'mysql2/promise'

// const pool = mysql.createPool({
//   host: "194.59.164.60",
//   user: "u414768521_landmark_pro",
//   password: "Gw[3H&SEBfT",
//   database: "u414768521_landmark_pro",
//   waitForConnections: true,
// })

// export default pool

import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: "193.203.166.208",
  user: "u706648698_landmark_plots",
  password: "6k@Z/*6VN+a9",
  database: "u706648698_landmark_plots",
  waitForConnections: true,
  port: 3306,
  multipleStatements: true
})

export default pool
