# Star Rail - Relic Scorer

### 🚧 In Development

> To define weights on the attributes that are best for each character, data from [Mar-7th/StarRailRes] and [Mar-7th/StarRailScore].

The result of the calculations will show how good the 'rolls' of the subattributes were based on the character's weight, if all the subattributes are efficient for the character and each 'roll' with a high use, the score will be higher.

<br>

Consider these variables for the formulas:
```
Effective_Attribute_Bonus: 5
Multiplier_Main: 20
Multiplier_Total: 0,526315789473684210526315789473
```

<br>

First we need to define a character and a relic.

**Character:** Himeko (id: 1003)<br/>
**Relic:** nv15 5* (HAND: 2)<br/>
**Main:** 352 ATK<br/>
**Subs:**<br/>

|Attribute|Value|
|---------|-----|
|HP       |3,8% |
|ATK      |7,3% |
|CRIT_RATE|8,1% |
|EFF_HIT  |12,5%|

<br>

For this relic the main attribute character weight (ATK, AttackDelta) is 1.

> (values in charactersWeights.json)<br/>Weight_Main_Attribute: [character_id].main.[RELIC_TYPE].[ATTRIBUTE_TYPE]

Scoring for the main attribute is done using the relic's level and the character's weight.<br/>
```
Weight_Main_Attribute = 1

Attribute_Main = ((Relic_Level+1)/16) * Weight_Main_Attribute * Multiplier_Main
Attribute_Main = ((15+1)/16) * 1 * 20
Attribute_Main = 20
```

<br>

Now it is necessary to calculate the values ​​for each sub-attribute.
> (values in charactersWeights.json)<br/>Weight_SubAttribute: [character_id].weight.[ATTRIBUTE_TYPE]

> (values in substatsMultipliers.json)<br/>Weight_Attribute: [ATTRIBUTE_TYPE]

With the values, Weight_SubAttribute and Weight_Attribute, multiply all.

|Attribute|Value|Weight_SubAttribute|Weight_Attribute|Result            |
|---------|-----|-------------------|----------------|------------------|
|HP       |3,8% |0                  |3,85802469135802|0                 |
|ATK      |7,3% |0,8                |3,85802469135802|22,666667010290407|
|CRIT_RATE|8,1% |1                  |5,1440329218107 |41,66666738815484 |
|EFF_HIT  |12,5%|0                  |3,85802469135802|0                 |

> Effective Attributes are those attributes that have Weight_SubAttribute bigger then 0.

Sum of all fields in 'Result': 64,33333439844525
```
SubAttributes_Result: 64,33333439844525

Effective_Attributes: 2
```

<br/>

The maximum possible to obtain in SubAttributes_Result é 150, but this is only assuming that all sub-attributes have Weight_SubAttribute 1. Not all characters follow a weight pattern, there are those that have the highest weights being 0.8 or 0.5, making the maximum possible less than 150. That's why a multiplier is defined to adjust the value with the potential maximum of the character and this value is variable. In the case of Himeko its value is:
```
SubAttribute_Multiplier: 1,0465116279069766
```

<br/>

Apply the formula:
```
Result = Attribute_Main + (Effective_Attributes * Effective_Attribute_Bonus) + (SubAttributes_Result * SubAttribute_Multiplier)

Result = 20 + (2 * 5) + (64,33333439844525 * 1,0465116279069766)
Result = 20 + 10 + 67,32558251000083374728666813115
Result = 97,32558251000083374728666813115
```

The Result value can theoretically reach a maximum of 190. For a better visualization of the result, applying the multiplier the maximum value becomes 100.
```
Final = Result * Multiplier_Total

Final = 97,32558251000083374728666813115 * 0,526315789473684210526315789473
Final = 51,223990794737280919624562174223
```

<br/>

Finally, the rounded End value is 51 out of 100% of the potential the relic could achieve on that character.

# The best case

The relic with the best score following this process, is the relic that has Level 15 with the Main Attribute of weight 1, the sub-attributes with the highest weights have the highest amount of 'roll' possible, making the 4 effective attributes.

<br/>

**Character:** Himeko (id: 1003)<br/>
**Relic:** nv15 5* (HAND: 2)<br/>
**Main:** 352 ATK<br/>
**Subs:**<br/>

|Attribute|Value |
|---------|------|
|CRI_RATE |12,96%|
|CRIT_DMG |19,44%|
|ATK      |4,32% |
|SPEED    |2,6   |

```
Weight_Main_Attribute = 1

Attribute_Main = ((Relic_Level+1)/16) * Weight_Main_Attribute * Multiplier_Main
Attribute_Main = ((15+1)/16) * 1 * 20
Attribute_Main = 20
```

|Attribute|Value |Weight_SubAttribute|Weight_Attribute|Result              |
|---------|------|-------------------|----------------|--------------------|
|CRI_RATE |12,96%|1                  |5,1440329218107 |66,666666666666672  |
|CRIT_DMG |19,44%|1                  |2,57201646090535|50                  |
|ATK      |4,32% |0,8                |3,85802469135802|13,33333333333331712|
|SPEED    |2,6   |0,8                |6,41025641025641|13,33333333333331712|

```
SubAttributes_Result: 143,33333333333330624

Effective_Attributes: 4
```

```
SubAttribute_Multiplier: 1,0465116279069766
```

```
Result = Attribute_Main + (Effective_Attributes * Effective_Attribute_Bonus) + (SubAttributes_Result * SubAttribute_Multiplier)

Result = 20 + (4 * 5) + (143,33333333333330624 * 1,0465116279069766)
Result = 20 + 20 + 149,99999999999995097984496124031
Result = 189,99999999999995097984496124031
```

```
Final = Result * Multiplier_Total

Final = 189,99999999999995097984496124031 * 0,526315789473684210526315789473
Final = 99,999999999999974199918400652665
```

<br/>

Rounding up to 100 is the maximum value a relic can reach using the process.

[Mar-7th/StarRailRes]: https://github.com/Mar-7th/StarRailRes
[Mar-7th/StarRailScore]: https://github.com/Mar-7th/StarRailScore