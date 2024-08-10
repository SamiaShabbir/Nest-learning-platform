import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const token = this.extractBearerToken(req);
      if (!token) {
        throw new BadRequestException('Token is missing');
      }

      const checkFortoken=await this.authService.CheckToken(token);
      console.log("token:",token,checkFortoken);
      if(checkFortoken!==true){
        throw new BadRequestException('Token Is Invalid1');
      }
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
