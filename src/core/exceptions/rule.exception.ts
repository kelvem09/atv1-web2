import { BadRequestException } from '@nestjs/common';

export class RegraNegocioException extends BadRequestException {
  constructor(message: string) {
    super({
      error: 'Erro - Regra de Negócio',
      message,
    });
  }
}