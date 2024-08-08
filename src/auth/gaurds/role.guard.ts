import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/index';

/**
 * @deprecated Roles guard is a simplistic RBAC approach where we just check whether the user has certain roles
 */
@Injectable()
export class RolesGuard implements CanActivate {
		constructor(private reflector: Reflector) {}
		
		canActivate(context: ExecutionContext) {
				const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
						context.getHandler(),
						context.getClass()
				]);

				if (!requiredRoles || requiredRoles.length === 0) return true;
				
				const request = context.switchToHttp().getRequest();
				const user = request.user;
				
				
				return requiredRoles.some((role) => user.roles.includes(role));
		}
}