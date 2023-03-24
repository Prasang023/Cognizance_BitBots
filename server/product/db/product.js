import { pool } from '../../connections/db.js';

const productDetailsDb = (payload) => {
    const query = `INSERT INTO product_details (manufacturer_id, product_name, product_image, warranty_time, details)
    VALUES (?, ?, ?, ?, ?);`;

    const msg = pool.query(query, [payload.manufactererId, payload.name, payload.details, payload.image, payload.warrantyTime]);

    return msg;
}

const productMapingDb = (payload) => {
    const query = `SELECT COUNT(*) as count
    FROM products p
             INNER JOIN product_details pd ON p.product_id = pd.product_id
             INNER JOIN retailer_map rm ON pd.manufacturer_id = rm.manufacterer_id
    WHERE p.qr_id = ?
      AND rm.retailer_address = ?;`;
      
    const msg = pool.query(query, [payload.qrId, payload.retailerAddress])

    return msg;
}

const productManuDb = (payload) => {
  const query = `INSERT INTO products (product_id, qr_id, status, ipfs)
  VALUES (?, ?, ?, ?);`;

  const msg = pool.query(query, [payload.productId, payload.qrId, payload.status, payload.ipfs]);

  return msg;
}

const productManuStatusUp = (payload) => {
  const query = `UPDATE products AS p
  SET p.ipfs   = ?,
      p.status = ?
  WHERE p.qr_id = ?;`;

  const msg = pool.query(query, [payload.ipfs, payload.status, payload.qrId]);

  return msg;
}

export { productDetailsDb, productMapingDb, productManuDb, productManuStatusUp };