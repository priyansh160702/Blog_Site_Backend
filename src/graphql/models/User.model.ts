import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Blog } from './Blog.model';

//Will be using the same class for TypeOrm models. TypeORM will ignore other decorators.

@Entity({ name: 'Users' }) //Species that it is a TypeORM Entity.
@ObjectType()
export class User {
  @PrimaryGeneratedColumn() // Column it creates is primary and its value is auto-generated.
  @Field((type) => Int) //Specifying it is a number type.
  id: number;

  @Column() //Specifying it is a column (TypeORM).
  @Field()
  name: string;

  @Column({ nullable: true }) //For TypeORM
  @Field({ nullable: true })
  profilePhoto?: string; //'?' specifies that it is an optional field. But for graphql, we need ad nullable=true.

  @Column()
  @Field()
  email: string;

  @Column()
  // @Field()
  password: string;

  //Timestamps
  @CreateDateColumn({ type: 'timestamptz' })
  @Field(() => String)
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field(() => String)
  updatedAt: Date;

  // Establishing One-To-Many Relationship with Blog
  @OneToMany(() => Blog, (blog) => blog.user)
  @Field((type) => [Blog], { nullable: true })
  blogs?: Blog[];
}
