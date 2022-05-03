//战术选择的核心判断区域，进行决策和指挥
//目前只针对检测龟缩战术，如果是龟缩战术就转运营出大个体两人小队
import './importAll';
import { canCreepAttck, isCreepBirth } from './utils';

export const overmind = {}

export function runOvermind() {
    //let mySpawn = getObjectsByPrototype(StructureSpawn).find(s => s.my);
    let enemySpawn = getObjectsByPrototype(StructureSpawn).find(s => !s.my);
    //let enemyCreeps = getObjectsByPrototype(Creep).filter(s => !s.my && isCreepBirth(s));
    //let carrier = getObjectsByPrototype(Creep).filter(s => s.type == "carrier");
    //let attacker = getObjectsByPrototype(Creep).filter(s => s.type == "attacker");
    //let worker = getObjectsByPrototype(Creep).filter(s => s.type == "worker");
    //let ranger = getObjectsByPrototype(Creep).filter(s => s.type == "ranger");
    const fightTime = 320  //主动作战开始时间
    overmind.fightMode = 'rush'//默认战术
    //战争状态管理
    //时间相关
    //主动作战开始前的屯兵行为
    if (getTicks() < fightTime) {
        overmind.warStats = false
    }
    else {
        overmind.warStats = true
    }

    //针对策略
    if (getTicks() <= 100) {
        console.log("初步判断敌方战术：")
        //检测对方基地范围2格内的建筑情况
        //检测对方当前的work的数量
        //let constructionSite_in3Range = getObjectsByPrototype(ConstructionSite).filter(s => getRange(s, enemySpawn) <= 3 && !s.my)
        //let structure_in3Range = getObjectsByPrototype(Structure).filter(s => getRange(s, enemySpawn) <= 3 && !s.my)
        //console.log(constructionSiteNum[0])
        //overmind.constructionSiteNum_in3Range = constructionSite_in3Range
        //console.log("敌方工地数量：", constructionSite_in3Range.length)
        let constructionSiteWall = getObjectsByPrototype(ConstructionSite).filter(s => getRange(s, enemySpawn) <= 3 && !s.my && s.progressTotal == 100)
        let constructionSiteRampart = getObjectsByPrototype(ConstructionSite).filter(s => getRange(s, enemySpawn) <= 3 && !s.my && s.progressTotal == 200)
        //overmind.constructionSiteWallNum_in3Range = constructionSiteWall.length
        //overmind.constructionSiteRampartNum_in3Range = constructionSiteRampart.length
        //let constructionWall = getObjectsByPrototype(StructureWall).filter(s => getRange(s, enemySpawn) <= 3)
        //let constructionRampart = getObjectsByPrototype(StructureRampart).filter(s => getRange(s, enemySpawn) <= 3)
        //console.log(constructionWall[0])
        //console.log(constructionRampart[0])
        console.log("敌方Wall工地数量：", constructionSiteWall.length)
        console.log("敌方Ram工地数量：", constructionSiteRampart.length)
        let enemyDefensebuildingNum = constructionSiteWall.length + constructionSiteRampart.length
        console.log("防守建筑数量：", enemyDefensebuildingNum)
        if (enemyDefensebuildingNum >= 9) {
            console.log("敌方可能采用龟缩战术")
            overmind.enemyTactics = '龟缩'
        } else {
            console.log("敌方可能不是龟缩战术")
            overmind.enemyTactics = '待定'
        }
    }

    //战术模式选择
    //默认为红球rush
    //判断是否龟缩，如果龟缩了就采取运营战术
    if (overmind.enemyTactics == '龟缩') { overmind.fightMode = '运营' }
    else {
        overmind.fightMode = 'rush'
    }
}