/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserParamDto } from './dto/get-users-params.dto';
import { patchUserDto } from './dto/patch-user.dto';
import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  public getUsers() {
    return 'You sent a GET requests to users Endpoint';
  }

  @Get('/:id?')
  public getUserById(
    @Param() getUserParamDto: GetUserParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log('getUserParamDto', getUserParamDto);

    return this.usersService.findAll(getUserParamDto, limit, page);
  }

  @Post()
  public createUsers(@Body() createUserDto: CreateUserDto) {
    // console.log('body', email);
    // console.log('headers', headers);
    console.log('createUserDto', createUserDto instanceof CreateUserDto);
    return `You sent a POST request to create this user Endpoint`;
  }

  @Put()
  public UpdateUser() {
    return 'You sent a PUT request to Users Endpoint';
  }

  @Patch()
  public UpdateUsersPart(@Body() patchUserDto: patchUserDto) {
    console.log(patchUserDto);

    return 'You sent a PATCH request to Users Endpoint';
  }

  @Delete()
  public UpdateaUsers() {
    return 'You sent a DELETE request to Users Endpoint';
  }
}
