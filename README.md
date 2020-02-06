# backend-challenge

O ano é 2118, 100 anos após a fundação da [Voltbras]. Expandimos nosso negócios para gerenciamento de carregamento de veículos espaciais não tripulados com propulsão de íons.
O Propulsor de Íons é um dos diversos tipos de propulsão espacial, que utiliza feixes de luz à base de energia elétrica (aí onde entra a Voltbras, iremos fornecer esta energia).

Especificamente, esta propulsão de energia deve ser provinda de combustível nuclear, pois a força de impulsão é muito forte.
Se a inserção do combustível for realizada num planeta de baixa gravidade, acontece a fissão do combustível nuclear e perde-se bastante potencial energético.
Por isso precisamos realizar o abastecimento das naves em planetas com alta gravidade, nos quais chega a ser 100 vezes mais eficiente o abastecimento.

**O seu trabalho é** descobrir em quais planetas a Voltbras pode instalar seus novos postos de carregamento para otimizar o serviço de recarga.

Para isso:
- utilize a API da [Arcsecond], o que te possibilita buscar os planetas fora do sistema solar!(mais especificamente batendo em `GET /exoplanets/`)
- só mostre os planetas com gravidade alta, os dados não mostram exatamente qual gravidade o planeta tem, mas a Voltbras fez os cálculos e os planetas ideais(com gravidade alta),
são aproximadamente os mesmos que têm sua massa(`exoplanet.mass.value`) maior que 25 [M_jup] (`exoplanet.mass.unit`)

## Requisitos
Sinta-se livre para fazer qualquer um dos proximos requisitos diferente do que foi pedido desde que consiga justificar a mudança. Ex.: não fiz o requisito de tal maneira pois a implementação que eu fiz é mais perfomatica e segura.
- [ ] Crie um servidor em Node.js usando [Apollo GraphQL Server](https://www.apollographql.com/docs/apollo-server/)
    - [ ] Crie o schema GraphQL com uma query `suitablePlanets`, que retorna os dados dos planetas com gravidade alta
    - [ ] Crie uma mutation `installStation`, que dado um planeta, instala uma estação de carregamento no planeta(é sugerido criar uma tabela em algum DB que guarde a informação de aonde estão instaladas as estações)
    - [ ] Use um [RESTDataSource](https://www.apollographql.com/docs/apollo-server/data/data-sources/) para pegar os dados da [Arcsecond]
- [ ] Deixe aberto em algum repositório open-source(gitlab, github, etc...)
- [ ] Integre o servidor com algum banco de dados(para marcar onde as estações foram instaladas)
- [ ] Documente o seu projeto, e explique como rodar ele
# Extras
- [ ] Adicione testes usando [Jest] ou qualquer outro framework para testes
- [ ] Usar Typescript
- [ ] Coloque um docker-compose, que simplifique rodar o seu servidor e o DB
- [ ] Usamos [prisma](prisma.io) mas sinta-se livre para usar qualquer ORM
- [ ] Como o dado da [Arcsecond] vem páginado, tente pegar mais de uma página(e.g. 10 páginas)


## Exemplo do dado da API da Arcsecond
```json
{
  "count": 4399,
  "next": "https://api.arcsecond.io/exoplanets/?page=2",
  "previous": null,
  "results": [
    {
      "name": "11 Com b",
      ...
      "mass": {
        "value": 19.4,
        "unit": "M_jup",
        ...
      },
      ...
    },
    ...
  ]
}
```

## Exemplo do dado da sua API

Dado uma query
```graphql
{
    suitablePlanets {
        name
        mass
        hasStation
    }
}
```
Retornar uma response

```json
{
    "suitablePlanets": [
        {
            "name": "XPTO",
            "mass": 27.5,
            "hasStation": false
        },
        {
            "name": "REPOLHO",
            "mass": 52.0,
            "hasStation": true
        },
        ...
    ]
}
```


[Jest]: https://jest-everywhere.now.sh/
[Voltbras]: https://voltbras.com.br
[M_jup]: https://en.wikipedia.org/wiki/Jupiter_mass
[Arcsecond]: https://api.arcsecond.io/swagger/

