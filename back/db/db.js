import pkg from 'pg';
const { Client } = pkg;

import dotenv from 'dotenv';
dotenv.config();

const urlDB = process.env.DB_URL;

class Database {
    constructor() {
        this._client = new Client(`${urlDB}`);

        this._client.connect();
        this.createAllTable();
        // this.destroyAll();

        // (async () => {
        //     try {
        //
        //         const results = await this._client.query("SELECT NOW()");
        //
        //         await console.log(results);
        //     } catch (err) {
        //         console.error("error executing query:", err);
        //     }
        // })();
    }

    async destroyAll() {
        try {
            console.log("Dropping all tables");
            const { rows } = await this._client.query(`
              SELECT table_name 
              FROM information_schema.tables
              WHERE table_schema = 'public'
            `);
            await console.log("Tables found:", rows.length);

            for (const { table_name } of rows) {
                await this._client.query(`DROP TABLE IF EXISTS "${table_name}" CASCADE`);
                await console.log(`Table ${table_name} dropped`);
            }
            await console.log("All tables dropped");
        } catch (err) {
            await console.error("Error dropping tables:", err);
        }

    }

    createAllTable() {
        this._client.query(`CREATE TABLE IF NOT EXISTS "user" (id SERIAL PRIMARY KEY, pseudo VARCHAR(255) NOT NULL, argent INT64 NOT NULL DEFAULT 30);`);

        this._client.query(`CREATE TABLE IF NOT EXISTS "game" (
            id SERIAL PRIMARY KEY,
            userid INTEGER NOT NULL,
            win INTEGER NOT NULL,
            loose INTEGER NOT NULL,
            elo INTEGER NOT NULL,
            cooldownreward TIMESTAMP NOT NULL,
            FOREIGN KEY (userid) REFERENCES "user"(id)
        );`);

        this._client.query(` CREATE TABLE IF NOT EXISTS "card" (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            attack INTEGER NOT NULL,
            pv INTEGER NOT NULL,
            rarity VARCHAR(20) NOT NULL CHECK (rarity IN ('Commun', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Admin'))
        );`);

        this._client.query(` CREATE TABLE IF NOT EXISTS "cardplayer" (
            id SERIAL PRIMARY KEY,
            idcard INTEGER NOT NULL,
            idplayer INTEGER NOT NULL,
            FOREIGN KEY (idcard) REFERENCES "card"(id),
            FOREIGN KEY (idplayer) REFERENCES "user"(id)
        );`);
        console.log("All tables created");
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