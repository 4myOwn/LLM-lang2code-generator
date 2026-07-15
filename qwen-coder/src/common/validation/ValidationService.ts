import { IValidatable } from '../../entities/User';

export class ValidationService {
  /**
   * Valida uma entidade que implementa IValidatable
   */
  public validate<T extends IValidatable>(entity: T): boolean {
    return entity.validate();
  }

  /**
   * Valida múltiplas entidades
   */
  public validateAll<T extends IValidatable>(entities: T[]): boolean {
    return entities.every(entity => entity.validate());
  }
}
