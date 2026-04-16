import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CategoriaDespesaEnum } from "src/core/enums/categoriasDespesas.enum";
import { DespesaService } from "./despesas.service";
import { DespesasCreateDto } from "./dto/despesas-create.dto";

@ApiTags('despesas')
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

  @Get('categoria/:categoria')
  findByCategoria(@Param('categoria') categoria: CategoriaDespesaEnum) {
    return this.despesaService.findByCategoria(categoria);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.despesaService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.despesaService.remove(id);
    return { message: 'Despesa removida com sucesso' };
  }
}