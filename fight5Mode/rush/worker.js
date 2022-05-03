import '../../importAll';

export function worker() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my)[0];
    let worker = getObjectsByPrototype(Creep).filter(s => s.type == "worker");
    let container = getObjectsByPrototype(StructureContainer).filter(s => s.store[RESOURCE_ENERGY] > 0);
    let mySpawn_Container_findClosest = findClosestByRange(mySpawn, container);
    let myConstructionSite = getObjectsByPrototype(ConstructionSite).filter(s => s.my)
    if (worker.length > 0) {
        for (let workermix of worker) {
            if (getTicks() <= 300) {
                if (myConstructionSite.length > 0) {
                    //建造逻辑
                    if (!workermix.store[RESOURCE_ENERGY] > 0) {
                        let containerinHome = getObjectsByPrototype(StructureContainer).filter(s => s.store[RESOURCE_ENERGY] > 0 && getRange(mySpawn, s) <= 8);
                        let resource = getObjectsByPrototype(Resource).filter(i => i.resourceType == RESOURCE_ENERGY)
                        let workermix_containerinHome_findClosest = findClosestByRange(workermix, containerinHome);
                        if (workermix.withdraw(workermix_containerinHome_findClosest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            workermix.moveTo(workermix_containerinHome_findClosest);
                        }
                    } else {
                        let workermix_myConstructionSite_findClosest = findClosestByRange(workermix, myConstructionSite);
                        if (workermix.build(workermix_myConstructionSite_findClosest) == ERR_NOT_IN_RANGE) {
                            workermix.moveTo(workermix_myConstructionSite_findClosest);
                        }
                    }
                }
                else if (myConstructionSite.length == 0) {
                    if (workermix.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                        if (workermix.withdraw(mySpawn_Container_findClosest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            workermix.moveTo(mySpawn_Container_findClosest);
                        }
                    } else {
                        if (workermix.transfer(mySpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            workermix.moveTo(mySpawn);
                        }
                    }

                }
            }
            if (getTicks() > 300) {
                if (myConstructionSite.length > 0) {
                    //建造逻辑
                    if (!workermix.store[RESOURCE_ENERGY] > 0) {
                        let resource = getObjectsByPrototype(Resource).filter(i => i.resourceType == RESOURCE_ENERGY)
                        let workermix_resource_findClosest = findClosestByRange(workermix, resource);
                        let mySpawn_Container_findClosest = findClosestByRange(mySpawn, container);
                        let workermix_Container_findClosest = findClosestByRange(workermix, container);
                        if (workermix.pickup(workermix_resource_findClosest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            workermix.moveTo(workermix_resource_findClosest);
                        }
                        else if (workermix.withdraw(workermix_Container_findClosest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            workermix.moveTo(workermix_Container_findClosest);
                        }
                    } else {
                        let workermix_myConstructionSite_findClosest = findClosestByRange(workermix, myConstructionSite);
                        if (workermix.build(workermix_myConstructionSite_findClosest) == ERR_NOT_IN_RANGE) {
                            workermix.moveTo(workermix_myConstructionSite_findClosest);
                        }
                    }
                }
                else if (myConstructionSite.length == 0) {
                    if (workermix.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                        if (workermix.withdraw(mySpawn_Container_findClosest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            workermix.moveTo(mySpawn_Container_findClosest);
                        }
                    } else {
                        if (workermix.transfer(mySpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            workermix.moveTo(mySpawn);
                        }
                    }
                }
            }
        }
    }
}

