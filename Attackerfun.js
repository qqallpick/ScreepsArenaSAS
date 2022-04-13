//万能头
import { getObjectsByPrototype, findClosestByRange, findInRange } from '/game/utils';
import { Creep, StructureSpawn, Source, StructureContainer } from '/game/prototypes';
import { MOVE, CARRY, WORK, ATTACK, RANGED_ATTACK, HEAL, RESOURCE_ENERGY, ERR_NOT_IN_RANGE } from '/game/constants';
import { } from '/arena';
import { getTicks } from '/game';

let Har = [];
let Attacker = [];
let Carrier = [];
let Allinoner = [];


const body_attackers = [MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK];

//万能头

export function Attackerfun() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my);
    let myContainer = getObjectsByPrototype(StructureContainer).filter(s => s.my);
    let Container = getObjectsByPrototype(StructureContainer).filter(s => s.store[RESOURCE_ENERGY] > 0);
    let source = getObjectsByPrototype(Source).filter(s => s.energy > 0);
    let enemyCreeps = getObjectsByPrototype(Creep).filter(s => !s.my);
    let enemySpawn = getObjectsByPrototype(StructureSpawn).filter(s => !s.my);
    Har = getObjectsByPrototype(Creep).filter(s => s.type == "Harvester");
    Attacker = getObjectsByPrototype(Creep).filter(s => s.type == "Attacker");
    Carrier = getObjectsByPrototype(Creep).filter(s => s.type == "Carrier");


    console.log("Attacker.length", Attacker.length)
    console.log("Attacker[0]", Attacker[0])
    if (Attacker.length < 3 && (Har.length >= 5 || Carrier.length >= 4)) {
        let ATKmix = mySpawn[0].spawnCreep(body_attackers).object;
        console.log("ATKmix", ATKmix)
        if (ATKmix) {
            ATKmix.type = "Attacker"
            console.log("ATKmix", ATKmix)
        }
    }

    if (Attacker.length > 0) {
        if (getTicks() <= 100) {
            for (let i = 0; i < Attacker.length; i++) {
                console.log(i)
                if (Attacker[i]) {
                    Attacker[i].moveTo({ x: (mySpawn[0].x), y: (mySpawn[0].y + 6) });
                }
            }
        }
        else if (getTicks() > 100) {
            for (let i = 0; i < Attacker.length; i++) {
                //let closeenemyCreep = findClosestByRange(Attacker[i], enemyCreeps);
                //console.log("enemyCreeps", enemyCreeps)
                //console.log("closeenemyCreep", closeenemyCreep)
                //console.log(i)
                if (Attacker[i]) {
                    //console.log(Attacker[i].attack(closeenemyCreep));
                    if (Attacker[i].attack(enemySpawn[0]) == ERR_NOT_IN_RANGE) {
                        Attacker[i].moveTo(enemySpawn[0]);
                    }
                    // else if (Attacker[i].attack(closeenemyCreep) == ERR_NOT_IN_RANGE) {
                    //     Attacker[i].moveTo(closeenemyCreep);
                    // }
                }
            }
        }

    }
}