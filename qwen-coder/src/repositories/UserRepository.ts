import { User } from '../entities/User';
import { LoggerService } from '../common/logging/LoggerService';

export class UserRepository {
  private users: Map<string, User> = new Map();

  constructor(private readonly logger: LoggerService) {}

  /**
   * Salva um usuário no repositório
   */
  public async save(user: User): Promise<User> {
    this.logger.info('UserRepository.save - Salvando usuário', { userId: user.id });

    if (!user.id) {
      throw new Error('User ID é obrigatório para salvar');
    }

    user.touch();
    this.users.set(user.id, user);

    this.logger.info('UserRepository.save - Usuário salvo com sucesso', { userId: user.id });
    return user;
  }

  /**
   * Busca um usuário por ID
   */
  public async findById(id: string): Promise<User | null> {
    this.logger.info('UserRepository.findById - Buscando usuário', { id });
    const user = this.users.get(id) || null;
    if (user) {
      this.logger.info('UserRepository.findById - Usuário encontrado', { id });
    } else {
      this.logger.warn('UserRepository.findById - Usuário não encontrado', { id });
    }
    return user;
  }

  /**
   * Busca um usuário por phone
   */
  public async findByPhone(phone: string): Promise<User | null> {
    this.logger.info('UserRepository.findByPhone - Buscando usuário', { phone });
    for (const user of this.users.values()) {
      if (user.phone === phone) {
        this.logger.info('UserRepository.findByPhone - Usuário encontrado', { phone });
        return user;
      }
    }
    this.logger.warn('UserRepository.findByPhone - Usuário não encontrado', { phone });
    return null;
  }

  /**
   * Lista todos os usuários
   */
  public async findAll(): Promise<User[]> {
    this.logger.info('UserRepository.findAll - Listando todos os usuários');
    return Array.from(this.users.values());
  }
}
