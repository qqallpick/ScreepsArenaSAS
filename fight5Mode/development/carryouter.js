import '../../importAll';
import { setobstacleCarrier } from './setobstacleCarrier';

export function carryouter() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).find(s => s.my);
    let carrier = getObjectsByPrototype(Creep).filter(s => s.type == "carryouter");
    let container = getObjectsByPrototype(StructureContainer).filter(s => s.store[RESOURCE_ENERGY] > 0);
    let myExtension = getObjectsByPrototype(StructureExtension).filter(s => s.my && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
    let costs = new CostMatrix;
    costs = setobstacleCarrier(costs)

    //let attackermix_enemySpawn_findPath = findPath(attackermix, enemySpawn, { costMatrix: costs });
    for (let carriermix of carrier) {
        if (carriermix.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            let carriermix_Container_findClosest = findClosestByRange(carriermix, container);
            let resource = getObjectsByPrototype(Resource).filter(i => i.resourceType == RESOURCE_ENERGY && i.amount > 200)
            if (resource.length > 0) {
                let carriermix_resource_findClosest = findClosestByRange(carriermix, resource);
                if (carriermix.pickup(carriermix_resource_findClosest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    let carriermix_carriermix_resource_findClosest_findPath = findPath(carriermix, carriermix_resource_findClosest, { costMatrix: costs });
                    carriermix.moveTo(carriermix_carriermix_resource_findClosest_findPath[0]);
                }
            }
            else if (carriermix.withdraw(carriermix_Container_findClosest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                let carriermix_carriermix_Container_findClosest_findPath = findPath(carriermix, carriermix_Container_findClosest, { costMatrix: costs });
                carriermix.moveTo(carriermix_carriermix_Container_findClosest_findPath[0]);
            }
        } else {
            if (myExtension.length > 0) {
                let carriermix_myExtension_findClosest = findClosestByRange(carriermix, myExtension)
                if (carriermix.transfer(carriermix_myExtension_findClosest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    let carriermix_carriermix_myExtension_findClosest_findPath = findPath(carriermix, carriermix_myExtension_findClosest, { costMatrix: costs });
                    carriermix.moveTo(carriermix_carriermix_myExtension_findClosest_findPath[0]);
                }
            }
            else if (carriermix.transfer(mySpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                let carriermix_mySpawn_findPath = findPath(carriermix, mySpawn, { costMatrix: costs });
                carriermix.moveTo(carriermix_mySpawn_findPath[0]);
            }
        }
    }

}
