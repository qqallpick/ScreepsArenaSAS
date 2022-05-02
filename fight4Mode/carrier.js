import '../importAll';
import { setobstacleCarrier } from './setobstacleCarrier';

export function carrier() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).find(s => s.my);
    let carrier = getObjectsByPrototype(Creep).filter(s => s.type == "carrier");
    let container = getObjectsByPrototype(StructureContainer).filter(s => s.store[RESOURCE_ENERGY] > 0);
    let myExtension = getObjectsByPrototype(StructureExtension).filter(s => s.my && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
    let myContainer = getObjectsByPrototype(StructureContainer).filter(s => s.store[RESOURCE_ENERGY] > 0 && getRange(mySpawn, s) <= 5);
    let costs = new CostMatrix;
    costs = setobstacleCarrier(costs)

    //逻辑回归单纯的拿取和放下
    if (carrier.length > 0 && myContainer.length > 0) {
        for (let carriermix of carrier) {
            if (carriermix.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                let carriermix_Container_findClosest = findClosestByRange(carriermix, container);
                if (carriermix.withdraw(carriermix_Container_findClosest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    carriermix.moveTo(carriermix_Container_findClosest);
                }
            } else {
                //保留extension的逻辑
                let carriermix_myExtension_findClosest = findClosestByRange(carriermix, myExtension)
                if (carriermix.transfer(carriermix_myExtension_findClosest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    carriermix.moveTo(carriermix_myExtension_findClosest);
                }
                else if (carriermix.transfer(mySpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    carriermix.moveTo(mySpawn);
                }
            }
        }
    }
    //如果自己基地内的罐子被拿完了
    //就附带拣地上能量的能力
    else if (carrier.length > 0 && myContainer.length <= 0) {
        //let attackermix_enemySpawn_findPath = findPath(attackermix, enemySpawn, { costMatrix: costs });
        for (let carriermix of carrier) {
            if (carriermix.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                let carriermix_Container_findClosest = findClosestByRange(carriermix, container);
                let resource = getObjectsByPrototype(Resource).filter(i => i.resourceType == RESOURCE_ENERGY)
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
}
