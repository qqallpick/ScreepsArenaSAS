import '../../importAll';
import { isCreepBirth, canCreepAttck } from '../../utils';
import { setobstacle } from './setobstacle';
import { setobstaclegoto } from './setobstaclegoto';
import { Visual } from 'game/visual'

export function attacker() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my)[0];
    let enemyCreeps = getObjectsByPrototype(Creep).filter(s => !s.my && isCreepBirth(s));
    let enemyCreeps_canAttack = getObjectsByPrototype(Creep).filter(s => !s.my && isCreepBirth(s) && canCreepAttck(s));
    let enemySpawn = getObjectsByPrototype(StructureSpawn).find(s => !s.my);
    let teamPos = {}
    let costs = new CostMatrix;
    let costsgogogo = new CostMatrix;
    let attacker = getObjectsByPrototype(Creep).filter(s => s.type == "attacker");

    //设置costmatrix
    costs = setobstacle(costs)
    costsgogogo = setobstaclegoto(costsgogogo)
    //显示寻路cost
    //runCostVisual(costs)

    //runAttackerCostVisual(costsgogogo)
    //集结点设置
    if (mySpawn.ramPos == "左侧") {
        teamPos = { x: mySpawn.x + 3, y: mySpawn.y }
    }
    else if (mySpawn.ramPos == "右侧") {
        teamPos = { x: mySpawn.x - 3, y: mySpawn.y }
    }
    //移动逻辑,队长走位
    //出门直奔对面离我基地最近的敌人，杀光了再推对面基地
    for (let attackermix of attacker) {
        //没有开始推进的时候，到集结点待命
        if (!mySpawn.warStats) {
            attackermix.moveTo(teamPos)
        }
        else if (mySpawn.warStats) {
            if (enemyCreeps_canAttack.length > 0 && getRange(attackermix, findClosestByRange(attackermix, enemyCreeps_canAttack)) <= 6) {
                let attackermix_enemySpawn_findPath = findPath(attackermix, enemySpawn, { costMatrix: costs });
                attackermix.moveTo(attackermix_enemySpawn_findPath[0])
            } else {
                let attackermix_enemySpawn_findPath = findPath(attackermix, enemySpawn, { costMatrix: costsgogogo });
                attackermix.moveTo(attackermix_enemySpawn_findPath[0])
            }
        }
    }

    //战斗逻辑
    //1格内有敌人就打敌人，没有敌人默认打建筑
    for (let attackermix of attacker) {
        if (enemyCreeps.length > 0 && getRange(attackermix, enemySpawn) > 1) {
            let attackermix_enemyCreeps_findClosest = findClosestByRange(attackermix, enemyCreeps)
            let attackermix_enemyCreepsClosest_getRange = getRange(attackermix, attackermix_enemyCreeps_findClosest);
            if (attackermix_enemyCreepsClosest_getRange <= 1) {
                attackermix.attack(attackermix_enemyCreeps_findClosest)
            }
            else {
                attackermix.attack(enemySpawn)
            }
        }
        else {
            attackermix.attack(enemySpawn)
        }
    }

    //显示attacker身边的寻路cost
    //runAttackerCostVisual(costsgogogo)
    //runAttackerCostVisual(costs)
}

function runAttackerCostVisual(costs) {
    //显示attacker周围的cost
    //以{x:attacker.x,y:attacker.y}为中心
    //需要显示区域的准备
    let posalready = []
    //console.log(posalready)
    let attacker = getObjectsByPrototype(Creep).filter(s => s.type == "attacker" && isCreepBirth(s));
    if (attacker.length > 0) {
        for (let attackermix of attacker) {
            for (let x = attackermix.x - 10; x < attackermix.x + 10; x++) {
                for (let y = attackermix.y - 10; y < attackermix.y + 10; y++) {
                    let costsNum = costs.get(x, y)
                    if (costsNum == undefined || costsNum == 255) {
                        //如果值为undefined或者255或者显示过的坐标就不显示了,不记录
                    }
                    else if (costsNum != undefined && costsNum != 255) {
                        //这里的坐标要显示，记录到数组中去
                        let posMark = [x, y]
                        //console.log("xianshiguodezuobiao", xianshiguodezuobiao)
                        posalready.push(posMark.toString())
                    }
                }
            }
        }
    }

    //数组去重
    //console.log("posalready", posalready.length)
    let newpos = []
    for (let posalreadymix of posalready) {
        if (!newpos.includes(posalreadymix)) {
            newpos.push(posalreadymix)
        }
    }

    //console.log("newpos", newpos.length)

    //显示
    for (let arrmixmark of newpos) {
        //console.log(arrmixmark)
        let arrmix = arrmixmark.split(',');
        //console.log(arrmix)
        let costsNum = costs.get(Number(arrmix[0]), Number(arrmix[1]))
        new Visual().text(costsNum, { x: Number(arrmix[0]), y: Number(arrmix[1]) + 0.25 }, { font: 0.5, opacity: 0.8, color: '#F8F8FF' })
    }
}

