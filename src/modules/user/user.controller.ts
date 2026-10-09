import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { Cookies } from '@/common/decorators/cookies.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    // { passthrough: true }, This tells NestJS that you want to interact with the response object to set the cookie, but you still want NestJS to handle the return statement automatically.
    @Res({ passthrough: true }) res: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    // Set the cookie
    res.cookie('testCookie', 'TESTING_COOKIE_VALUE', {
      httpOnly: true, // Protects against XSS attacks
      secure: process.env.NODE_ENV === 'production', // true in production (HTTPS)
      sameSite: 'lax',
      signed: true, // Enables cookie signing
      maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
    });

    return await this.userService.create(createUserDto);
  }

  @Get('cookie')
  getCookie(@Cookies('testCookie') cookie: string) {
    return { cookie };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
