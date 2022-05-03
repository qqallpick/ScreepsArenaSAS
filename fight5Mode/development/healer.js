import '../../importAll';
import { findLowestHits } from '../../utils';

export function healer() {
    let attacker = getObjectsByPrototype(Creep).filter(s => s.type == "attacker");
    let healer = getObjectsByPrototype(Creep).filter(s => s.type == "healer");
    let myCreepsInjured = getObjectsByPrototype(Creep).filter(i => i.my && i.hits < i.hitsMax);

    //移动逻辑，跟随最近的红球
    for (let healermix of healer) {
        let healermix_attacker_findClosest = findClosestByRange(healermix, attacker)
        healermix.moveTo(healermix_attacker_findClosest)
    }

    //治疗逻辑，红球有伤治疗红球，其他时候治疗自己
    //攻击的同时判断有没有需要Heal的友军，没有的话就Heal自己
    for (let healermix of healer) {
        let healermix_myCreepsInjured_findIn1Range = findInRange(healermix, myCreepsInjured, 1)
        if (healermix_myCreepsInjured_findIn1Range.length > 0) {
            let healermix_myCreepsInjured_findIn1Range_findLowestHits = findLowestHits(healermix_myCreepsInjured_findIn1Range)
            healermix.heal(healermix_myCreepsInjured_findIn1Range_findLowestHits)
        }
        else {
            healermix.heal(healermix)
        }
    }
}

