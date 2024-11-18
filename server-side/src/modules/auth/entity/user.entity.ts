// auth/user.entity.ts
import { Entity, ObjectIdColumn, ObjectId, Column, Index } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id?: ObjectId;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @Index({ unique: true }) // Add unique index for email
  password: string;

  @Column()
  email: string;
}
