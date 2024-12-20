const connection = require("../config/database");
const generateInvoice = require("../utils/generateInvoice");

const insertTransactionTopup = async (user_id, top_up_amount) => {
  const transaction_type = "TOPUP";
  const description = "Top Up Balance";
  const invoice = generateInvoice();

  const SQLQuery = `INSERT INTO transactions (user_id, invoice_number, service_code, service_name, transaction_type, total_amount, description ) VALUES (?,?,?,?,?,?,?)`;
  const params = [
    user_id,
    invoice,
    transaction_type,
    transaction_type,
    transaction_type,
    top_up_amount,
    description,
  ];

  try {
    const conn = await connection.getConnection();
    const [results, fields] = await connection.execute(SQLQuery, params);
    conn.release();
    return results;
  } catch (error) {
    console.log(error);
  }
};

const insertTransactionPayment = async (user_id, service) => {
  const transaction_type = "PAYMENT";
  const invoice = generateInvoice();

  const SQLQuery = `INSERT INTO transactions (user_id, invoice_number, service_code, service_name, transaction_type, total_amount, description ) VALUES (?,?,?,?,?,?,?)`;
  const params = [
    user_id,
    invoice,
    service.service_code,
    service.service_name,
    transaction_type,
    service.service_tarif,
    service.service_name,
  ];

  try {
    const conn = await connection.getConnection();
    const [results, fields] = await connection.execute(SQLQuery, params);
    conn.release();
    return results;
  } catch (error) {
    console.log(error);
  }
};

const getHistory = async (query, user_id) => {
  const limit = parseInt(query.limit) ?? 0;
  const offset = parseInt(query.offset) ?? 0;
  const SQLQuery = `SELECT invoice_number,transaction_type,description,total_amount,created_at FROM transactions WHERE user_id = ? LIMIT ? OFFSET ?`;
  const params = [user_id, limit, offset];
  try {
    const conn = await connection.getConnection();
    const [results, fields] = await connection.execute(SQLQuery, params);
    conn.release();
    return results;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  insertTransactionTopup,
  insertTransactionPayment,
  getHistory,
};
