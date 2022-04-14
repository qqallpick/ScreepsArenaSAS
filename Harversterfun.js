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

const body_workers = [WORK, CARRY, MOVE];
const body_attackers = [MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK];
const body_carriers = [CARRY, CARRY, MOVE];
const body_allinoners = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK, HEAL];
//万能头
 
// 挖矿模块
export function Harversterfun() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my);
    let myContainer = getObjectsByPrototype(StructureContainer).filter(s => s.my);
    let Container = getObjectsByPrototype(StructureContainer).filter(s => s.store[RESOURCE_ENERGY] > 0);
    let source = getObjectsByPrototype(Source).filter(s => s.energy > 0);
    let enemyCreeps = getObjectsByPrototype(Creep).filter(s => !s.my);
    let enemySpawn = getObjectsByPrototype(StructureSpawn).filter(s => !s.my);

    Har = getObjectsByPrototype(Creep).filter(s => s.type == "Harvester");
    Attacker = getObjectsByPrototype(Creep).filter(s => s.type == "Attacker");
    Carrier = getObjectsByPrototype(Creep).filter(s => s.type == "Carrier");
    console.log("Har.length", Har.length)
    console.log("Har[Har.length - 1]", Har[Har.length - 1])
    if (Har.length < 0) {
        let mix = mySpawn[0].spawnCreep(body_workers).object;
        console.log("mix", mix)
        if (mix) {
            mix.type = "Harvester"
            console.log("mix", mix)
        }
    }
    console.log("Har.length", Har.length)
    if (Har.length > 0) {
        for (let i = 0; i < Har.length; i++) {
            console.log("Har[i].store.getFreeCapacity(RESOURCE_ENERGY)", Har[i].store.getFreeCapacity(RESOURCE_ENERGY))
            if (Har[i].store.getFreeCapacity(RESOURCE_ENERGY)) {
                console.log(Har[i].store[RESOURCE_ENERGY], Har[i].store.getCapacity())
                if (Har[i].harvest(source[0]) == ERR_NOT_IN_RANGE) {
                    Har[i].moveTo(source[0]);
                }
                else {
                    if (Har[i].withdraw(Container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        Har[i].moveTo(Container[0]);
                    }
                }
            } else {
                console.log("transfer", Har[i].transfer(mySpawn, RESOURCE_ENERGY))
                if (Har[i].transfer(mySpawn[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    Har[i].moveTo(mySpawn[0]);
                }
            }
        }
    }

}
