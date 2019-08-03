const {graphql, buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList} = require('graphql');
let humanType = new GraphQLObjectType({
	name: "Human",
	fields: () => ({
		id: { type: GraphQLString },
		description: { type: GraphQLString },
		name: { type: GraphQLString }
	})
});

//const people = require("./data/people");

const people = [
	{
		id: 1,
		description: "description1",
		name: "name1"
	},
	{
		id: 2,
		description: "description2",
		name: "name2"
	}
];

let schema_ = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: "RootQueryType",
		fields: {
			hello: {
				type: GraphQLString,
				resolve() {
					return "world";
				}
			},
			person: {
				type: humanType,
				resolve() {
					return people[0];
				}
			},
			people: {
				type: GraphQLList(humanType),
				resolve() {
					return people;
				}
			}
		}
	})
});

let schema = buildSchema(`
	type Product {
		name: String,
		id: Int
	},
	type Query {
		hello: String,
		products: [Product]
	}
	`);

const getProducts = () => {
	return Promise.resolve([
	{
		title: "Movie"
	}])
};

const root = {
	hello: () => {
		return "Hello World";
	},
	products: () => {
		return getProducts();
	}
};
module.exports = {
	graphql,
	schema,
	root
};

