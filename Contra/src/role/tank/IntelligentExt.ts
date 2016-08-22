module tank {

    export interface ITankExt {
        init():void;

        updateStep():void;
    }

    export class IntelligentExt implements tank.ITankExt {
        private tank:one.Tank;
        
        constructor(tank:one.Tank) {
            this.tank = tank;
        }

        public init():void {

        }

        private _deltaThinkTime:number = 0;
        private _thinkInterval:number = 20;
        updateStep():void {
            this.think();
            this.checkFire();
        }
        
        private think():void {
            this._deltaThinkTime++;
            if (this._deltaThinkTime >= this._thinkInterval) {
                this._deltaThinkTime = 0;
                
                this._thinkInterval = one.randomInt(105, 400);
                
                var dic:number = one.randomInt(-2, 2);
                
                var hDic:number = 0;
                var vDic:number = 0;
                switch (dic) {
                    case 2:
                    case -2:
                        vDic = dic / 2;
                        break;
                    case 1:
                    case -1:
                        hDic = dic;
                        break;
                    default:
                        break;
                }
                
                this.tank.changeDic(hDic, vDic);
            }
        }
        
        private _deltaFireTime:number = 0;
        private _fireInterval:number = 20;
        private checkFire():void {
            this._deltaFireTime++;
            if (this._deltaFireTime >= this._fireInterval) {
                this._deltaFireTime = 0;
                
                this._fireInterval = one.randomInt(205, 600);
                this.fire();
            }
        }
        
        private fire():void {
            var tank = this.tank;
            var p = tank.view.localToGlobal(0, 10);
            var vo: one.TankVO = (<one.TankVO>tank.vo);
            var ro: number = vo.rotation;

            var facade: puremvc.IFacade = puremvc.Facade.getInstance('Map');
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
    }
}