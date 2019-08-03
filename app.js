const express = require("express");
const app = express();

const { schema, graphql, root } = require("./schema");
const graphqlHTTP = require("express-graphql");

const PORT = process.env.PORT || 3000;

app.use('/graphql', 
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true
	}));

app.get("/", (req, res) => {
	let query = `{ hello, person { name, description }, people { name, description }}`;
	graphql(schema, query).then(result => {
		res.json(result);
	});
});


app.listen(PORT, () => console.log(`App running on port ${PORT}`));