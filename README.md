# backend-challenge

## Sobre o desafio

Desafio técnico em GraphQL. Num geral foi um projeto relativamente simples, com um ponto de atenção que é a comunicação com a API da NASA (claramente um legadão) que retorna um volume extremamente alto de dados, já casando com a ideia do GraphQL de recuperar apenas o necessário, o que na API da NASA é feito via SQL no query parameter. Para lidar com o volume de dados decidi usar cache com Redis, com duração de 24h (já que novos planetas não devem aparecer tão fácil), então apenas o primeiro request vai levar alguns segundos. Possui autenticação com JWT em todas as rotas. Um dos desafios, como de praxe no JS, foi lidar com as datas para a lógica do período de recarga nas estações e também para o histórico das recargas. A atualização dos status das recargas e liberação das estações é feita via Cron a cada 10 minutos.

## Stack

- NestJS
- Apollo
- GraphQL
- MySQL
- Redis
- Docker Compose

## Como Rodar

O projeto usa Docker Compose então deixar tudo funcionando é bem fácil! Faça uma cópia do arquivo `.env.example` para um chamado apenas `.env`; os valores podem ser mantidos. No terminal, basta rodar os comandos:

```sh
#subir os containers
docker-compose up -d

#instalar as dependencias
yarn

#inicializar o server
yarn start:dev
```


## Requisitos

Sinta-se livre para fazer qualquer um dos próximos requisitos diferente do que foi pedido desde que consiga justificar a mudança. Ex.: não fiz o requisito de tal maneira pois a implementação que eu fiz é mais performática e segura.

- [x] Crie um servidor em Node.js usando [Apollo GraphQL Server](https://www.apollographql.com/docs/apollo-server/)
  - [x] Crie o schema GraphQL com uma query `suitablePlanets`, que retorna os dados dos planetas com gravidade alta
  - [x] Crie uma mutation `installStation`, que dado um planeta, instala uma estação de carregamento no planeta(é sugerido criar uma tabela em algum DB que guarde a informação de aonde estão instaladas as estações)
  - [x] Crie uma query `stations`, que irá listar todas as estações instaladas nos planetas
  - [x] Crie uma mutation `recharge`, que dado uma estação e um datetime de quanto a recarga irá finalizar, realiza uma recarga, começando a partir do momento em que a mutation foi chamada e finalizando com a datetime passada.
    - Só é possível realizar uma recarga na estação por vez
    - Essa recarga deve estar atrelado a um usuário - sinta-se livre para implementar da maneira que você desejar.
    - Um usuário só pode ter no máximo uma recarga em andamento
- [x] Documente o seu projeto, e explique como rodar ele
- [x] Crie o projeto em algum repositório privado no GitHub ou GitLab
- [ ] Envie junto com o repositório do seu desafio um vídeo curto demonstrando o funcionamento básico do sistema, de formato livre, mostrando as funcionalidades implementadas.

# Extras

- [ ] Adicione testes usando [Jest] ou qualquer outro framework para testes
- [x] Usar Typescript
- [x] Coloque um docker-compose, que simplifique rodar o seu servidor e o DB
- [x] Usamos [prisma](prisma.io) mas sinta-se livre para usar qualquer ORM
- [x] Adicione autenticação (apenas um usuário autenticado poderá fazer uma recarga ou uma reserva)
- [ ] Crie uma mutation `reservation`, que dado uma estação, um usuário e um intervalo de tempo, cria uma reserva da estação para o usuário naquele determinado intervalo de tempo.
  - Não deve ser possível criar uma reserva que conflite com o intervalo de outra reserva ou de uma recarga já em andamento
  - Para realizar uma recarga de uma determinada reserva, é necessário chamar uma mutation (podendo ser a própria `recharge` ou uma nova mutation - como você preferir) passando apenas um `reservationId`. A utilização só pode ocorrer dentro do próprio intervalo de tempo da reserva (e.g. Se a reserva foi de 12:00 até 13:00, só deve ser possível utilizá-la entre 12:00 e 13:00).
  - A recarga de uma reserva deve ser finalizada ao final do intervalo da reserva.
- [x] Crie uma query `stationHistory`, onde será possível visualizar o histórico de recargas de uma estação (mostrar o horário, o tempo de duração da recarga e o usuário que realizou-a)

[nasa]: https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+ps&format=json
[jest]: https://jest-everywhere.now.sh/
[voltbras]: https://voltbras.com.br
[jupiter mass]: https://en.wikipedia.org/wiki/Jupiter_mass
