import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Field()
  password: string;

  //  Removed blogs[] as it is not required.
}
