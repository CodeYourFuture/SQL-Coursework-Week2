const app = express();
const PORT = process.env.PORT || 300;

const { Pool } = require('pg')
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf-ecommerce",
  password: "",
  port: 5432,
});

app.get("/customers", function(req, res){
    pool.query("SELECT * FROM customers", (erorr, result) => {
        res.json(result.rows)
    })
})


app.listen(PORT, function(){
    console.log("Server is running on port 3000");
});

