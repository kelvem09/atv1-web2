# Sistema de Gestão de Despesas Parlamentares
## Descrição

Esta aplicação consiste em uma API desenvolvida em NestJS para gerenciar informações de parlamentares, suas despesas de gabinete e sua participação em comissões legislativas. Além do armazenamento dos dados principais do domínio, o sistema também registra logs de auditoria em uma base separada, permitindo rastrear operações relevantes realizadas na aplicação.

A solução foi construída como evolução de uma atividade anterior, mantendo o domínio parlamentar e ampliando sua complexidade para atender requisitos de persistência híbrida, relacionamentos entre entidades e auditoria automática.

## Domínio escolhido

O domínio escolhido foi o de **gestão de despesas parlamentares com auditoria**, inspirado em sistemas utilizados para controle administrativo de gastos vinculados à atividade parlamentar.

A escolha desse domínio se justifica por sua proximidade com um contexto real de desenvolvimento já conhecido, o que facilitou a definição de regras de negócio, entidades e relacionamentos. Além disso, trata-se de um domínio que permite representar de forma clara operações de cadastro, consulta, vínculo entre registros e rastreamento de ações, sendo adequado para demonstrar conceitos como CRUD, validação, relacionamentos entre entidades e registro de logs.

No sistema, cada parlamentar pode possuir várias despesas de gabinete e também pode participar de uma ou mais comissões. Sempre que um novo registro principal é criado, a aplicação gera automaticamente uma entrada de auditoria, armazenando informações sobre a operação realizada.

## Configuração das fontes de dados

A aplicação utiliza duas fontes de dados distintas, ambas configuradas com SQLite em memória:

- **Fonte principal (`main`)**: responsável pelo armazenamento das entidades do domínio (`Parlamentar`, `Despesa` e `Comissao`);
- **Fonte de auditoria (`audit`)**: responsável pelo armazenamento dos registros de `AuditLog`.

Essas fontes são configuradas no arquivo de ambiente e registradas no `AppModule` por meio de duas conexões separadas do TypeORM.

## Entidades principais

### Parlamentar
Representa um parlamentar cadastrado no sistema, contendo dados como nome completo, nome parlamentar, partido atual e número de votos.

### Despesa
Representa uma despesa vinculada a um parlamentar, contendo descrição, valor, categoria e data.

### Comissão
Representa uma comissão legislativa, contendo nome, sigla e tema principal.

### AuditLog
Representa um registro de auditoria, contendo a entidade afetada, o identificador do recurso criado, a operação executada e a data/hora do evento.

## Relacionamentos

### 1:N — Parlamentar e Despesa
Um parlamentar pode possuir várias despesas cadastradas no sistema, enquanto cada despesa pertence a um único parlamentar.

- Um **Parlamentar** possui várias **Despesas**
- Uma **Despesa** pertence a um único **Parlamentar**

### N:N — Parlamentar e Comissão
Um parlamentar pode participar de várias comissões, e uma comissão pode conter vários parlamentares.

- Um **Parlamentar** participa de várias **Comissões**
- Uma **Comissão** possui vários **Parlamentares**

### Auditoria
A entidade **AuditLog** registra operações de criação realizadas sobre as entidades principais do sistema, sendo armazenada em uma base separada da base principal.

## Diagrama de relacionamentos

```mermaid
classDiagram
    class Parlamentar {
        +number id
        +string nomeCompleto
        +string nomeParlamentar
        +string partidoAtual
        +number numeroVotos
    }

    class Despesa {
        +number id
        +string descricao
        +number valor
        +string categoria
        +string data
    }

    class Comissao {
        +number id
        +string nome
        +string sigla
        +string tema
    }

    class AuditLog {
        +number id
        +string entidade
        +number entidadeId
        +string operacao
        +string dataHora
    }

    Parlamentar "1" --> "0..*" Despesa : possui
    Parlamentar "0..*" --> "0..*" Comissao : participa