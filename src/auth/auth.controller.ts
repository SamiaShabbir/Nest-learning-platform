import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import {ApiTags,ApiResponse
  ,ApiBody,ApiBearerAuth,
  ApiOkResponse} from '@nestjs/swagger'
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @ApiResponse({ status: 200, description: 'User Logged In Successfully'})
  @ApiResponse({ status: 403, description: 'Invalid Credentials'})
  @ApiBody({
     type: AuthPayloadDto,
     description: 'Json structure for user object',
  })
  @UsePipes(new ValidationPipe())
  login(@Body() authPayload: AuthPayloadDto) {
    return this.authService.validateUser(authPayload);
  }

 
  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiResponse({ status: 200, description: 'User data'})
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Current user' })
  getProfile(@Request() req) {
    return {
      user:req.user,
      token:req.token
    };
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  @ApiResponse({ status: 200, description: 'User Logged Out Successfuly'})
  @ApiBearerAuth()
  async logoutToken(@Request() req) {
    
    return await this.authService.logout(req.token,req.user);
    
  }
}
