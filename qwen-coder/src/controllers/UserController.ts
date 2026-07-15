import { LoggerService } from '../common/logging/LoggerService';

export interface CreateUserDTO {
  phone: string;
  username: string;
}

export interface UserResponseDTO {
  id: string;
  phone: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserController {
  constructor(
    private readonly logger: LoggerService
  ) {}

  /**
   * Cria um novo usuário com validação das propriedades
   */
  public async create(dto: CreateUserDTO): Promise<UserResponseDTO> {
    this.logger.info('UserController.create - Iniciando criação de usuário', { dto });

    // Validação inicial do DTO
    if (!dto.phone || !dto.username) {
      this.logger.error('UserController.create - Dados inválidos', { dto });
      throw new Error('Phone e username são obrigatórios');
    }

    this.logger.info('UserController.create - Validação inicial passed', { dto });

    return {
      id: 'generated-id',
      phone: dto.phone,
      username: dto.username,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}
