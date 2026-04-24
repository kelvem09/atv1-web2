import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { ParlamentarCreateDto } from './dto/parlamentar-create.dto';
import { ParlamentarUpdateDto } from './dto/parlamentar-update.dto';
import { ParlamentarService } from './parlamentar.service';

@Controller('parlamentares')
export class ParlamentarController {
  constructor(private readonly parlamentarService: ParlamentarService) {}

  @Post()
  create(@Body() dto: ParlamentarCreateDto) {
    return this.parlamentarService.create(dto);
  }

  @Get()
  findAll() {
    return this.parlamentarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.parlamentarService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ParlamentarUpdateDto,
  ) {
    return this.parlamentarService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.parlamentarService.remove(id);
  }
}