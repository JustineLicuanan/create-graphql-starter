import {
	Arg,
	ArgumentValidationError,
	Ctx,
	Mutation,
	Query,
	Resolver,
} from 'type-graphql';
import bcrypt from 'bcryptjs';

import { User } from '../entity/User';
import * as ResolverTypes from '../graphql-types/AuthResolverTypes';
import { MyContext } from '../graphql-types/MyContext';

@Resolver()
export class AuthResolver {
	@Mutation(() => User)
	async register(
		@Arg('input') input: ResolverTypes.RegisterInput
	): Promise<User> {
		return await User.create(input).save();
	}

	@Mutation(() => User)
	async login(
		@Arg('input') input: ResolverTypes.LoginInput,
		@Ctx() { req }: MyContext
	): Promise<User> {
		const user = await User.findOne({ email: input.email });

		if (!user) {
			throw new ArgumentValidationError([
				{
					target: {
						email: input.email,
					},
					value: input.email,
					property: 'email',
					constraints: {
						isEmailCorrect: 'email, or password is incorrect',
					},
				},
			]);
		}

		const isMatch = await bcrypt.compare(input.password, user.password);

		if (!isMatch) {
			throw new ArgumentValidationError([
				{
					target: {
						email: input.email,
					},
					value: input.email,
					property: 'email',
					constraints: {
						isEmailCorrect: 'email, or password is incorrect',
					},
				},
			]);
		}

		(req.session as any).user = user;
		return user;
	}

	@Query(() => User, { nullable: true })
	async me(@Ctx() { req }: MyContext): Promise<User | undefined> {
		return (req.session as any).user;
	}

	@Mutation(() => Boolean)
	logout(@Ctx() ctx: MyContext): Promise<boolean> {
		return new Promise((res, rej) =>
			ctx.req.session!.destroy((err) => {
				if (err) return rej(false);

				ctx.res.clearCookie('qid');
				return res(true);
			})
		);
	}
}
