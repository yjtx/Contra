module one {
    export class FBullet extends Bullet {

        constructor(buildId:number, side:number) {
            super(buildId, side);
        }
        
        fire():void {
            
        }

        dead():void {
            
            var p = this.view.localToGlobal(-60, 0);
            var p1x:number = p.x;
            var p1y:number = p.y;
            
            p = this.view.localToGlobal(60, 0);
            var p2x:number = p.x;
            var p2y:number = p.y;

            var vo: one.BulletVO = (<one.BulletVO>this.vo);
            var ro: number = vo.rotation;

            var facade: puremvc.IFacade = puremvc.Facade.getInstance('Map');
            for (var i:number = 0; i < 5; i++) {
                var dic:number = vo.minY;
                
                var info: one.BulletCreateInfo = {
                    x: p1x + (p2x - p1x) / 4 * i,
                    y: p1y + (p2y - p1y) / 4 * i,
                    bulletId: vo.bulletId,
                    bulletPower: vo.bulletPower,
                    rotation: ro,
                    side: vo.side
                };
                facade.sendNotification(one.CreateBulletCMD.NAME, info);
            }

            super.dead();
        }
        
    }
}