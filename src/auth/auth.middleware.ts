import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = this.extractBearerToken(req);
      console.log('Bearer Token:', token); // Log or use the token as needed
      
      if (!token) {
        throw new BadRequestException('Token is missing');
      }

      // Further token validation or processing can be done here
      next();
    } catch (error) {
      next(error); // Pass errors to the next handler
    }
  }

  private extractBearerToken(req: Request): string | undefined {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader) {
      const [scheme, token] = authorizationHeader.split(' ');
      if (scheme === 'Bearer' && token) {
        return token;
      }
    }
    return undefined;
  }
}
