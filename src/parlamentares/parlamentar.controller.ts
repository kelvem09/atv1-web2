import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParlamentarService } from './parlamentar.service';
import { ParlamentarCreateDto } from './dto/parlamentar-create.dto';

@ApiTags('parlamentares')
@Controller('parlamentares')
export class ParlamentarController {
  constructor(private readonly parlamentarService: ParlamentarService) {}

  @Post()
  async create(@Body() dto: ParlamentarCreateDto) {
    return this.parlamentarService.create(dto);
  }

  @Get()
  async findAll() {
    return this.parlamentarService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.parlamentarService.findOne(id);
  }
}
