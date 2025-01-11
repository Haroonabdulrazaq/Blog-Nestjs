import {
  // Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import Request from 'express';

@Controller('users')
export class UsersController {
  @Get()
  public getUsers() {
    return 'You sent a GET requests to users Endpoint';
  }

  @Get(':id/:options')
  public getUserById(@Param() params: any, @Query() query: any) {
    console.log('params', params);
    console.log('query', query);

    return `You sent a requests to GET userById ${params.id} Endpoint`;
  }

  @Post()
  public createUsers(@Req() request: Request) {
    console.log('body', request);
    return `You sent a POST request to create this user ${request} Endpoint`;
  }

  @Put()
  public UpdateUser() {
    return 'You sent a PUT request to Users Endpoint';
  }

  @Patch()
  public UpdateUsersPart() {
    return 'You sent a PATCH request to Users Endpoint';
  }

  @Delete()
  public UpdateaUsers() {
    return 'You sent a DELETE request to Users Endpoint';
  }
}
