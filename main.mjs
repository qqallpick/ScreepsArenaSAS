import { fightMode } from './fightMode';
import { runAction } from './runAction';
import { stats } from './stats';

export function loop() {
    //手动选择战术模式，可实现随机（但没必要）
    fightMode();

    //运行战术
    runAction();

    //监控当前状态
    stats();
}


