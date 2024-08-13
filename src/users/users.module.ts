import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersResolver, UsersService } from '../users';
import { User } from 'src/graphql/models';

@Module({
  // TypeOrmModule.forFeature([User]): This imports the User entity's repository into the UsersModule. By doing this, you make the repository available for dependency injection within this module. This is necessary because it allows you to interact with the User table in the database.

  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
