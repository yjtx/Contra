module tank {
    export class TowerMediator extends puremvc.Mediator {
        public static NAME: string = "TowerMediator";

        private towers:Array<tank.Tower>;
        constructor(view: any) {
            super(TankMediator.NAME, view);

            this.towers = [];
        }

        listNotificationInterests(): string[] {
            return ['ADD_TOWER', 'REMOVE_TOWER', 'FIRE', "CLEAR"];
        }

        private fireTowers:Array<tank.Tower> = [];
        handleNotification(notification: puremvc.INotification) {
            if (notification.getName() == 'ADD_TOWER') {
                var tower:tank.Tower = notification.getBody();

                this.towers.push(tower);
            }
            else if (notification.getName() == 'REMOVE_TOWER') {
                var tower:tank.Tower = notification.getBody();
                var idx:number = this.towers.indexOf(tower);
                if (idx >= 0) {
                    this.towers.splice(idx, 1);
                }

                idx = this.fireTowers.indexOf(tower);
                if (idx >= 0) {
                    this.fireTowers.splice(idx, 1);
                    this.removeLightBullet(tower);
                }
            }
            else if (notification.getName() == 'FIRE') {
                for (var i:number = 0; i < this.towers.length; i++) {
                    var tower1:tank.Tower = this.towers[i];
                    var isInFire1:boolean = this.fireTowers.indexOf(tower1) >= 0;

                    for (var j:number = i + 1; j < this.towers.length; j++) {
                        var tower2:tank.Tower = this.towers[j];
                        var isInFire2:boolean = this.fireTowers.indexOf(tower2) >= 0;
                        if (!isInFire1 || !isInFire2) {
                            this.createLightBullet(tower1, tower2);
                        }
                    }

                    this.fireTowers.push(this.towers[i]);
                }
            }
            else if (notification.getName() == 'CLEAR') {
                for (var i:number = this.bullets.length - 1; i >= 0; i--) {
                    var info = this.bullets[i];

                    if (info.b.parent == null) {
                        this.bullets.splice(i, 1);
                    }
                    else {
                        info.b.dead();
                        this.bullets.splice(i, 1);
                    }
                }
            }
        }

        private bullets:Array<{b:LightBullet, t1:Tower, t2:Tower}> = [];
        private createLightBullet(tower1:tank.Tower, tower2:tank.Tower):void {
            var b:tank.LightBullet = new tank.LightBullet(17, one.SideType.FRIEND);
            b.setPoints(tower1.x, tower1.y, tower2.x, tower2.y);

            var facade:puremvc.IFacade = puremvc.Facade.getInstance('Map');
            facade.sendNotification( 'ADD_TO_BULLET', b );

            (<one.AttackExtVO>b.vo.extVO).addExcludeId(tower1.vo.hashId);
            (<one.AttackExtVO>b.vo.extVO).addExcludeId(tower2.vo.hashId);

            this.bullets.push({b:b, t1: tower1, t2: tower2});
        }

        private removeLightBullet(tower:tank.Tower):void {
            for (var i:number = this.bullets.length - 1; i >= 0; i--) {
                var info = this.bullets[i];

                if (info.b.parent == null) {
                    this.bullets.splice(i, 1);
                }
                else if (info.t1 == tower || info.t2 == tower) {
                    info.b.dead();
                    this.bullets.splice(i, 1);
                }
            }
        }
    }
}