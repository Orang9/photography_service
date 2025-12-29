import pool from "../../config/mysql.js";

export const findAllPackage = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM package");
        console.log("Package found:", rows.length);
        return rows;
    } catch (error) {
        console.error("Error fetching packages:", error);
        throw error;
    }
};

export const finfPackageById = async (id) => {
    const [rows] = await pool.query("SELECT * FROM package WHERE package_id = ?", [id]);
    return rows[0];
};

export const createPackage = async (packageData) => {
    const { photographer_id, name, description, price } = packageData;
    const [result] = await pool.query("INSERT INTO package (photographer_id, name, description, price) VALUES (?, ?, ?, ?)", [photographer_id, name, description, price]);
    return result.insertId;
};  

export const updatePackage = async (id, packageData) => {
    const { photographer_id, name, description, price } = packageData;
    await pool.query("UPDATE package SET photographer_id = ?, name = ?, description = ?, price = ? WHERE package_id = ?", [photographer_id, name, description, price, id]);
};

export const deletePackage = async (id) => {
    await pool.query("DELETE FROM package WHERE package_id = ?", [id]);
};