const express = require('express');
const router = require('./src/team/team.routes');
// const companyRoutes = require('./src/company/comp.routes');
const app = express();
const port = 3000;
app.use(express.json())

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/test', (req, res) => {
  const bd = {msg: "msg1" , requestBody: req.body}
  console.log(bd);
  res.json(bd)  // <==== req.body will be a parsed JSON object
})

app.get("/", (req,res) => {

  res.send("Staff!")
})

app.use('/api/v1/employees/', router);
// app.use('/api/v1/companies/', companyRoutes);




app.use(express.json())
app.listen(port, () => console.log(`listening  on post ${port}`))

