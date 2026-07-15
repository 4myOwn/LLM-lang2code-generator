export class LoggerService {
  private serviceName: string;

  constructor(serviceName: string = 'App') {
    this.serviceName = serviceName;
  }

  public info(message: string, data?: any): void {
    console.log(`[${this.serviceName}] INFO: ${message}`, data || '');
  }

  public error(message: string, data?: any): void {
    console.error(`[${this.serviceName}] ERROR: ${message}`, data || '');
  }

  public warn(message: string, data?: any): void {
    console.warn(`[${this.serviceName}] WARN: ${message}`, data || '');
  }

  public debug(message: string, data?: any): void {
    console.debug(`[${this.serviceName}] DEBUG: ${message}`, data || '');
  }
}
