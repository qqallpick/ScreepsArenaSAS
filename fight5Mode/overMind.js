//战术选择的核心判断区域，进行决策和指挥

import '../importAll';
import { canCreepAttck, isCreepBirth } from '../utils';

export const overmind = {}

export function runOvermind() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).find(s => s.my);
    let enemySpawn = getObjectsByPrototype(StructureSpawn).find(s => !s.my);
    let enemyCreeps = getObjectsByPrototype(Creep).filter(s => !s.my && isCreepBirth(s));
    let carrier = getObjectsByPrototype(Creep).filter(s => s.type == "carrier");
    let attacker = getObjectsByPrototype(Creep).filter(s => s.type == "attacker");
    let worker = getObjectsByPrototype(Creep).filter(s => s.type == "worker");
    let ranger = getObjectsByPrototype(Creep).filter(s => s.type == "ranger");
    const fightTime = 320  //主动作战开始时间

    //战争状态管理
    //时间相关
    if (getTicks() < fightTime) {
        overmind.warStats = false
    }
    else {
        overmind.warStats = true
    }

    //针对策略
    if (getTicks() <= 25) {
        console.log("初步判断敌方战术：")
        //检测对方基地范围2格内的建筑情况
        //检测对方当前的work、attack和rangeAttack的数量
        let constructionSiteNum = getObjectsByPrototype(ConstructionSite).filter(s => getRange(s, enemySpawn) <= 3 && !s.my)
        //console.log(constructionSiteNum[0])
        overmind.constructionSiteNum_in3Range = constructionSiteNum.length
        console.log("敌方工地数量：", overmind.constructionSiteNum_in3Range)
        let constructionSiteWallNum = getObjectsByPrototype(ConstructionSite).filter(s => getRange(s, enemySpawn) <= 3 && !s.my && s.progressTotal == 100)
        let constructionSiteRampartNum = getObjectsByPrototype(ConstructionSite).filter(s => getRange(s, enemySpawn) <= 3 && !s.my && s.progressTotal == 200)
        overmind.constructionSiteWallNum_in3Range = constructionSiteWallNum.length
        overmind.constructionSiteRampartNum_in3Range = constructionSiteRampartNum.length
        console.log("敌方Wall工地数量：", overmind.constructionSiteWallNum_in3Range)
        console.log("敌方Ram工地数量：", overmind.constructionSiteRampartNum_in3Range)
        let enemyDefensebuildingNum = overmind.constructionSiteRampartNum_in3Range + overmind.constructionSiteWallNum_in3Range
        console.log("防守建筑数量：", enemyDefensebuildingNum)
        if (enemyDefensebuildingNum >= 9) {
            console.log("敌方可能采用龟缩战术")
            overmind.enemyTactics = '龟缩'
        } else {
            console.log("敌方可能不是龟缩战术")
            overmind.enemyTactics = '待定'
        }
    }
    else if (getTicks() > 25 && getTicks() <= 100 && overmind.enemyTactics == '待定') {
        console.log("二次判断敌方战术：")
        //检测是否有攻击单位
        for (let enemyCreepsmix of enemyCreeps) {
            if (canCreepAttck(enemyCreepsmix)) {
                console.log("敌方可能采用rush战术")
                overmind.enemyTactics = 'rush'
            }
        }
    }
}