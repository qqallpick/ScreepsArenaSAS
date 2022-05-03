import '../../importAll';
import { setobstacleCarrier } from './setobstacleCarrier';

export function dropouter() {
    let enemySpawn = getObjectsByPrototype(StructureSpawn).find(s => !s.my);
    let dropouter = getObjectsByPrototype(Creep).filter(s => s.type == "dropouter");
    let costs = new CostMatrix;
    costs = setobstacleCarrier(costs)

    //逻辑回归单纯的拿取和放下
    if (dropouter.length > 0) {
        let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my)[0];
        //只有一个工作，就是从container中拿能量，然后丢在地上
        //但是不拿基地范围内8格的container能量
        //效率还可以，但是得考虑野外作业的危险性
        for (let dropoutermix of dropouter) {
            if (dropoutermix.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                let outContainer = getObjectsByPrototype(StructureContainer).filter(s => s.store[RESOURCE_ENERGY] > 0 && getRange(mySpawn, s) > 8 && getRange(enemySpawn, s) > 8);
                let dropoutermix_outContainer_findClosest = findClosestByRange(dropoutermix, outContainer);
                if (dropoutermix.withdraw(dropoutermix_outContainer_findClosest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    dropoutermix.moveTo(dropoutermix_outContainer_findClosest);
                }
            } else {
                dropoutermix.drop(RESOURCE_ENERGY)
            }
        }
    }
}
