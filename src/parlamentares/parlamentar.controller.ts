import { Controller, Post, Body, Get, Param, ParseEnumPipe, ParseIntPipe, Put, Delete } from "@nestjs/common";
import { PartidoEnum } from "src/core/enums/partidos.enum";
import { ParlamentarCreateDto } from "./dto/parlamentar-create.dto";
import { ParlamentarUpdateDto } from "./dto/parlamentar-update.dto";
import { ParlamentarService } from "./parlamentar.service";

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

  @Get('partido/:partido')
  findByPartido(
    @Param('partido', new ParseEnumPipe(PartidoEnum))
    partido: PartidoEnum,
  ) {
    return this.parlamentarService.findByPartido(partido);
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
    this.parlamentarService.remove(id);
    return { message: 'Parlamentar removido com sucesso' };
  }
}