# Quick Start - Qwen Coder

Projeto TypeScript implementando arquitetura **DDD (Domain-Driven Design)** com pipeline de validação de entidades e propriedades temporais.

## 📋 Visão Geral

Este projeto implementa um módulo `User` completo seguindo os princípios DDD, com:

- **Entidade User** com propriedades temporais (`createdAt`, `updatedAt`) e método obrigatório `validate()`
- **Pipeline de Implementação**: `UserAPI → UserController → UserService → UserRepository`
- **Acoplamentos Necessários**: DB + Validation + Logger
- **Test Suite** completa com métricas de coverage
- **Dashboard de Monitoramento** via relatórios de teste

## 🏗️ Estrutura do Projeto

```
qwen-coder/
├── src/
│   ├── entities/          # Entidades de domínio
│   │   └── User.ts        # Entidade User com validação
│   ├── controllers/       # Controladores da API
│   │   └── UserController.ts
│   ├── services/          # Regras de negócio
│   │   └── UserService.ts
│   ├── repositories/      # Camada de persistência
│   │   └── UserRepository.ts
│   ├── modules/           # Módulos e injeção de dependência
│   │   └── UserModule.ts
│   └── common/            # Serviços compartilhados
│       ├── logging/
│       │   └── LoggerService.ts
│       └── validation/
│           └── ValidationService.ts
├── test/                  # Testes automatizados
│   └── user.test.ts
├── dist/                  # Código compilado
├── package.json
├── tsconfig.json
├── jest.config.js
└── QUICKSTART.md          # Este arquivo
```

## 🚀 Instalação

### Pré-requisitos

- Node.js >= 18.x
- npm >= 9.x

### Passos

```bash
cd qwen-coder
npm install
```

## 📦 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run build` | Compila TypeScript para JavaScript |
| `npm test` | Executa todos os testes |
| `npm run test:watch` | Executa testes em modo watch |
| `npm run test:coverage` | Executa testes com relatório de coverage |

## 🔧 Componentes Principais

### 1. Entidade User (`src/entities/User.ts`)

Entidade de domínio com:
- Propriedades: `id`, `phone`, `username`, `createdAt`, `updatedAt`
- Método obrigatório `validate()` que valida todas as propriedades
- Interface `IValidatable` para contrato de validação
- Interface `ITemporalProperties` para propriedades temporais

**Regras de Validação:**
- `phone`: Deve seguir formato E.164 (`+5511999999999`)
- `username`: Entre 3 e 50 caracteres
- `createdAt` / `updatedAt`: Devem ser datas válidas

```typescript
const user = new User({
  phone: '+5511999999999',
  username: 'john_doe'
});

if (user.validate()) {
  console.log('Usuário válido!');
}
```

### 2. Controller (`src/controllers/UserController.ts`)

Responsável por receber requisições da API e validar dados iniciais.

```typescript
interface CreateUserDTO {
  phone: string;
  username: string;
}

// Validação inicial no controller
if (!dto.phone || !dto.username) {
  throw new Error('Phone e username são obrigatórios');
}
```

### 3. Service (`src/services/UserService.ts`)

Camada de regra de negócio que:
- Cria instâncias da entidade `User`
- Executa validação via `ValidationService`
- Orquestra persistência via `UserRepository`

```typescript
const user = new User({ phone, username });
const isValid = this.validationService.validate(user);
if (!isValid) {
  throw new Error('Dados do usuário inválidos');
}
```

### 4. Repository (`src/repositories/UserRepository.ts`)

Camada de persistência (in-memory para demonstração):
- `save(user)`: Salva um usuário
- `findById(id)`: Busca por ID
- `findByPhone(phone)`: Busca por telefone
- `findAll()`: Lista todos usuários

### 5. Module (`src/modules/UserModule.ts`)

Módulo que centraliza acoplamentos necessários:
- **DB**: `UserRepository`
- **Validation**: `ValidationService`
- **Logger**: `LoggerService`

```typescript
export class UserModule {
  public readonly userController: UserController;
  public readonly userService: UserService;
  public readonly userRepository: UserRepository;
  public readonly loggerService: LoggerService;
  public readonly validationService: ValidationService;
}
```

## ✅ Pipeline de Validação

O fluxo completo de criação de usuário:

```
UserController.create(dto)
    ↓ [valida DTO inicial]
UserService.createUser(dto)
    ↓ [cria entidade User]
    ↓ [executa user.validate()]
UserRepository.save(user)
    ↓ [persiste no "banco"]
Retorna UserResponseDTO
```

## 🧪 Testes

O projeto inclui uma suite completa de testes cobrindo:

- **User Entity**: Validações de phone, username, datas
- **ValidationService**: Validação de entidades
- **UserService**: Criação com dados válidos/inválidos
- **UserRepository**: Operações CRUD
- **UserController**: Endpoint de criação
- **UserModule**: Inicialização e acoplamentos
- **Pipeline**: Fluxo completo integrado

### Executar Testes

```bash
# Todos os testes
npm test

# Com coverage
npm run test:coverage
```

### Métricas de Coverage

| Arquivo | Statements | Branches | Functions | Lines |
|---------|-----------|----------|-----------|-------|
| UserController | 100% | 100% | 100% | 100% |
| UserService | 100% | 100% | 100% | 100% |
| UserRepository | 88% | 75% | 100% | 88% |
| User.ts | 82.6% | 82.85% | 100% | 82.6% |
| LoggerService | 83.33% | 44.44% | 80% | 83.33% |

**Total Geral**: 87.8% Statements, 77.58% Branches, 85.71% Functions

## 📊 Dashboard de Monitoramento

Os relatórios de teste geram métricas para dashboard:

1. **TestMetrics**: Resultados dos testes (pass/fail)
2. **CoverageReport**: Cobertura de código por arquivo

Para visualizar o dashboard de coverage em HTML:

```bash
npm run test:coverage -- --coverageReporters=html
# Abre o arquivo coverage/index.html no navegador
```

## 🔍 Exemplo de Uso Completo

```typescript
import { UserModule } from './src/modules/UserModule';

// Inicializa o módulo
const module = new UserModule();

// Cria usuário via controller
const dto = {
  phone: '+5511999999999',
  username: 'john_doe'
};

try {
  // Pipeline: Controller -> Service -> Repository
  const result = await module.userService.createUser(dto);
  console.log('Usuário criado:', result);
} catch (error) {
  console.error('Erro ao criar usuário:', error.message);
}

// Busca usuário
const user = await module.userRepository.findById(result.id);
console.log('Usuário encontrado:', user);
```

## 🛠️ Desenvolvimento

### Adicionar Novas Validações

1. Edite o método `validate()` em `src/entities/User.ts`
2. Adicione testes correspondentes em `test/user.test.ts`
3. Execute `npm test` para verificar

### Adicionar Novos Serviços

1. Crie o serviço em `src/common/`
2. Registre no `UserModule`
3. Injete nas classes necessárias via construtor

## 📝 Checklist de Commit

Antes de commitar, verifique:

- [ ] Todos os testes passam (`npm test`)
- [ ] Coverage mínimo mantido (>80%)
- [ ] Entidades implementam `validate()`
- [ ] Logs adicionados via `LoggerService`
- [ ] Validações executadas no pipeline correto

## 🔗 Referências

- [Domain-Driven Design](https://martinfowler.com/tags/domain_driven_design.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Jest Testing Framework](https://jestjs.io/)
- [E.164 Phone Format](https://en.wikipedia.org/wiki/E.164)

---

**Status do Projeto**: ✅ Todos os testes passando (20/20)  
**Última Atualização**: 2026-07-08
