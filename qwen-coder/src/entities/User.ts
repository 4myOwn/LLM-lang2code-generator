/**
 * Entidade User com propriedades temporais e validação
 */
export interface IValidatable {
  validate(): boolean;
}

export interface ITemporalProperties {
  createdAt: Date;
  updatedAt: Date;
}

export class User implements IValidatable, ITemporalProperties {
  public id?: string;
  public phone: string;
  public username: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(data: Partial<User>) {
    this.id = data.id;
    this.phone = data.phone ?? '';
    this.username = data.username ?? '';
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }

  /**
   * Função de validação obrigatória para todas as propriedades
   */
  public validate(): boolean {
    // Validação do ID (opcional, pois pode ser novo usuário)
    if (this.id !== undefined && (typeof this.id !== 'string' || this.id.trim() === '')) {
      return false;
    }

    // Validação do phone (deve ser um número válido)
    if (!this.phone || typeof this.phone !== 'string') {
      return false;
    }
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(this.phone.replace(/[\s\-()]/g, ''))) {
      return false;
    }

    // Validação do username (deve ter entre 3 e 50 caracteres)
    if (!this.username || typeof this.username !== 'string') {
      return false;
    }
    if (this.username.length < 3 || this.username.length > 50) {
      return false;
    }

    // Validação das propriedades temporais
    if (!(this.createdAt instanceof Date) || isNaN(this.createdAt.getTime())) {
      return false;
    }
    if (!(this.updatedAt instanceof Date) || isNaN(this.updatedAt.getTime())) {
      return false;
    }

    return true;
  }

  /**
   * Atualiza o timestamp de updatedAt
   */
  public touch(): void {
    this.updatedAt = new Date();
  }
}
