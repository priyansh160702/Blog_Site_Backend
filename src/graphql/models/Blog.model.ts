import { Field, ObjectType, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User.model';

@Entity({ name: 'Blogs' })
@ObjectType()
export class Blog {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  subTitle: string;

  @Column()
  @Field()
  category: string;

  @Column()
  @Field()
  content: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  image?: string;

  // Timestamps
  @CreateDateColumn({ type: 'timestamptz' })
  @Field(() => String)
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field(() => String)
  updatedAt: Date;

  // Establishing Many-To-One Relationship with User
  @ManyToOne(() => User, (user) => user.blogs)
  @Field(() => User)
  user: User;
}
