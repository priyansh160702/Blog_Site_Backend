import { Module } from '@nestjs/common';

import { UsersResolver, UsersService } from '../users';

@Module({
  imports: [],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
