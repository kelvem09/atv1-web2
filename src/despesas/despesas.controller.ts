import { Controller, Inject, Post, Body, Get, Param, ParseEnumPipe, ParseIntPipe, Put, Delete } from "@nestjs/common";
import { CategoriaDespesaEnum } from "src/core/enums/categoriasDespesas.enum";
import { DESPESA_SERVICE } from "src/core/tokens/tokens";
import { DespesaUpdateDto } from "./dto/despesas-update.dto";
import type { IDespesaService } from "./interfaces/despesa-service.interface";
import { DespesasCreateDto } from "./dto/despesas-create.dto";

@Controller('despesas')
export class DespesaController {
  constructor(
    @Inject(DESPESA_SERVICE)
    private readonly despesaService: IDespesaService,
  ) {}

  @Post()
  create(@Body() dto: DespesasCreateDto) {
    return this.despesaService.create(dto);
  }

  @Get()
  findAll() {
    return this.despesaService.findAll();
  }

  @Get('categoria/:categoria')
  findByCategoria(
    @Param('categoria', new ParseEnumPipe(CategoriaDespesaEnum))
    categoria: CategoriaDespesaEnum,
  ) {
    return this.despesaService.findByCategoria(categoria);
  }

  @Get('parlamentar/:parlamentarId')
  findByParlamentarId(
    @Param('parlamentarId', ParseIntPipe) parlamentarId: number,
  ) {
    return this.despesaService.findByParlamentarId(parlamentarId);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.despesaService.findById(id);
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
    this.despesaService.remove(id);
    return { message: 'Despesa removida com sucesso' };
  }
}