import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { IsEmailNotExist } from '../lib/IsEmailNotExist';

@InputType()
export class RegisterInput {
	@Field()
	@IsNotEmpty()
	@IsEmail()
	@IsEmailNotExist()
	email: string;

	@Field()
	@IsNotEmpty()
	@MinLength(8)
	password: string;
}

@InputType()
export class LoginInput {
	@Field()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@Field()
	@IsNotEmpty()
	password: string;
}
