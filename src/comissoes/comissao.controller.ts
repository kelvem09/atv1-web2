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
import { ComissaoCreateDto } from './dto/comissao-create.dto';
import { ComissaoUpdateDto } from './dto/comissao-update.dto';
import { ComissaoService } from './comissao.service';

@Controller('comissoes')
export class ComissaoController {
  constructor(private readonly comissaoService: ComissaoService) {}

  @Post()
  create(@Body() dto: ComissaoCreateDto) {
    return this.comissaoService.create(dto);
  }

  @Get()
  findAll() {
    return this.comissaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.comissaoService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ComissaoUpdateDto,
  ) {
    return this.comissaoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.comissaoService.remove(id);
  }
}
