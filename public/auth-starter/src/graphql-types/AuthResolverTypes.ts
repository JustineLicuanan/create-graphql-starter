import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { IsEmailNotExist } from '../lib/IsEmailNotExist';
import { IsNotBlank } from '../lib/IsNotBlank';

@InputType()
export class RegisterInput {
	@Field()
	@IsEmail()
	@IsEmailNotExist()
	email: string;

	@Field()
	@IsNotBlank()
	@MinLength(8)
	password: string;
}

@InputType()
export class LoginInput {
	@Field()
	@IsEmail()
	email: string;

	@Field()
	@IsNotEmpty()
	password: string;
}
