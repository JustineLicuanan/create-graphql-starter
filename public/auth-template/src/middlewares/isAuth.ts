import { MiddlewareFn } from 'type-graphql';

import { MyContext } from '../graphql-types/MyContext';

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
	if (!(context.req.session as any).user) throw new Error('Unauthorized');
	return next();
};
