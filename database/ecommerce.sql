-- Kartly database (SQLite). Created automatically on first backend start.
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  rating REAL,
  emoji TEXT,
  description TEXT
);
CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_code TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  payment_status TEXT NOT NULL,
  total INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE TABLE order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL REFERENCES orders(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  quantity INTEGER NOT NULL
);
INSERT INTO products (id,name,category,price,rating,emoji,description) VALUES
(1,'Wireless Earbuds','Electronics',2499,4.4,'🎧','Bluetooth 5.3 earbuds with a charging case and 24-hour battery life.'),
(2,'Smart Watch','Electronics',3999,4.2,'⌚','Tracks steps, heart rate and sleep. Water resistant.'),
(3,'Power Bank 20000mAh','Electronics',1799,4.5,'🔋','Fast-charging power bank with two USB ports.'),
(4,'Bluetooth Speaker','Electronics',2199,4.3,'🔊','Portable speaker with deep bass and 12-hour playtime.'),
(5,'Cotton T-Shirt','Fashion',599,4.1,'👕','Soft 100% cotton regular-fit t-shirt.'),
(6,'Denim Jacket','Fashion',2299,4.0,'🧥','Classic denim jacket with a comfortable fit.'),
(7,'Running Shoes','Fashion',3299,4.6,'👟','Lightweight shoes with a cushioned sole for daily runs.'),
(8,'Backpack 30L','Fashion',1499,4.4,'🎒','Water-resistant backpack with a laptop compartment.'),
(9,'Steel Water Bottle','Home',699,4.5,'🧴','Insulated bottle that keeps drinks cold for 24 hours.'),
(10,'Desk Lamp','Home',1199,4.2,'💡','LED desk lamp with three brightness levels.'),
(11,'Coffee Mug Set','Home',849,4.3,'☕','Set of four ceramic mugs.'),
(12,'Notebook Pack (5)','Stationery',399,4.6,'📓','Five ruled notebooks, 200 pages each.'),
(13,'Gel Pen Set','Stationery',249,4.4,'🖊️','Smooth-writing gel pens in ten colours.'),
(14,'Yoga Mat','Sports',999,4.3,'🧘','Non-slip 6 mm yoga mat.');
