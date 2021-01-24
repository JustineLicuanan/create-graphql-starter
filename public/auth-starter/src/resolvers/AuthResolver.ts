import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
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
		const user = await User.findOne(
			{ email: input.email },
			{ select: ['id', 'password'] }
		);
		if (!user) throw new Error('Email is incorrect');

		const isMatch = await bcrypt.compare(input.password, user.password);
		if (!isMatch) throw new Error('Password is incorrect');

		(req.session as any).user = {
			...user,
			email: input.email,
		};
		return {
			...user,
			email: input.email,
		} as User;
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
