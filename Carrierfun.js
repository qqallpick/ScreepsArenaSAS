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


const body_carriers = [CARRY, MOVE, CARRY, MOVE];

//万能头

//搬运模块
export function Carrierfun() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my);
    let Container = getObjectsByPrototype(StructureContainer).filter(s => s.store[RESOURCE_ENERGY] > 0);
    Carrier = getObjectsByPrototype(Creep).filter(s => s.type == "Carrier");

    let closeContainer = findClosestByRange(mySpawn[0], Container);
    //console.log("Container", Container)
    //console.log("closeContainer", closeContainer)
    //console.log("Carry.length", Carrier.length)
    //console.log("Carrier[Carrier.length - 1]", Carrier[Carrier.length - 1])
    if (Carrier.length < 3) {
        let Carriermix = mySpawn[0].spawnCreep(body_carriers).object;
        //console.log("Carriermix", Carriermix)
        if (Carriermix) {
            Carriermix.type = "Carrier"
            //console.log("Carriermix", Carriermix)
        }
    }
    //console.log("Carrier.length", Carrier.length)
    if (Carrier.length > 0) {
        for (let i = 0; i < Carrier.length; i++) {
            //console.log("Carrier[i].store.getFreeCapacity(RESOURCE_ENERGY)", Carrier[i].store.getFreeCapacity(RESOURCE_ENERGY))
            if (Carrier[i].store.getFreeCapacity(RESOURCE_ENERGY)) {
                //console.log(Carrier[i].store[RESOURCE_ENERGY], Carrier[i].store.getCapacity())
                //console.log("Carrier[i].withdraw(closeContainer, RESOURCE_ENERGY)", Carrier[i].withdraw(closeContainer, RESOURCE_ENERGY))
                if (Carrier[i].withdraw(closeContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    Carrier[i].moveTo(closeContainer);
                }
            } else {
                //console.log("transfer", Carrier[i].transfer(mySpawn, RESOURCE_ENERGY))
                if (Carrier[i].transfer(mySpawn[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    Carrier[i].moveTo(mySpawn[0]);
                }
            }
        }
    }
}
