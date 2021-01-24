import {
	isEmail,
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
} from 'class-validator';

import { User } from '../entity/User';

export const IsEmailNotExist = (
	forUpdate?: true,
	validationOptions?: ValidationOptions
) => (object: Object, propertyName: string) => {
	registerDecorator({
		name: 'isEmailNotExist',
		target: object.constructor,
		propertyName,
		...(!!forUpdate && { constraints: ['id'] }),
		options: {
			message: 'email already exist',
			...validationOptions,
		},
		validator: {
			async validate(email: string, args: ValidationArguments) {
				if (!isEmail(email)) return true;
				const user = await User.findOne({ email }, { select: ['id'] });
				return !user || (!!forUpdate && user.id === (args.object as any).id);
			},
		},
	});
};
