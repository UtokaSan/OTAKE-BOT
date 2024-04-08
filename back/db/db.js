import pkg from 'pg';
const { Client } = pkg;

//get dotenv password
import dotenv from 'dotenv';
dotenv.config({ path: '../env/.env' });

const passwordDB = process.env.DB_PASS;

class Database {
    constructor() {
        this._client = new Client(`postgresql://Serveur_NodeJS:9sTredgT0Q1bme5YhU0kpA@joyous-wisp-9313.7tc.aws-eu-central-1.cockroachlabs.cloud:26257/minecraft_Plugin?sslmode=verify-full`);

        this._client.connect();
        this._client.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            UUID VARCHAR(255) NOT NULL,
            pseudo VARCHAR(255) NOT NULL,
            argent NUMERIC(10, 2) NOT NULL DEFAULT 0.00
        );
  `);
        // this.destroyAll();

    }

    destroyAll() {
        //drop all tables in the database
        this._client.query("DROP TABLE IF EXISTS users");
        this._client.query("DROP TABLE IF EXISTS another_table");
    }

    getClient() {
        return this._client;
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

export default Database;