import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  ParseEnumPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { DespesasCreateDto } from './dto/despesas-create.dto';
import { DespesaUpdateDto } from './dto/despesas-update.dto';
import { DespesaService } from './despesas.service';
import { CategoriaDespesaEnum } from 'src/core/enums/categoriasDespesas.enum';

@Controller('despesas')
export class DespesaController {
  constructor(private readonly despesaService: DespesaService) {}

  @Post()
  create(@Body() dto: DespesasCreateDto) {
    return this.despesaService.create(dto);
  }

  @Get()
  findAll() {
    return this.despesaService.findAll();
  }

  @Get('somatorio')
  sumByParlamentar() {
    return this.despesaService.sumByParlamentar();
  }

  @Get('categoria/:categoria')
  findByCategoria(
    @Param('categoria', new ParseEnumPipe(CategoriaDespesaEnum))
    categoria: CategoriaDespesaEnum,
  ) {
    return this.despesaService.findByCategoria(categoria);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.despesaService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DespesaUpdateDto,
  ) {
    return this.despesaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.despesaService.remove(id);
  }
}