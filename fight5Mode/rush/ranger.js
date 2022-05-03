import '../../importAll';
import { isCreepBirth, canCreepAttck, isHaveCreep, isonthePos } from '../../utils';

export function ranger() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).find(s => s.my);
    let enemySpawn = getObjectsByPrototype(StructureSpawn).find(s => !s.my);
    let ranger = getObjectsByPrototype(Creep).filter(s => s.type == "ranger");
    let enemyCreeps_canAttack = getObjectsByPrototype(Creep).filter(s => !s.my && isCreepBirth(s) && canCreepAttck(s));
    let team1Pos = {}
    let team2Pos = {}
    //集结点设置
    if (mySpawn.ramPos == "左侧") {
        team1Pos = { x: mySpawn.x - 1, y: mySpawn.y }
        team2Pos = { x: mySpawn.x + 1, y: mySpawn.y }
    }
    else if (mySpawn.ramPos == "右侧") {
        team1Pos = { x: mySpawn.x + 1, y: mySpawn.y }
        team2Pos = { x: mySpawn.x - 1, y: mySpawn.y }
    }

    //移动逻辑
    for (let rangermix of ranger) {
        //敌人还有战斗力就龟缩
        if (enemyCreeps_canAttack.length > 0) {
            if (rangermix.onTeamPos != true && mySpawn.team1PosHold != true) {
                rangermix.moveTo(team1Pos)
                if (isonthePos(rangermix, team1Pos)) {
                    rangermix.onTeamPos = true
                    mySpawn.team1PosHold = true
                }
            }
            else if (rangermix.onTeamPos != true && mySpawn.team2PosHold != true) {
                rangermix.moveTo(team2Pos)
                if (isonthePos(rangermix, team2Pos)) {
                    rangermix.onTeamPos = true
                    mySpawn.team2PosHold = true
                }
            }
        }
        else {
            rangermix.moveTo(enemySpawn)
        }
    }

    //战斗逻辑
    for (let rangermix of ranger) {
        rangermix.rangedMassAttack()
    }
}




