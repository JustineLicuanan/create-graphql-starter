import { Query, Resolver } from 'type-graphql';

@Resolver()
export class HiResolver {
	@Query(() => String)
	hi(): string {
		return 'Hello world';
	}
}
