module tank {
    export class HeadquarterMediator extends puremvc.Mediator {
        public static NAME: string = "HeadquarterMediator";

        private fireCount:number = 0;

        constructor(view: any) {
            super(HeadquarterMediator.NAME, view);
        }

        listNotificationInterests(): string[] {
            return ['CREATE_BULLET', 'CREATE_BOMB', 'CREATE_MISSILE'];
        }

        private fireEffect():void {
            var skeletonData = RES.getRes("launcher_ske_json");
            var textureData = RES.getRes("launcher_texture_json");
            var texture = RES.getRes("launcher_texture_png");

            var tank: tank.Headquarter = this.getViewComponent();
            var p = tank.view.localToGlobal(0, 30);

            var effect:Effect = new Effect(skeletonData, textureData, texture, "launcher", "start");
            effect.initRoot();
            effect.scaleX = effect.scaleY = 0.4;
            
            effect.x = p.x - one.Map.mapX;
            effect.y = p.y - one.Map.mapY;
            effect.rotation = tank.view.rotation - 90;

            var facade:puremvc.IFacade = puremvc.Facade.getInstance('Map');
            facade.sendNotification( 'ADD_TO_EFFECT', effect);

        }
        
        handleNotification(notification: puremvc.INotification) {
            var tank: one.Tank = this.getViewComponent();

            var p = tank.view.localToGlobal(0, 0);
            var vo: one.TankVO = (<one.TankVO>tank.vo);
            var ro: number = vo.rotation;
            var facade: puremvc.IFacade = puremvc.Facade.getInstance('Map');
            
            if (notification.getName() == 'CREATE_BULLET') {
                var info: one.BulletCreateInfo = {
                    x: p.x,
                    y: p.y,
                    bulletId: vo.bulletId,
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

            this.fireEffect();
        }
    }
}