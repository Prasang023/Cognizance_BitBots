import { pool } from "../../connections/db.js";

const register = (payload) => {
    const query = `INSERT INTO user_auth (user_auth.name, user_auth.wallet_address, user_auth.ownership)
    VALUES (?, ?, ?);`;

    const msg = pool.query(query, [payload.name, payload.walletAddress, payload.ownership]);

    return msg;
}

const login = (payload) => {
    const query = `SELECT ua.user_id as userId, ua.name, ua.ownership, ua.wallet_address as walletAddress
    FROM user_auth as ua
    WHERE ua.wallet_address = ?;`;

    const msg = pool.query(query, [payload.walletAddress]);

    return msg;
}

const ownershipUpdateDb = (payload) => {
    const query = `UPDATE user_auth as ua
    set ua.ownership = ?
    WHERE ua.wallet_address = ?;`;

    const msg = pool.query(query, [payload.ownership, payload.walletAddress]);

    return msg;
}

const reatilerMapDb = (payload) => {
    const query = `INSERT INTO retailer_map (retailer_map.manufacterer_id, retailer_map.retailer_address)
    VALUES (?, ?);`;

    const msg = pool.query(query, [payload.manufactererId, payload.retailerAddress]);

    return msg;
}

export { register, login, ownershipUpdateDb, reatilerMapDb };