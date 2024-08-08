import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CheckTokenValidity } from './checkfrom-db';

export const DoCheckToken = createParamDecorator(
	async (data: unknown, ctx: ExecutionContext) => {
			const request = ctx.switchToHttp().getRequest();
			const checkTokenValidity = new CheckTokenValidity();
			return await checkTokenValidity.validate(request);
	}
);