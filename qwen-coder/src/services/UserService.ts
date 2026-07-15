import { User } from '../entities/User';
import { LoggerService } from '../common/logging/LoggerService';
import { ValidationService } from '../common/validation/ValidationService';
import { CreateUserDTO, UserResponseDTO } from '../controllers/UserController';

export class UserService {
  constructor(
    private readonly logger: LoggerService,
    private readonly validationService: ValidationService
  ) {}

  /**
   * Cria um usuário com validação das propriedades
   * Pipeline: UserController -> UserService -> UserRepository
   */
  public async createUser(dto: CreateUserDTO): Promise<UserResponseDTO> {
    this.logger.info('UserService.createUser - Iniciando', { dto });

    // Cria a entidade User
    const user = new User({
      phone: dto.phone,
      username: dto.username
    });

    // Validação das propriedades via método validate() da entidade
    const isValid = this.validationService.validate(user);
    if (!isValid) {
      this.logger.error('UserService.createUser - Validação falhou', { user });
      throw new Error('Dados do usuário inválidos');
    }

    this.logger.info('UserService.createUser - Validação passed', { user });

    // Simula persistência (seria chamado o UserRepository aqui)
    const persistedUser = await this.persistUser(user);

    return {
      id: persistedUser.id!,
      phone: persistedUser.phone,
      username: persistedUser.username,
      createdAt: persistedUser.createdAt,
      updatedAt: persistedUser.updatedAt
    };
  }

  private async persistUser(user: User): Promise<User> {
    // Simula ID gerado pelo banco
    user.id = `user-${Date.now()}`;
    user.touch();
    return user;
  }
}
