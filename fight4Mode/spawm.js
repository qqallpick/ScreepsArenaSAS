import '../importAll';
import { createSite, getLeastDuplicateItems } from '../utils';

export function spawm() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).find(s => s.my);
    let enemySpawn = getObjectsByPrototype(StructureSpawn).find(s => !s.my);
    let carrier = getObjectsByPrototype(Creep).filter(s => s.type == "carrier");
    let attacker = getObjectsByPrototype(Creep).filter(s => s.type == "attacker");
    let worker = getObjectsByPrototype(Creep).filter(s => s.type == "worker");
    let ranger = getObjectsByPrototype(Creep).filter(s => s.type == "ranger");

    //体型数据
    const body_carriers = [MOVE, CARRY, MOVE, CARRY];
    const body_allinoners = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, HEAL];
    const body_attackers = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK];
    const body_workers = [WORK, CARRY, MOVE];
    const body_dropers = [CARRY, CARRY, CARRY, MOVE];
    const body_ers = [TOUGH];
    const body_rangers = [MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK];

    //主动作战开始时间
    const fightTime = 320

    //基地位置判断
    mySpawn.ramPos = mySpawn.x > 50 ? "右侧" : "左侧"

    //建筑相关
    myLogo();
    buildSpawmProject();

    //出生顺序管理
    if (getTicks() <= fightTime) {
        if (carrier.length < 2) {
            let carriermix = mySpawn.spawnCreep(body_carriers).object;
            if (carriermix) {
                carriermix.type = "carrier"
                carriermix.num = carrier.length
            }
        }
        else if (ranger.length < 2) {
            let rangermix = mySpawn.spawnCreep(body_rangers).object;
            if (rangermix) {
                rangermix.type = "ranger"
                rangermix.num = ranger.length
            }
        }
        else if (worker.length < 1) {
            let workermix = mySpawn.spawnCreep(body_workers).object;
            if (workermix) {
                workermix.type = "worker"
                workermix.num = worker.length
            }
        }
        else if (attacker.length < 5) {
            let attackermix = mySpawn.spawnCreep(body_attackers).object;
            if (attackermix) {
                attackermix.type = "attacker"
                attackermix.num = attackermix.length
                attackermix.flagNum = 1
                attackermix.teamLeader = false
                attackermix.teamNow = false
            }
        }
    }
    if (getTicks() > fightTime) {
        if (carrier.length < 1) {
            let carriermix = mySpawn.spawnCreep(body_carriers).object;
            if (carriermix) {
                carriermix.type = "carrier"
                carriermix.num = carrier.length
            }
        }
        else if (attacker.length < 99) {
            let attackermix = mySpawn.spawnCreep(body_attackers).object;
            if (attackermix) {
                attackermix.type = "attacker"
                attackermix.num = attackermix.length
                attackermix.flagNum = 1
                attackermix.teamLeader = false
                attackermix.teamNow = false
            }
        }
    }

    //战争状态管理
    //时间相关
    if (getTicks() < fightTime) {
        mySpawn.warStats = false
    }
    else {
        mySpawn.warStats = true
    }
    //敌人相关
    //基地下面画个坦克开炮
    function myLogo() {
        let ball1 = getObjectsByPrototype(ConstructionSite).find(s => s.x == enemySpawn.x && s.y == enemySpawn.y + 7 && s.my);
        let ball2 = getObjectsByPrototype(ConstructionSite).find(s => s.x == enemySpawn.x && s.y == enemySpawn.y + 5 && s.my);
        let ball3 = getObjectsByPrototype(ConstructionSite).find(s => s.x == enemySpawn.x && s.y == enemySpawn.y + 3 && s.my);
        let ball4 = getObjectsByPrototype(ConstructionSite).find(s => s.x == enemySpawn.x && s.y == enemySpawn.y + 1 && s.my);
        if (mySpawn.ball == undefined) {
            createSite({ x: enemySpawn.x, y: enemySpawn.y + 7 }, StructureRampart)
            mySpawn.ball = 1
        }
        else if (mySpawn.ball == 1) {
            if (ball1) {
                ball1.remove();
            }
            createSite({ x: enemySpawn.x, y: enemySpawn.y + 5 }, StructureRampart)
            mySpawn.ball = 2
        }
        else if (mySpawn.ball == 2) {
            if (ball2) {
                ball2.remove();
            }
            createSite({ x: enemySpawn.x, y: enemySpawn.y + 3 }, StructureRampart)
            mySpawn.ball = 3
        }
        else if (mySpawn.ball == 3) {
            if (ball3) {
                ball3.remove();
            }
            createSite({ x: enemySpawn.x, y: enemySpawn.y + 1 }, StructureRampart)
            mySpawn.ball = 4
        }
        else if (mySpawn.ball == 4) {
            if (ball4) {
                ball4.remove();
            }
            createSite({ x: enemySpawn.x + 1, y: enemySpawn.y + 1 }, StructureRampart)
            createSite({ x: enemySpawn.x + 1, y: enemySpawn.y - 1 }, StructureRampart)
            createSite({ x: enemySpawn.x - 1, y: enemySpawn.y + 1 }, StructureRampart)
            createSite({ x: enemySpawn.x - 1, y: enemySpawn.y - 1 }, StructureRampart)
            mySpawn.ball = 5
        }

        else if (mySpawn.ball == 5) {
            let ball6 = getObjectsByPrototype(ConstructionSite).find(s => s.x == enemySpawn.x + 1 && s.y == enemySpawn.y + 1 && s.my);
            let ball7 = getObjectsByPrototype(ConstructionSite).find(s => s.x == enemySpawn.x + 1 && s.y == enemySpawn.y - 1 && s.my);
            let ball8 = getObjectsByPrototype(ConstructionSite).find(s => s.x == enemySpawn.x - 1 && s.y == enemySpawn.y + 1 && s.my);
            let ball9 = getObjectsByPrototype(ConstructionSite).find(s => s.x == enemySpawn.x - 1 && s.y == enemySpawn.y - 1 && s.my);
            if (ball4) {
                ball4.remove();
            }
            if (ball6) {
                ball6.remove();
            }
            if (ball7) {
                ball7.remove();
            }
            if (ball8) {
                ball8.remove();
            }
            if (ball9) {
                ball9.remove();
            }
            createSite({ x: enemySpawn.x, y: enemySpawn.y + 7 }, StructureRampart)
            mySpawn.ball = 1
        }
        let markPos1 = [
            { x: enemySpawn.x, y: enemySpawn.y + 9 },
            { x: enemySpawn.x, y: enemySpawn.y + 10 },
            { x: enemySpawn.x + 1, y: enemySpawn.y + 10 },
            { x: enemySpawn.x + 1, y: enemySpawn.y + 11 },
            { x: enemySpawn.x - 1, y: enemySpawn.y + 10 },
            { x: enemySpawn.x - 1, y: enemySpawn.y + 11 },
        ]
        for (let i of markPos1) {
            createSite(i, StructureRampart)
        }
    }

    function buildSpawmProject() {
        //先检测基地
        //安放Rampart
        createSite({ x: mySpawn.x, y: mySpawn.y }, StructureRampart)
        if (mySpawn.ramPos == "左侧") {
            createSite({ x: mySpawn.x - 1, y: mySpawn.y }, StructureRampart)
            createSite({ x: mySpawn.x + 1, y: mySpawn.y }, StructureRampart)
        } else if (mySpawn.ramPos == "右侧") {
            createSite({ x: mySpawn.x + 1, y: mySpawn.y }, StructureRampart)
            createSite({ x: mySpawn.x - 1, y: mySpawn.y }, StructureRampart)
        }

    }
}
