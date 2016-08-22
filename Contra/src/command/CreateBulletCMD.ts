module one {
    export class CreateBulletCMD extends puremvc.SimpleCommand {
        static NAME:string = "CreateBulletCMD";

        constructor() {
            super();
        }
        
        public execute(notification: puremvc.INotification): void {
            var mapCfg:BulletCreateInfo = <BulletCreateInfo><any>notification.getBody();//x, y, bulletId, bulletSpeed, side, rotation
            var p1x = mapCfg.x;
            var p1y = mapCfg.y;

            var b:one.Bullet = <one.Bullet>tank.ItemFactory.createItem(mapCfg.bulletId, mapCfg.side);

            var ro:number = mapCfg.rotation;
            var dic:number = (<tank.BaseVO>b.vo).minY;

            b.vo.x = p1x - Map.mapX - dic * Math.sin(ro/180*Math.PI);
            b.vo.y = p1y - Map.mapY + dic * Math.cos(ro/180*Math.PI);

            if ((<one.BulletVO>b.vo).subType == tank.BulletType.FIRE) {
                mapCfg.bulletPower = 0;
            }
            else if ((<one.BulletVO>b.vo).subType == tank.BulletType.Magnetic) {
                mapCfg.bulletPower = 10;
            }

            (<one.BulletVO>b.vo).changeTankRotation(ro, mapCfg.bulletPower);
            b.updateView();
            b.rotationChanged();

            var facade:puremvc.IFacade = puremvc.Facade.getInstance('Map');

            if ((<one.BulletVO>b.vo).subType == tank.BulletType.MISSILE
                || (<one.BulletVO>b.vo).subType == tank.BulletType.NUCLEAR) {
                facade.sendNotification( 'ADD_TO_BULLET', b );
            }
            else if ((<one.BulletVO>b.vo).HardnessType == tank.HardnessType.Constant) {
                facade.sendNotification( 'ADD_TO_BULLET', b );
            }
            else {
                facade.sendNotification( 'ADD_TO_BUILD', b );
            }
            b.fire();
        }
    }

    export interface BulletCreateInfo {
        x:number;
        y:number;
        bulletId:number;
        bulletPower:number;
        side:number;
        rotation:number;
    }
}