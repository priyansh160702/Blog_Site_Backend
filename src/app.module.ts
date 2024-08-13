import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { User } from './graphql/models';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql', //Actual Graphql schema will be created here.
    }),
    TypeOrmModule.forRoot({
      //Server Config
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678',
      database: 'blog_site',
      entities: [User], // TypeORM model.
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [UserResolver, BlogResolver], //Add Resolvers here.
})
export class AppModule {}
