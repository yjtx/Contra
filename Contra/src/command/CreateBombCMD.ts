module one {
    export class CreateBombCMD extends puremvc.SimpleCommand {
        static NAME:string = "CreateBombCMD";

        constructor() {
            super();
        }
        
        public execute(notification: puremvc.INotification): void {
            var mapCfg:BombCreateInfo = <BombCreateInfo><any>notification.getBody();
            
            var b:tank.NuclearBomb = <tank.NuclearBomb>tank.ItemFactory.createItem(mapCfg.bulletId, mapCfg.side);
            b.setBombPoint(mapCfg.endX, mapCfg.endY);
            
            var ro:number = 180;
            var dic:number = (<tank.BaseVO>b.vo).minY;
            b.vo.x = mapCfg.x - Map.mapX - dic * Math.sin(ro/180*Math.PI);
            b.vo.y = mapCfg.y - Map.mapY + dic * Math.cos(ro/180*Math.PI);
            
            (<one.BulletVO>b.vo).changeTankRotation(ro, 0);
            b.updateView();
            b.rotationChanged();
            
            var facade:puremvc.IFacade = puremvc.Facade.getInstance('Map');
            facade.sendNotification( 'ADD_TO_BULLET', b );

            b.fire();
        }
    }

    export interface BombCreateInfo {
        x:number;
        y:number;
        bulletId:number;
        bulletPower:number;
        side:number;
        endX:number;
        endY:number;
    }
}