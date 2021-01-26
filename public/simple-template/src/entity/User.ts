import {
	Entity,
	PrimaryColumn,
	Column,
	BaseEntity,
	BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Field, ObjectType } from 'type-graphql';

@Entity('users')
@ObjectType()
export class User extends BaseEntity {
	@PrimaryColumn('uuid')
	@Field()
	id: string;

	@Column('text')
	@Field()
	name: string;

	@BeforeInsert()
	async genId() {
		this.id = uuidv4();
	}
}
