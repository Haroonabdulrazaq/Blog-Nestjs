import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUserParamDto {
  @ApiPropertyOptional({ description: 'user Id', example: 124 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id: number;
}
