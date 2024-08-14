import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Blog } from '../graphql/models/Blog.model';

@Resolver()
export class BlogResolver {}
