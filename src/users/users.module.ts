import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from 'src/graphql/models/User.model';

@Module({
  // TypeOrmModule.forFeature([User]): This imports the User entity's repository into the UsersModule. By doing this, you make the repository available for dependency injection within this module. This is necessary because it allows you to interact with the User table in the database.

  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
