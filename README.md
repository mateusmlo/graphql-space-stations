# backend-challenge

O ano é 2118, 100 anos após a fundação da [Voltbras]. Expandimos nosso negócios para gerenciamento de carregamento de veículos espaciais não tripulados com propulsão de íons.
O Propulsor de Íons é um dos diversos tipos de propulsão espacial, que utiliza feixes de luz à base de energia elétrica (aí onde entra a Voltbras, iremos fornecer esta energia).

Especificamente, esta propulsão de energia deve ser de base nuclear, pois a força de impulsão é muito forte. A introdução desse método só pode ser feita com um jato de energia elétrica, que dá uma força de repulsão maior.
O combustível nuclear não é abundante na galáxia, e seu kilograma custa milhões de Yuans (sim, Yuan (¥), já que neste ano toda a moeda do mundo é Chinesa graças a conquista da terra pelo país em 2097 utilizando tecnologia de controle de fusão nuclear) precisamos aumentar a eficiência ao máximo do processo de abastecimento.

Se a inserção do combustível for realizada num planeta de baixa gravidade, acontece a fissão do combustível nuclear e perde-se bastante potencial energético.
Por isso precisamos realizar o abastecimento das naves em planetas com alta gravidade, nos quais chega a ser 100 vezes mais eficiente o abastecimento.

**O seu trabalho é** descobrir em quais planetas a Voltbras pode instalar seus novos postos de carregamento.

Para isso:
- utilize a API da [Arcsecond], o que te possibilita buscar os planetas fora do sistema solar!(mais especificamente batendo em `GET /exoplanets/`)
- só mostre os planetas com gravidade alta, os dados não mostram exatamente qual gravidade o planeta tem, mas a Voltbras fez os cálculos e os planetas ideais(com gravidade alta),
são aproximadamente os mesmos que têm sua massa(`exoplanet.mass.value`) maior que 25 [M_jup] (`exoplanet.mass.unit`)

## Requisitos
- [ ] Crie um servidor em Node.js com GraphQL
    - [ ] Crie o schema GraphQL com uma query `suitablePlanets`, que retorna os dados dos planetas com gravidade alta
    - [ ] Crie uma mutation `installStation`, que dado um planeta, instala uma estação de carregamento no planeta(é sugerido criar uma tabela em algum DB que guarde a informação de aonde estão instaladas as estações)
    - [ ] Use um RESTDataSource para pegar os dados da [Arcsecond]
- [ ] Deixe aberto em algum repositório open-source(gitlab, github, etc...)
- [ ] Integre o servidor com algum banco de dados(para marcar onde as estações foram instaladas)

# Extras
- [ ] Adicione testes usando [Jest] ou qualquer outro framework para testes
- [ ] Use Typescript
- [ ] Coloque um docker-compose, que simplifique rodar o seu servidor e o DB

[Jest]: https://jest-everywhere.now.sh/
[Voltbras]: https://voltbras.com.br
[M_jup]: https://en.wikipedia.org/wiki/Jupiter_mass
[Arcsecond]: https://api.arcsecond.io/swagger/
