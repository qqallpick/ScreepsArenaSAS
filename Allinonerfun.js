//万能头
import { getObjectsByPrototype, findClosestByRange, findInRange, getRange } from '/game/utils';
import { Creep, StructureSpawn, Source, StructureContainer } from '/game/prototypes';
import { MOVE, CARRY, WORK, ATTACK, RANGED_ATTACK, HEAL, RESOURCE_ENERGY, ERR_NOT_IN_RANGE } from '/game/constants';
import { } from '/arena';
import { getTicks } from '/game';

let Har = [];
let Attacker = [];
let Carrier = [];
//let Allinoner = [];

const body_allinoners = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK, HEAL];
//万能头


//一体机模块;
export function Allinonerfun() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my);
    let myContainer = getObjectsByPrototype(StructureContainer).filter(s => s.my);
    let Container = getObjectsByPrototype(StructureContainer).filter(s => s.store[RESOURCE_ENERGY] > 0);
    let source = getObjectsByPrototype(Source).filter(s => s.energy > 0);
    let enemyCreeps = getObjectsByPrototype(Creep).filter(s => !s.my);
    let myCreeps = getObjectsByPrototype(Creep).filter(s => s.my);
    let enemySpawn = getObjectsByPrototype(StructureSpawn).filter(s => !s.my);
    Har = getObjectsByPrototype(Creep).filter(s => s.type == "Harvester");
    Attacker = getObjectsByPrototype(Creep).filter(s => s.type == "Attacker");
    Carrier = getObjectsByPrototype(Creep).filter(s => s.type == "Carrier");
    let Allinoner = getObjectsByPrototype(Creep).filter(s => s.type == "Allinoner");
    let Allinonerbefore = getObjectsByPrototype(Creep).filter(s => s.type == "Allinoner" && s.birthtime == "before");
    let Allinonerafter = getObjectsByPrototype(Creep).filter(s => s.type == "Allinoner" && s.birthtime == "after");
    let aio_team_false = getObjectsByPrototype(Creep).filter(s => s.type == "Allinoner" && s.team == "false");
    let aio_team_true = getObjectsByPrototype(Creep).filter(s => s.type == "Allinoner" && s.team == "true");
    console.log("Allinoner.length", Allinoner.length)
    console.log("Allinoner[0]", Allinoner[0])

    //出生和时间标签
    if (getTicks() < 200) {
        if (Allinoner.length < 20 && (Har.length >= 5 || Carrier.length >= 3) && Attacker.length >= 0) {
            let Allinonermix = mySpawn[0].spawnCreep(body_allinoners).object;
            console.log("Allinonermix", Allinonermix)
            if (Allinonermix) {
                Allinonermix.type = "Allinoner"
                Allinonermix.flagnum = 1
                Allinonermix.birthtime = "before"
                Allinonermix.team = false
                console.log("Allinonermix", Allinonermix)
            }
        }
    }
    else {
        if (Allinoner.length < 20 && (Har.length >= 5 || Carrier.length >= 3) && Attacker.length >= 0) {
            let Allinonermix = mySpawn[0].spawnCreep(body_allinoners).object;
            console.log("Allinonermix", Allinonermix)
            if (Allinonermix) {
                Allinonermix.type = "Allinoner"
                Allinonermix.flagnum = 1
                Allinonermix.birthtime = "after"
                Allinonermix.team = false
                console.log("Allinonermix", Allinonermix)
            }
        }
    }
    //行为逻辑
    if (Allinoner.length > 0) {
        //抱团判断
        if (getTicks() <= 10) {
            for (let aio of Allinoner) {
                //console.log(i)
                if (aio) {
                    if (mySpawn[0].x > 50) {
                        aio.moveTo({ x: (mySpawn[0].x - 3), y: (mySpawn[0].y) });
                    } else {
                        aio.moveTo({ x: (mySpawn[0].x + 3), y: (mySpawn[0].y) });
                    }

                }
            }
        }
        else if (getTicks() > 10) {
            for (let aio of Allinoner) {
                let enemyCreepsin4 = findInRange(aio, enemyCreeps, 4)
                let enemyCreepsin3 = findInRange(aio, enemyCreeps, 3)
                let enemyCreepsin2 = findInRange(aio, enemyCreeps, 2)
                //let myCreepsin3 = findInRange(aio, myCreeps, 3)
                let myCreepsin1 = findInRange(aio, myCreeps.filter(s => s != aio), 1)
                let closeenemyCreep = findClosestByRange(aio, enemyCreeps)
                //抱团逻辑
                if (myCreepsin1.length > 0 && enemyCreepsin3.length > 0) {
                    aio.team = true
                }
                else {
                    aio.team = false
                }
                //根据抱团逻辑分为抱团和单人行为模式，移动逻辑
                //单人模式
                if (aio.team == false) {
                    if (enemyCreepsin3.length > 0) {
                        if (aio.flagnum == 1) {
                            aio.moveTo({ x: 50, y: 50 })
                        }
                        else if (aio.flagnum == 2) {
                            aio.moveTo({ x: (mySpawn[0].x + 2), y: (mySpawn[0].y + 5) })
                        }
                        if (aio.x >= 45 && aio.x <= 55 && aio.y >= 45 && aio.y <= 55) {
                            aio.flagnum = 2
                        }
                        else if (aio.x == (mySpawn[0].x + 2) && aio.y == (mySpawn[0].y + 5)) {
                            aio.flagnum = 1
                        }
                    }
                    // else if (enemyCreepsin3.length > 0 && enemyCreepsin2.length == 0) {
                    //     //不动
                    // } 
                    else {
                        aio.moveTo(enemySpawn[0])
                    }
                }
                //抱团模式
                if (aio.team == true) {
                    for (let i of aio_team_true) {
                        if (enemyCreepsin3.length > 0) {
                            if (i.flagnum == 1) {

                                i.moveTo({ x: 50, y: 50 })

                            }
                            else if (i.flagnum == 2) {

                                i.moveTo({ x: (mySpawn[0].x + 2), y: (mySpawn[0].y + 5) })

                            }
                            if (i.x >= 45 && i.x <= 55 && i.y >= 45 && i.y <= 55) {

                                i.flagnum = 2

                            }
                            else if (i.x == (mySpawn[0].x + 2) && i.y == (mySpawn[0].y + 5)) {

                                i.flagnum = 1

                            }
                        }

                        // else if (enemyCreepsin3.length > 0 && enemyCreepsin2.length == 0) {
                        //     //不动
                        // } 
                        else {
                            aio.moveTo(enemySpawn[0])
                        }
                    }
                }

                //攻击逻辑
                if (aio.rangedAttack(enemySpawn[0]) == 0) {
                    aio.rangedAttack(enemySpawn[0])
                }
                else if (enemyCreepsin3.length > 0) {
                    let closestTarget = findClosestByRange(aio, enemyCreepsin3);
                    let lowestTarget = findlowesthits(enemyCreepsin3);
                    if (lowestTarget) {
                        let range = getRange(aio, lowestTarget);
                        if (range <= 1) {
                            aio.rangedMassAttack(lowestTarget)
                        }
                        else {
                            aio.rangedAttack(lowestTarget)
                        }
                    }

                }
                //治疗逻辑
                if (aio.hits < aio.hitsMax) {
                    aio.heal(aio)
                }
                else {
                    let lowhitsmyCreeps = getObjectsByPrototype(Creep).filter(i => i.my && i.hits < i.hitsMax);
                    console.log("lowhitsmyCreeps", lowhitsmyCreeps)
                    if (lowhitsmyCreeps.length > 0) {
                        let lowhitsmyCreepsin3 = findInRange(aio, lowhitsmyCreeps, 3)
                        let lowhitsmyCreepsin1 = findInRange(aio, lowhitsmyCreeps, 1)
                        //let closestTarget = findClosestByRange(aio, lowhitsmyCreeps);
                        //console.log("closestTarget", closestTarget)
                        if (lowhitsmyCreepsin3.length > 0) {
                            let rangeheal = getRange(aio, lowhitsmyCreepsin3[0]);
                            console.log("rangeheal", rangeheal)
                            if (lowhitsmyCreepsin1.length > 0) {
                                aio.heal(lowhitsmyCreepsin1[0])
                                console.log("aio.heal(lowhitsmyCreepsin1[0])", aio.heal(lowhitsmyCreepsin1[0]))
                            }
                            else {
                                aio.rangedHeal(lowhitsmyCreepsin3[0])
                                console.log("aio.rangedHeal(lowhitsmyCreepsin3[0])", aio.rangedHeal(lowhitsmyCreepsin3[0]))
                            }
                        }
                    }
                }
            }
        }
    }
    function findlowesthits(creeps) {
        let bar = creeps[0];
        for (let i of creeps) {
            if (i.hits < bar.hits) {
                bar = i
            }
        }
        return bar
    }
}