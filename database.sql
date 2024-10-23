

CREATE TABLE IF NOT EXISTS "user" (
	"id" serial NOT NULL UNIQUE,
	"username" VARCHAR(100) NOT NULL UNIQUE,
	"password" VARCHAR(255) NOT NULL,
	"phone_number" VARCHAR(20) NOT NULL,
	"role" VARCHAR(20) NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	"isAdmin" BOOLEAN NOT NULL DEFAULT FALSE,
	"email" VARCHAR(255) NOT NULL,
	"address" VARCHAR(255) NOT NULL,
	"farm_name" VARCHAR(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "product" (
	"id" serial NOT NULL UNIQUE,
	"name" VARCHAR(150) NOT NULL,
	"description" VARCHAR(255) NOT NULL,
	"price" NUMERIC(10,2) NOT NULL,
	"stock_quantity" INTEGER NOT NULL DEFAULT 1,
	"image_url" VARCHAR(255) NOT NULL,
	"is_featured" BOOLEAN NOT NULL DEFAULT false,
	"created_at" TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	"updated_at" TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	"category" VARCHAR(255) NOT NULL,
	"user_id" INTEGER NOT NULL,
	"farm" VARCHAR(100) NOT NULL,
	PRIMARY KEY ("id")
);
DROP TABLE "product";

CREATE TABLE IF NOT EXISTS "order" (
	"id" serial NOT NULL UNIQUE,
	"status" VARCHAR(50) NOT NULL,
	"total_amount" NUMERIC(10,2) NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	"user_id" INTEGER NOT NULL,
	PRIMARY KEY ("id")
);

DROP TABLE "order";
DROP TABLE "order_item";

CREATE TABLE IF NOT EXISTS "order_item" (
	"id" serial NOT NULL UNIQUE,
	"quantity" INTEGER NOT NULL,
	"unit_price" numeric(10,2) NOT NULL,
	"order_id" INTEGER NOT NULL,
	PRIMARY KEY ("id")
);


ALTER TABLE "product" ADD CONSTRAINT "product_fk10" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "order" ADD CONSTRAINT "order_fk4" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_fk3" FOREIGN KEY ("order_id") REFERENCES "order"("id");

ALTER TABLE "order_item"
drop constraint "order_item_fk3",
add constraint "order_item_fk3"
   foreign key ("order_id")
   references "order"("id")
   on delete cascade;

INSERT INTO "user" 
("username", "password", "phone_number", "role", "created_at", "isAdmin", "email", "address", "farm_name") 
VALUES 
('ryan16', 'o!6TBk@be*8K', '711-072-2544', 'customer', '2024-03-14 15:04:50', TRUE, 'jsingh@yahoo.com', '078 Maxwell Centers Suite 427\nEast Devon, CA 44023', 'Jackson-Flynn'),
('stephanie18', '&s7U@Ilje9V$', '763.303.1378x784', 'customer', '2024-05-29 14:28:52', FALSE, 'kayleefranklin@harris-moran.com', 'USCGC Jones\nFPO AE 26835', 'Macdonald Group'),
('tinaholmes', 'hKh2IRHjj9I%', '+1-940-562-6701x214', 'customer', '2024-09-29 19:38:32', TRUE, 'qjones@stephens.com', '05016 Daniel Place\nEast Sarahstad, UT 90479', 'Perez PLC'),
('xjohnston', 'z#8opem)dPPC', '(753)878-5486x148', 'farmer', '2024-06-08 05:04:06', FALSE, 'martinshelby@hernandez-soto.org', '1923 Donald Motorway Apt. 083\nStevenstad, SD 83065', 'Mccormick-Gonzalez'),
('lawrence25', 'LbvzCvGI*!0I', '(444)212-2402x05090', 'farmer', '2024-05-10 01:36:31', TRUE, 'ccervantes@west-kelly.com', '00710 Raymond Run\nKeithchester, KS 36743', 'Hubbard Ltd'),
('alan33', 'Pp2ieZwd!_j&', '(942)023-7272x023', 'customer', '2024-01-30 16:30:14', FALSE, 'christopherlopez@hotmail.com', '111 Pamela Ridge\nLake Randall, NM 46130', 'Howard, Castillo and Lucas'),
('nelsonjames', 'yP)3^3Wg_6(T', '(964)214-4351', 'customer', '2024-06-20 12:52:35', TRUE, 'blake09@gmail.com', 'PSC 7927, Box 9668\nAPO AP 63674', 'Adams, Weber and Luna'),
('xvargas', 'qBrhz3WsJ$0H', '(286)037-8941x2187', 'farmer', '2024-03-26 18:30:05', TRUE, 'donnawilliams@carr.org', '7182 Emily Keys Suite 793\nWilliamsside, MI 87999', 'Walker-Bruce'),
('powelljustin', 'jP_2SrJsbd(B', '(790)727-1880', 'farmer', '2024-06-30 19:40:00', FALSE, 'ashley95@yahoo.com', '407 Brandon Trace\nWest Stephenbury, AZ 71402', 'Delgado, Morgan and Robinson'),
('peterlindsey', 'C)8@1yGJAj)U', '949-129-8190', 'farmer', '2024-07-12 04:00:06', FALSE, 'mark92@harris.com', '744 Landry Flats\nBrewermouth, MN 67599', 'Lindsey, Clark and Carpenter');

INSERT INTO "product" 
("name", "description", "price", "stock_quantity", "image_url", "is_featured", "created_at", "updated_at", "category", "user_id") 
VALUES 
('Reach vegetables', 'Few feel sister lawyer listen specific.', 41.24, '81', 'https://www.lorempixel.com/456/640', TRUE, '2024-05-27 17:12:03', '2024-06-29 20:27:50', 'vegetables', 1),
('Need fruits', 'You physical these simply watch purpose ahead subject draw.', 8.11, '33', 'https://placeimg.com/1010/649/any', TRUE, '2024-02-12 02:27:16', '2024-01-30 00:50:44', 'fruits', 1),
('Hope vegetables', 'Specific production series issue some determine behavior lawyer third herself.', 44.11, '94', 'https://dummyimage.com/12x313', FALSE, '2024-05-30 13:47:39', '2024-05-17 09:39:57', 'vegetables', 3),
('Section fruits', 'Call attorney something understand population parent wait.', 26.36, '13', 'https://placeimg.com/562/462/any', FALSE, '2024-07-17 15:14:32', '2024-02-15 06:58:13', 'fruits', 4),
('Including fruits', 'Share population continue live similar thing.', 18.57, '97', 'https://placeimg.com/352/432/any', FALSE, '2024-09-01 09:34:42', '2024-01-05 16:17:23', 'vegetables', 8),
('Respond fruits', 'Tax range soldier town choice organization find subject with.', 44.49, '116', 'https://www.lorempixel.com/473/143', FALSE, '2024-10-14 01:50:24', '2024-06-27 12:32:51', 'vegetables', 2),
('Who fruits', 'System exist goal idea day interview south professor six condition week or direction.', 17.05, '51', 'https://placekitten.com/390/883', FALSE, '2024-07-15 18:32:41', '2024-01-07 20:49:02', 'fruits', 4),
('Fine fruits', 'Arrive opportunity condition easy night since instead.', 16.04, '132', 'https://dummyimage.com/567x142', TRUE, '2024-03-19 21:26:51', '2024-07-19 23:45:44', 'vegetables', 6),
('Answer fruits', 'Keep lawyer believe recognize cell suddenly phone amount institution choice although.', 29.74, '124', 'https://placekitten.com/924/246', TRUE, '2024-10-10 09:16:09', '2024-03-05 03:57:36', 'fruits', 10),
('Role fruits', 'Trouble interesting indeed more base myself edge.', 35.63, '20', 'https://dummyimage.com/766x327', TRUE, '2024-07-10 06:33:17', '2024-07-03 01:03:33', 'fruits', 2);

INSERT INTO "product" ("name", "description", "price", "stock_quantity","is_featured", "created_at", "updated_at", "image_url", "category", "user_id")
    VALUES (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    RETURNING id;
    
 SELECT * FROM "product";
    
UPDATE "product" SET "name"='peaches', "description"='Tasty fruits', "price"='10.00', "is_featured"=TRUE, "updated_at"='2024-10-09' WHERE "id"=4; 

--get on product from product table
SELECT * FROM "product" WHERE "id"=4;
DELETE FROM "product" WHERE "id"=4;

INSERT INTO "order" ("status", "total_amount", "user_id") VALUES ('purchased', '300', '15') RETURNING id;

--get all from order table
SELECT * FROM "order";


--select state for the orders
SELECT "order"."id" AS "orderId", "order"."status", "order"."total_amount", "order"."created_at", json_agg(
        json_build_object(
            'itemId', "order_item"."id",
            'quantity', "order_item"."quantity",
            'price', "order_item"."unit_price",
            'productName', "order_item"."product_name"
        )
    ) AS "products", "order"."user_id" AS "userId" FROM "order"
JOIN "order_item" ON "order_item"."order_id"="order"."id"
WHERE "order"."user_id"=15
GROUP BY "order"."id"
ORDER BY "created_at" DESC;

SELECT * FROM "order";

--delete an order, should delete all joined order items as well
DELETE FROM "order" WHERE "id"=6;
SELECT * FROM "user";

ALTER TABLE "order"
ADD "option" VARCHAR(255); 

ALTER TABLE "product" ALTER COLUMN "stock_quantity" TYPE integer;

