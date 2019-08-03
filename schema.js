const {graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList} = require('graphql');
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

let schema = new GraphQLSchema({
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

// export { graphql };
// export default schema;

// module.exports.graphql = graphql;
// module.exports = schema

module.exports = {
	graphql,
	schema
};

