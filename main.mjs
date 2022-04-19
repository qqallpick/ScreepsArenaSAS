/*
**作者：马作的卢飞快
**邮箱：allpick@qq.com
**说明：开源本代码
**如果在本代码基础上再开发
**需公开所有代码
**仅使用部分代码也必须公开所有代码
**授权所有未改动代码的使用
*/

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


