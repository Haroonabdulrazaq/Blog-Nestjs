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
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManyUserDto } from './dto/create-many-users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async createUsers(@Body() createUserDto: CreateUserDto) {
    const response = await this.usersService.createUser(createUserDto);
    return response;
  }

  @Post('create-many')
  public async createManyUsers(@Body() createManyUserDto: CreateManyUserDto) {
    const response = await this.usersService.createMany(createManyUserDto);
    return response;
  }

  @Get()
  public getUsers() {
    return this.usersService.findAll();
  }

  @Get('/:id?')
  @ApiOperation({
    summary: 'Fetch a list of user',
  })
  @ApiResponse({
    status: 200,
    description: 'User fetched successfully!',
  })
  @ApiQuery({
    name: 'limit',
    description: 'Limit of data per page',
    type: 'number',
    example: 10,
    default: 10,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    description: 'Page number',
    example: 2,
    default: 1,
    required: false,
  })
  public getUserById(
    @Param() getUserParamDto: GetUserParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log('getUserParamDto', getUserParamDto);

    return this.usersService.findAll();
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
