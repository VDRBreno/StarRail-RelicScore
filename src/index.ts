import Player from './player.json';
import SubStatsMultipliers from './substatsMultipliers.json';
import SubStatsRolls from './substatsRolls.json';
import CharactersWeights from './charactersWeights.json';
import Relics from './relics.json';

type CharacterId = keyof typeof CharactersWeights;

function getMainAttributeType(paramRelicId: string): 1|2|3|4|5|6 {
  type RelicId = keyof typeof Relics;
  const relicId = paramRelicId as RelicId;
  const relic = Relics[relicId];
  const relicType: {[key: string]: 1|2|3|4|5|6} = {
    'HEAD': 1,
    'HAND': 2,
    'BODY': 3,
    'FOOT': 4,
    'NECK': 5,
    'OBJECT': 6
  }
  type RelicType = keyof typeof relicType;
  return relicType[relic.type as RelicType];
}

function getMaxSubStatsScore(characterId: CharacterId) {
  
  type StatWeight = keyof typeof SubStatsMultipliers;

  let MaxSubsStatsScore = 0;
  const CharacterWeights = CharactersWeights[characterId];
  const CharacterWeight = CharacterWeights.weight;
  let Weights: { name: keyof typeof CharacterWeight; value: number; }[] = [];

  for(const key in CharacterWeight) {
    Weights.push({
      name: key as keyof typeof CharacterWeight,
      value: CharacterWeight[key as keyof typeof CharacterWeight]
    });
  }

  Weights = Weights.sort((a,b) => b.value-a.value).slice(0,4);

  for(const weight of Weights) {
    const StatWeight = SubStatsMultipliers[weight.name as StatWeight];
    const roll = SubStatsRolls[MaxSubsStatsScore===0 ?'max' :'min'][weight.name];
    MaxSubsStatsScore += roll * weight.value * StatWeight;
  }
  
  return MaxSubsStatsScore;
}

function getRelicRank(score: number) {
  if(score>=90) return 'S+';
  else if(score>=75) return 'S';
  else if(score>=65) return 'A';
  else if(score>=55) return 'B';
  else if(score>=45) return 'C';
  else if(score>=35) return 'D';
  else if(score>=25) return 'E';
  else return 'F';
}

const EffectiveAttributeBonus = 5;
const MultiplierMain = 20;
const MultiplierTotal = 0.526315789473684210526315789473;

for(const character of Player.characters) {

  console.log('=>', character.name, '\n');

  const CharacterId = character.id as CharacterId;
  const MaxSubsStatsScore = getMaxSubStatsScore(CharacterId);
  const SubAttributeMultiplier = 150 / MaxSubsStatsScore;

  const CharacterWeight = CharactersWeights[character.id as CharacterId];

  for(const relic of character.relics) {

    console.log('->', relic.name);

    const MainAttributeType = getMainAttributeType(relic.id);
    const WeightMainAttributeTypes = CharacterWeight.main[MainAttributeType];
    const WeightMainAttribute = WeightMainAttributeTypes[relic.main_affix.type as keyof typeof WeightMainAttributeTypes];
    const AttributeMain = ((relic.level+1)/16) * WeightMainAttribute * MultiplierMain;

    let SubAttributesResult = 0;
    let EffectiveAttributes = 0;

    for(const Sub of relic.sub_affix) {

      const WeightSubAttribute = CharacterWeight.weight[Sub.type as keyof typeof CharacterWeight.weight];
      const WeightAttribute = SubStatsMultipliers[Sub.type as keyof typeof SubStatsMultipliers];
      const SubValue = Sub.value*(Sub.percent ?100 :1);
      const SubAttributeResult = SubValue * WeightSubAttribute * WeightAttribute;

      console.log('-', Sub.name, Sub.display);
      console.log(SubAttributeResult.toFixed(2), WeightSubAttribute.toFixed(2),'\n');

      SubAttributesResult += SubAttributeResult;

      if(WeightSubAttribute>0)
        EffectiveAttributes++;

    }

    const Result = AttributeMain + (EffectiveAttributes * EffectiveAttributeBonus) + (SubAttributesResult * SubAttributeMultiplier);

    const Final = Result * MultiplierTotal;

    console.log('SubsStatsScore:', SubAttributesResult.toFixed(2), '/', MaxSubsStatsScore.toFixed(2));
    console.log('RANK:', getRelicRank(Final), 'SCORE:', Final.toFixed(2), '\n');

  }
}