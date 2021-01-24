import { registerDecorator, ValidationOptions } from 'class-validator';

export const IsNotBlank = (validationOptions?: ValidationOptions) => (
	object: Object,
	propertyName: string
) => {
	registerDecorator({
		name: 'isNotBlank',
		target: object.constructor,
		propertyName,
		options: {
			message: '$property is required',
			...validationOptions,
		},
		validator: {
			validate(val: string) {
				return typeof val === 'string' && !!val.trim();
			},
		},
	});
};
