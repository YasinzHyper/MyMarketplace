import express from "express";
import Airtable from "airtable";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

// Products API
app.get("/products", async (req, res) => {
  try {
    const records = await base("Products").select().all();
    const products = records.map((record) => ({
      id: record.id,
      name: record.fields.Name,
      description: record.fields.Description,
      price: record.fields.Price,
      imageUrl: record.fields.ImageURL,
      seller: record.fields.Seller,
    }));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const record = await base("Products").find(req.params.id);
    const product = {
      id: record.id,
      name: record.fields.Name,
      description: record.fields.Description,
      price: record.fields.Price,
      imageUrl: record.fields.ImageURL,
      seller: record.fields.Seller,
    };
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
});

app.post("/products", async (req, res) => {
  try {
    const { name, description, price, imageUrl, seller } = req.body;
    if (!name || !seller) throw new Error("Name and seller are required");
    const record = await base("Products").create({
      Name: name,
      Description: description,
      Price: price,
      ImageURL: imageUrl,
      Seller: seller,
    });
    res.status(201).json({ id: record.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const { name, description, price, imageUrl, seller } = req.body;
    await base("Products").update(req.params.id, {
      Name: name,
      Description: description,
      Price: Number(price),
      ImageURL: imageUrl,
      Seller: seller,
    });
    res.json({ message: "Product updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    await base("Products").destroy(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Orders API
app.get("/orders", async (req, res) => {
  try {
    const { buyer, seller } = req.query;
    const records = await base("Orders").select().all();
    let orders = records.map((record) => ({
      id: record.id,
      productId: record.fields.Product ? record.fields.Product[0] : null,
      buyer: record.fields.Buyer,
      orderStatus: record.fields.OrderStatus,
      productSeller: record.fields["Product Seller"]
        ? record.fields["Product Seller"][0]
        : null,
    }));
    if (buyer) {
      const lowerBuyer = buyer.toLowerCase();
      orders = orders.filter(
        (order) => order.buyer && order.buyer.toLowerCase() === lowerBuyer
      );
    } else if (seller) {
      const lowerSeller = seller.toLowerCase();
      orders = orders.filter(
        (order) =>
          order.productSeller &&
          order.productSeller.toLowerCase() === lowerSeller
      );
    } else {
      orders = [];
    }
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/orders", async (req, res) => {
  try {
    const { productId, buyer, orderStatus } = req.body;
    if (!productId || !buyer)
      throw new Error("Product ID and buyer are required");
    const record = await base("Orders").create({
      Product: [productId],
      Buyer: buyer,
      OrderStatus: orderStatus || "Pending",
    });
    res.status(201).json({ id: record.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
