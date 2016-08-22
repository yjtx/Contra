module tank {
    export class TankMediator extends puremvc.Mediator {
        public static NAME: string = "TankMediator";

        private fireCount:number = 0;

        constructor(view: any) {
            super(TankMediator.NAME, view);
        }

        listNotificationInterests(): string[] {
            return ['CREATE_BULLET', 'CREATE_BOMB', 'CREATE_MISSILE', 'JUMP'];
        }

        handleNotification(notification: puremvc.INotification) {
            var tank: one.Tank = this.getViewComponent();

            var p = tank.view.localToGlobal(0, 0);
            var vo: one.TankVO = (<one.TankVO>tank.vo);
            var ro: number = vo.rotation;
            var facade: puremvc.IFacade = puremvc.Facade.getInstance('Map');
            
            if (notification.getName() == 'JUMP') {
                vo.setStepY(-15);
                tank.jump();
            }
            else if (notification.getName() == 'CREATE_BULLET') {
                var info: one.BulletCreateInfo = {
                    x: p.x,
                    y: p.y,
                    bulletId: notification.getBody(),
                    bulletPower: vo.bulletPower,
                    rotation: ro,
                    side: vo.side
                };
                facade.sendNotification(one.CreateBulletCMD.NAME, info);
                
            }
            else if (notification.getName() == 'CREATE_BOMB') {
                var bombInfo: one.BombCreateInfo = {
                    x: p.x,
                    y: p.y,
                    bulletId: 102,
                    bulletPower: vo.bulletPower,
                    side: vo.side,
                    endX: vo.x,
                    endY: Math.max(vo.y - 300, 100)
                };
                facade.sendNotification(one.CreateBombCMD.NAME, bombInfo);
            }
            else if (notification.getName() == 'CREATE_MISSILE') {
                for (var i:number = 0; i < 5; i++) {
                    var ro:number = vo.rotation - 45 + i * 22.5;
                    var dic:number = vo.minY;
                    
                    var missileInfo: one.BulletCreateInfo = {
                        x: p.x,
                        y: p.y,
                        bulletId: 101,
                        bulletPower: vo.bulletPower,
                        rotation: ro,
                        side: vo.side,
                    };
                    facade.sendNotification(one.CreateBulletCMD.NAME, missileInfo);
                }
            }
        }
    }
}