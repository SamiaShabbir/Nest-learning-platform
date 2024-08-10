import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService,
              private readonly authService: AuthService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException('Token is not found');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
       const getUser=await this.authService.GetUserById(payload.user_id); 
       console.log("getUser:",getUser);
      (request as any).user = getUser;
      request['token']=token;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token has expired');
      } else {
        console.log(error);
        throw new UnauthorizedException('Invalid token');
      }
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
