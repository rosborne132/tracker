// export default (req, res) => {
//     res.status(200).json({
//         test: "Hello World"
//     })
// }

// The long way
// export default (req, res) => {
//     res.setHeader('Content-Type', 'application/json')
//     res.statusCode = 200
//     res.send(JSON.stringify({
//         test: "Hello World"
//     }))
// }


import { ApolloServer } from "apollo-server-micro"
import connectDB from "../../lib/mongoose"

import { habitsResolvers } from "../../src/api/habits/resolvers"
import { habitsMutations } from "../../src/api/habits/mutations"
import Habit from "../../src/api/habits/Habits.graphql"

import { mergeResolvers, mergeTypeDefs } from "graphql-toolkit"

const resolvers = mergeResolvers([ habitsResolvers, habitsMutations ])

const typeDefs = mergeTypeDefs([ Habit ])

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
    api: { bodyParser: false }
}

const server = apolloServer.createHandler({ path: "/api/graphql" })

export default connectDB(server)
