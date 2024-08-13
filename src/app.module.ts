import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { BlogResolver, UserResolver } from './graphql/resolvers';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql', //Actual Graphql schema will be created here.
    }),
  ],
  controllers: [],
  providers: [UserResolver, BlogResolver], //Add Resolvers here.
})
export class AppModule {}
