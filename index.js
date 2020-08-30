const pkg = require('./package.json');
var sqlite3 = require('sqlite3').verbose();


// CREATE TABLE [IF NOT EXISTS] [schema_name].table_name

// this.db.run(
//     `CREATE TABLE IF NOT EXISTS channel (
//         id INTEGER PRIMARY KEY,
//         name TEXT NOT NULL UNIQUE
//     )`
// );

class Database {
    constructor() {
        this.db = new sqlite3.Database(`${pkg.name}.db`);
    }

    async run(statement) {
        return new Promise((acc, rej) => {
            this.db.run(statement, (err, rows) => {
                if (err) return rej(err);
                return acc(rows);
            });
        });
    }

    async runPrepared() {
        const args = Array.from(arguments);
        const query = args.shift();
        const statement = this.db.prepare(query);
        return new Promise((acc, rej) => {
            statement.run(...args, (err) => {
                if (err) return rej(err);
                return acc();
            });
        });
    }

    async all(statement) {
        if (this.db) {

        } else {
            console.log('asdf')
        }
        return new Promise((acc, rej) => {
            this.db.all(statement, (err, rows) => {
                if (err) return rej(err);
                return acc(rows);
            });
        });
    }

    async get(statement) {
        return new Promise((acc, rej) => {
            this.db.get(statement, (err, rows) => {
                if (err) return rej(err);
                return acc(rows);
            });
        });
    }
}

module.exports = new Database();
