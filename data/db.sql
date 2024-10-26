
-- CREATE TABLE IF NOT EXISTS "Availability" (
-- 	"Number of tables"	INTEGER NOT NULL,
-- 	"Date"	TEXT NOT NULL,
-- 	PRIMARY KEY("Date")
-- );
CREATE TABLE IF NOT EXISTS "Product_Add" (
	"ID"	INTEGER,
	"Qty"	INTEGER,
	"IDorder"	INTEGER,
	FOREIGN KEY("IDorder") REFERENCES "Order"("Order_ID"),
	FOREIGN KEY("ID") REFERENCES "Products"("ID")
);
CREATE TABLE IF NOT EXISTS "Products" (
	"Name"	TEXT NOT NULL,
	"ID"	INTEGER NOT NULL,
	"Price"	INTEGER,
	PRIMARY KEY("ID")
);
CREATE TABLE IF NOT EXISTS "Customer" (
	"email"	TEXT NOT NULL,
	"password"	TEXT NOT NULL,
	"Status"	INTEGER NOT NULL,
	"Admin"	INTEGER NOT NULL,
	"id"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Order" (
	"Date"	TEXT NOT NULL,
	"Order_ID"	INTEGER NOT NULL,
	"Price"	NUMERIC,
	"email"	TEXT,
	"Name"	TEXT,
	"Address"	TEXT,
	"Phone_num"	INTEGER,
	PRIMARY KEY("Order_ID")
);
INSERT INTO "Products" VALUES ('Nachos',1,5);
INSERT INTO "Products" VALUES ('Vegetable curry',2,5);
INSERT INTO "Products" VALUES ('Veggie Dumplings',3,5);
INSERT INTO "Products" VALUES ('Quinoa Salad',4,5);
INSERT INTO "Products" VALUES ('Pasta Salad',5,5);
INSERT INTO "Products" VALUES ('Tabbouleh Salad',6,5);
INSERT INTO "Products" VALUES ('Sesame Soy Tofu Noodles',7,8);
INSERT INTO "Products" VALUES ('Beyond Meat Τaco',8,9);
INSERT INTO "Products" VALUES ('Beyond Quesadilla ',9,7);
INSERT INTO "Products" VALUES ('Carrot Cupcake',10,5);
INSERT INTO "Products" VALUES ('Orange Cupcake',11,5);
INSERT INTO "Products" VALUES ('Raspberry Cupcake',12,5);
INSERT INTO "Products" VALUES ('Ice Cream Snickers',13,5);
INSERT INTO "Products" VALUES ('Ice Cream Peanut',14,5);
INSERT INTO "Products" VALUES ('Tea',15,3);
INSERT INTO "Products" VALUES ('Coffee',16,2);
INSERT INTO "Products" VALUES ('Juice',17,4);
INSERT INTO "Products" VALUES ('''Navitas',18,5);
INSERT INTO "Products" VALUES ('Wine Tzivani Temptation',19,5);
INSERT INTO "Products" VALUES ('Wine Tzivani Kyklos',20,5);
INSERT INTO "Products" VALUES ('Strofilia',21,5);
INSERT INTO "Products" VALUES ('Chateau Sainte Marguerite',22,5);
INSERT INTO "Products" VALUES ('Wine Serena',23,5);
INSERT INTO "Customer" VALUES ('test','test','test','test',1);
COMMIT;

