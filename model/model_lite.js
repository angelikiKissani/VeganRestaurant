import sqlite3 from "sqlite3";
import * as path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db_name = path.join(__dirname, "../data", "db.db");

const getUser = (userID, callback) => {
    
    const sql = "SELECT * FROM Customer WHERE email = ?";
    const db = new sqlite3.Database(db_name);
    db.all(sql, [userID], (err, rows) => {
    if (err) {
        db.close();
        callback(err, null);
    }
    db.close();
    callback(null, rows); 
    console.log(rows);
});
}



const findUser = ( email=null,password=null,callback) => {
    
    // χωρίς μυστικό κωδικό για λόγους απλότητας
    const sql = 'SELECT * FROM Customer WHERE email = ? AND password= ?  ';
    console.log('new sql...', sql)
    const db = new sqlite3.Database(db_name);
    db.all(sql, [email,password], (err, row) => {
        if (err || row.length === 0) {
            db.close();
            callback("err",null);
        }
        else {
            console.log(" ο χρήστης υπάρχει")
            db.close();
            callback(null, row);
            
            
            
        }
    });
}

const newUser = ( email=null,password=null,callback) => {
    // εύρεση χρήστη με βάση τον κωδικό ή το όνομά του.
    // χωρίς μυστικό κωδικό για λόγους απλότητας
    const sql = 'INSERT INTO Customer VALUES(?,?,?,?,?)';
    console.log('new sql...', sql);
    const db = new sqlite3.Database(db_name);
    db.run(sql, [email,password, , , ], function (err, row){
        if (err) {
            
            callback(err, null);
        }
        
        console.log('1 new user inserted', this.email);
        callback(null, [{"email":this.email}]); 
    });
    db.close();
}

// const newOrder = (email, name,phone_num, address, )



// CREATE TABLE IF NOT EXISTS "Order" (
// 	"Date"	TEXT NOT NULL,
// 	"Order_ID"	INTEGER NOT NULL,
// 	"Price"	NUMERIC,
// 	"e-mail"	TEXT,
// 	"Name"	TEXT,
// 	"Address"	TEXT,
// 	"Phone_num"	INTEGER,
// 	PRIMARY KEY("Order_ID")
// );





// const query = (text, params, callback) => {
//     const db = new sqlite3.Database(db_name);
//     return db.query(text, params, callback);
// }



export {findUser,newUser}

