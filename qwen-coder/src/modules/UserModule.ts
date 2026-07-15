/**
 * Módulo User - Acoplamentos: DB + Validation + Logger
 */
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { UserRepository } from '../repositories/UserRepository';
import { LoggerService } from '../common/logging/LoggerService';
import { ValidationService } from '../common/validation/ValidationService';

export class UserModule {
  public readonly userController: UserController;
  public readonly userService: UserService;
  public readonly userRepository: UserRepository;
  public readonly loggerService: LoggerService;
  public readonly validationService: ValidationService;

  constructor() {
    // Inicializa os serviços com as dependências necessárias
    this.loggerService = new LoggerService('UserModule');
    this.validationService = new ValidationService();
    this.userRepository = new UserRepository(this.loggerService);
    this.userService = new UserService(this.loggerService, this.validationService);
    this.userController = new UserController(this.loggerService);
  }
}
