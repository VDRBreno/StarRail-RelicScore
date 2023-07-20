# Star Rail - Relic Scorer

> [English version](./en-README.md)

### 🚧 Em Desenvolvimento

> Para definir pesos nos atributos que são melhores para cada personagem, foram usados ​​dados de [Mar-7th/StarRailRes] e [Mar-7th/StarRailScore]. Criado para https://niazinha.top

O resultado dos cálculos apresentará o quão bom foram os 'rolls' dos subatributos com base no peso do personagem, se todos os subatributos forem eficientes para o personagem e cada 'roll' com um alto aproveitamento, a pontuação será maior.

<br>

Considere essas variáveis para as fórmulas:
```
Bonus_Atributo_Efetivo: 5
Multiplicador_Principal: 20
Multiplicador_Total: 0,526315789473684210526315789473
```

<br>

Primeiro precisamos definir um personagem e uma relíquia.

**Personagem:** Himeko (id: 1003)<br/>
**Relíquia:** nv15 5* (HAND: 2)<br/>
**Principal:** 352 ATK<br/>
**Subs:**<br/>

|Atributo |Valor|
|---------|-----|
|HP       |3,8% |
|ATK      |7,3% |
|CRIT_RATE|8,1% |
|EFF_HIT  |12,5%|

<br>

Para essa relíquia o peso de personagem do atributo principal (ATK, AttackDelta) é 1.

> (valores em charactersWeights.json)<br/>Peso_Atributo_Principal: [personagem_id].main.[TIPO_RELIQUIA].[TIPO_ATRIBUTO]

A pontuação para o atributo principal é feito usando o nível da relíquia e o peso do personagem.<br/>
```
Peso_Atributo_Principal = 1

Atributo_Principal = ((Level_Reliquia+1)/16) * Peso_Atributo_Principal * Multiplicador_Principal
Atributo_Principal = ((15+1)/16) * 1 * 20
Atributo_Principal = 20
```

<br>

Agora é necessário calcular os valores para cada subatributo.
> (valores em charactersWeights.json)<br/>Peso_SubAtributo: [personagem_id].weight.[TIPO_ATRIBUTO]

> (valores em substatsMultipliers.json)<br/>Peso_Atributo: [TIPO_ATRIBUTO]

Tendo o Valor, Peso_SubAtributo e Peso_Atributo, basta multiplicar todos.

|Atributo |Valor|Peso_SubAtributo|Peso_Atributo   |Resultado         |
|---------|-----|----------------|----------------|------------------|
|HP       |3,8% |0               |3,85802469135802|0                 |
|ATK      |7,3% |0,8             |3,85802469135802|22,666667010290407|
|CRIT_RATE|8,1% |1               |5,1440329218107 |41,66666738815484 |
|EFF_HIT  |12,5%|0               |3,85802469135802|0                 |

> São considerados Atributos Efetivos os atributos que tiverem Peso_SubAtributo maior que 0.

Soma dos campos em 'Resultado': 64,33333439844525
```
SubAtributos_Resultado: 64,33333439844525

Atributos_Efetivos: 2
```

<br/>

O máximo possível de se obter em SubAtributos_Resultado é 150, mas isso apenas considerando que todos os subatributos tenham Peso_SubAtributo 1. Nem todos os personagens seguem um padrão de pesos, há aqueles que tem os maiores pesos sendo 0,8 ou 0,5, fazendo com que o máximo possível seja menor que 150. Por isso é definido um multiplicador para ajustar o valor com o potencial máximo do personagem e esse valor é variável. No caso da Himeko seu valor é:
```
Multiplicador_SubAtributo: 1,0465116279069766
```

<br/>

Aplicar a fórmula:
```
Resultado = Atributo_Principal + (Atributos_Efetivos * Bonus_Atributo_Efetivo) + (SubAtributos_Resultado * Multiplicador_SubAtributo)

Resultado = 20 + (2 * 5) + (64,33333439844525 * 1,0465116279069766)
Resultado = 20 + 10 + 67,32558251000083374728666813115
Resultado = 97,32558251000083374728666813115
```

O valor de Resultado pode atingir em teoria o máximo de 190. Para uma visualização melhor do resultado, aplicando o multiplicador o valor máximo se torna 100.
```
Final = Resultado * Multiplicador_Total

Final = 97,32558251000083374728666813115 * 0,526315789473684210526315789473
Final = 51,223990794737280919624562174223
```

<br/>

Por fim, o valor de Final arredondado é 51 de um total de 100% do potencial que a relíquia poderia atingir naquele personagem.

# O melhor caso

A relíquia com a melhor pontuação seguindo esse processo, é a relíquia que tiver Nível 15 com o Atributo Principal de peso 1, os subatributos com maiores pesos estiverem com a maior quantidade de 'roll' possível, fazendo com que haja os 4 atributos efetivos.

<br/>

**Personagem:** Himeko (id: 1003)<br/>
**Relíquia:** nv15 5* (HAND: 2)<br/>
**Principal:** 352 ATK<br/>
**Subs:**<br/>

|Atributo|Valor |
|--------|------|
|CRI_RATE|12,96%|
|CRIT_DMG|19,44%|
|ATK     |4,32% |
|SPEED   |2,6   |

```
Peso_Atributo_Principal = 1

Atributo_Principal = ((Level_Reliquia+1)/16) * Peso_Atributo_Principal * Multiplicador_Principal
Atributo_Principal = ((15+1)/16) * 1 * 20
Atributo_Principal = 20
```

|Atributo |Valor |Peso_SubAtributo|Peso_Atributo   |Resultado           |
|---------|------|----------------|----------------|--------------------|
|CRI_RATE |12,96%|1               |5,1440329218107 |66,666666666666672  |
|CRIT_DMG |19,44%|1               |2,57201646090535|50                  |
|ATK      |4,32% |0,8             |3,85802469135802|13,33333333333331712|
|SPEED    |2,6   |0,8             |6,41025641025641|13,33333333333331712|

```
SubAtributos_Resultado: 143,33333333333330624

Atributos_Efetivos: 4
```

```
Multiplicador_SubAtributo: 1,0465116279069766
```

```
Resultado = Atributo_Principal + (Atributos_Efetivos * Bonus_Atributo_Efetivo) + (SubAtributos_Resultado * Multiplicador_SubAtributo)

Resultado = 20 + (4 * 5) + (143,33333333333330624 * 1,0465116279069766)
Resultado = 20 + 20 + 149,99999999999995097984496124031
Resultado = 189,99999999999995097984496124031
```

```
Final = Resultado * Multiplicador_Total

Final = 189,99999999999995097984496124031 * 0,526315789473684210526315789473
Final = 99,999999999999974199918400652665
```

<br/>

Arredondando para 100, temos o valor máximo que uma relíquia pode atingir usando o processo.

[Mar-7th/StarRailRes]: https://github.com/Mar-7th/StarRailRes
[Mar-7th/StarRailScore]: https://github.com/Mar-7th/StarRailScore