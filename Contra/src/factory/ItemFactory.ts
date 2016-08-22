module tank {
    export class ItemFactory {
        constructor() {

        }

        static createItem(buildId:number, side:number):tank.BaseItem {
            var cfg:IConfig = RES.getRes("itemCfg_json")[buildId];
            switch (cfg.type) {
                case one.ItemType.BUILD:
                    var buildType = cfg.subType || 1;
                    if (buildType == tank.BuildType.TANk) {
                        return new one.Tank(buildId, side, false);
                    }
                    else if (buildType == tank.BuildType.TOWER) {
                        return new tank.Tower(buildId, side);
                    }
                    else if (buildType == tank.BuildType.HEADQUARTER) {
                        return new tank.Headquarter(buildId, side);
                    }
                    else if (buildType == tank.BuildType.MagneticTower) {
                        return new tank.MagneticTower(buildId, side);
                    }

                    return new one.Stone(buildId, side);
                case one.ItemType.BULLET:
                    var bulletType = cfg.subType || 1;
                    if (bulletType == tank.BulletType.MINE) {
                        return new one.Mine(buildId, side);
                    }
                    else if (bulletType == tank.BulletType.MISSILE) {
                        return new one.Missile(buildId, side);
                    }
                    else if (bulletType == tank.BulletType.NUCLEAR) {
                        return new tank.NuclearBomb(buildId, side);
                    }
                    else if (bulletType == tank.BulletType.F) {
                        return new one.FBullet(buildId, side);
                    }
                    else if (bulletType == tank.BulletType.FIRE) {
                        return new one.FireBullet(buildId, side);
                    }
                    else if (bulletType == tank.BulletType.Magnetic) {
                        return new tank.MagneticBullet(buildId, side);
                    }
                    return new one.Bullet(buildId, side);
                case one.ItemType.BOMB:
                    var bulletType = cfg.subType || 1;
                    if (bulletType == tank.BulletType.MISSILE) {
                        return new one.Missile(buildId, side);
                    }
                    else if (bulletType == tank.BulletType.NUCLEAR) {
                        return new tank.NuclearBomb(buildId, side);
                    }
                    return new tank.NuclearBomb(buildId, side);
                case one.ItemType.RIVER:
                case one.ItemType.BRIDGE:
                    return new tank.BaseItem(buildId, side);
                case one.ItemType.LAND:
                    return new tank.BaseItem(buildId, side);
                    
                default:
                    break;
            }

            return new tank.BaseItem(buildId, side);
        }
    }

    interface IConfig {
        type:number;
        subType:number;
    }
}