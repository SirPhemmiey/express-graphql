const express = require("express");
const app = express();

const { schema, graphql } = require("./schema");


const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	let query = `{ hello, person { name, description }, people { name, description }}`;
	graphql(schema, query).then(result => {
		res.json(result);
	});
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));