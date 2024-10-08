import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql', //Actual Graphql schema will be created here.
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),

    // Multer module.
    MulterModule.register({
      limits: {
        fieldSize: 1000 * 1000 * 10,
      },
    }),

    // Serving public/users folder statically
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'users'),
      serveRoot: '/users',
    }),

    // Serving public/blogs folder statically
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'blogs'),
      serveRoot: '/blogs',
    }),

    UsersModule,
    BlogsModule,
    DatabaseModule,
    AuthModule,
    MailerModule,
    FileUploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
