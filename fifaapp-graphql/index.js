import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { getTeams } from './controllers/team.controller.js';
import { typeDefs } from './graphql_schema.js';
import { filterPlayerByName, getPlayer, getPlayers } from './controllers/player.controller.js';
import mongoose from 'mongoose';
const db = mongoose.connect("mongodb://127.0.0.1:27017/fifapp", { useNewUrlParser: true, useUnifiedTopology: true });


// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    players: async (parent, args, context, info) => {
      let players = await getPlayers();
      if(args.orden === 'ASC'){
          players = players.sort((a,b) => a.first_name.localeCompare(b.first_name));
      }else if (args.orden === 'DESC'){
        
        players = players.sort((a,b) => b.first_name.localeCompare(a.first_name));
      }
      return players;
    },
    player: async (parent, args, context, info) => {
      return await getPlayer(args.id);
    },
    playerByName: async (parent, args, context, info) => {
      return await filterPlayerByName(args.name, args.limit);
    },
    teams: async () => {
      return await getTeams();
    },
    teamsByName: async (parent, args, context, info) => {
      let teams = await getTeams();
      if(args.name){
        teams = teams.filter(team => team.name.toLowerCase().includes(args.name.toLowerCase()));
      }
      if(args.orden === 'ASC'){
        teams = teams.sort((a,b) => a.name.localeCompare(b.name));
      }else if(args.orden === 'DESC'){
        teams = teams.sort((a,b) => b.name.localeCompare(a.name));
      }
      return teams;
    },
    version: () => "1.2"
  },
};


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);