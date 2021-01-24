import { Query, Resolver, UseMiddleware } from 'type-graphql';

import { isAuth } from '../middlewares/isAuth';

@Resolver()
export class HiResolver {
	@Query(() => String)
	@UseMiddleware(isAuth)
	hi(): string {
		return 'Hello world';
	}
}
