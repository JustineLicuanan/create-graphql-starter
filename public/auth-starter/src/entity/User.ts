import {
	Entity,
	PrimaryColumn,
	Column,
	BaseEntity,
	BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { Field, ObjectType } from 'type-graphql';

@Entity('users')
@ObjectType()
export class User extends BaseEntity {
	@PrimaryColumn('uuid')
	@Field()
	id: string;

	@Column('text', { unique: true })
	@Field()
	email: string;

	@Column('text')
	password: string;

	@BeforeInsert()
	async genIdAndHashPass() {
		this.id = uuidv4();
		this.password = await bcrypt.hash(this.password, 10);
	}
}
