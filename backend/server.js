const express = require('express')
const { sequelize } = require('./models');
const cors = require('cors')
const app = express()
const port = 8000

require("dotenv").config({ path: "./config/config.env" });


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Hello from api");
})

const user = require("./routes/userRoute");
const service = require("./routes/serviceRoute");
const service_provider = require('./routes/serviceproviderRoute');

app.use("/api", user);
app.use("/api/service", service);
app.use("/api/service_provider",service_provider)
app.listen(port, () => {
    sequelize.authenticate();
    console.log(`Example app listening on port ${port}`)
})