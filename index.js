const express = require("express");
const app = express();
app.use(express.json());

app.listen(8000, console.log("サーバーが開始されました"));

app.get("/", (req, res) => {
  res.send("チュートリアル");
});

//お客様情報をサーバーに置いておく
const customers = [
  { title: "田中", id: 1 },
  { title: "川田", id: 2 },
  { title: "斉藤", id: 3 },
  { title: "鈴木", id: 4 },
  { title: "山田", id: 5 },
];

//データを取得(GET)
app.get("/api/customers", (req, res) => {
  //   res.send(customers);
  res.json({
    ok: true,
    customers: customers,
  });
});

app.get("/api/customers/:id", (req, res) => {
  const customer = customers.find(
    (customer) => customer.id === parseInt(req.params.id)
  );
  //   res.send(customers);
  res.json({
    ok: true,
    customer: customer,
  });
});

//データを作成(POST)
app.post("/api/customers", (req, res) => {
  const customer = {
    title: req.body.title,
    id: customers.length + 1,
  };
  customers.push(customer);
  //   res.send(customers)

  if (!customer.title) {
    return res.json({
      ok: false,
      error: "invalid parameter",
    });
  }

  res.json({
    ok: true,
    customer: customer,
  });
});

//データを更新(PUT)
app.patch("/api/customers/:id", (req, res) => {
  const customer = customers.find(
    (customer) => customer.id === parseInt(req.params.id)
  );
  customer.title = req.body.title;
  //   res.send(customer);
  res.json({
    ok: true,
    customer: customer,
  });
});

//データを削除(DELETE)
app.delete("/api/customers/:id", (req, res) => {
  const customer = customers.find(
    (customer) => customer.id === parseInt(req.params.id)
  );
  const index = customers.indexOf(customer);
  customers.splice(index, 1);

  res.send(customer);
});
