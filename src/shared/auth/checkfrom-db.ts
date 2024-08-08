import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckTokenValidity {
		async validate(request: any): Promise<boolean> {
				// Add your validation logic here
				// Example logic: Check if the token is valid based on the request
				const token = request.body.token;
				console.log(token);
				if (token && token === 'validToken') { // Replace 'validToken' with your validation logic
						return true;
				}
				return false;
		}
}
