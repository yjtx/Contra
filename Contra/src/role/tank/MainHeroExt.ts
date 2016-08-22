module tank {

    export class MainHeroExt implements tank.ITankExt {
        private tank: one.Tank;


        private isAttack: boolean = false;
        private isBomb: boolean = false;
        private isMissile: boolean = false;

        constructor(t: one.Tank) {
            this.tank = t;

            var facade: puremvc.IFacade = puremvc.Facade.getInstance('MainHero');
            var roleM: puremvc.IMediator = new tank.TankMediator(this.tank);
            facade.registerMediator(roleM);
        }

        private attackBtns: Array<number> = [];
        init(): void {
            var self = this;

            var isRunning: boolean = false;
            var f1 = function (e: one.OptionEvent) {
                var directions = e.directions;
                var hDic: number = 0;
                var vDic: number = 0;
                for (var i: number = 0; i < directions.length; i++) {
                    switch (directions[i]) {
                        case one.Direction.LEFT:
                            hDic--;
                            break;
                        case one.Direction.RIGHT:
                            hDic++;
                            break;
                        case one.Direction.UP:
                            vDic--;
                            break;
                        case one.Direction.DOWN:
                            vDic++;
                            break;
                    }
                }
                self.tank.changeDic(hDic, vDic);
            }
            var f2 = function (e: one.OptionEvent) {
                self.attackBtns = e.buttons.concat();;
            }
            one.OptionCtr.getInstance().addEventListener(one.OptionEvent.DIRECTION_CHANGED, f1, this);
            one.OptionCtr.getInstance().addEventListener(one.OptionEvent.BUTTON_CHANGED, f2, this);
        }

        private createNuclearBomb(): void {
            var facade: puremvc.IFacade = puremvc.Facade.getInstance('Headquarter');
            facade.sendNotification('CREATE_BOMB');
        }

        private createMissile(): void {

            var facade: puremvc.IFacade = puremvc.Facade.getInstance('MainHero');
            facade.sendNotification('CREATE_MISSILE');
        }

        private createBullet(bulletId: number): void {
            var facade: puremvc.IFacade = puremvc.Facade.getInstance('MainHero');
            facade.sendNotification('CREATE_BULLET', bulletId);
        }

        private fireCount: number = 0;
        updateStep(): void {
            var facade: puremvc.IFacade = puremvc.Facade.getInstance('Map');
            facade.sendNotification('CAMERA', new egret.Point(this.tank.x, this.tank.y));

            if (this.fireCount <= 0 && this.attackBtns.length > 0) {
                for (var i = 0; i < this.attackBtns.length; i++) {
                    switch (this.attackBtns[i]) {
                        case one.BUTTONS[0]:
                            var facade: puremvc.IFacade = puremvc.Facade.getInstance('MainHero');
                            facade.sendNotification('JUMP');
                            break;
                        case one.BUTTONS[1]:
                            this.createBullet(11);
                            break;
                        case one.BUTTONS[2]:
                            this.createBullet(12);
                            break;
                        case one.BUTTONS[3]:
                            this.createBullet(13);
                            break;
                        case one.BUTTONS[4]:
                            this.createBullet(14);
                            break;
                        case one.BUTTONS[5]:
                            this.createBullet(15);
                            break;
                        case one.BUTTONS[6]:
                            this.createBullet(16);
                            break;
                        case one.BUTTONS[7]:
                            var facade: puremvc.IFacade = puremvc.Facade.getInstance('Tower');
                            facade.sendNotification('FIRE');
                            break;
                        case one.BUTTONS[8]:
                            this.createMissile();
                            break;
                        case one.BUTTONS[9]:
                            this.createNuclearBomb();
                            break;
                    }
                }
                this.fireCount = (<one.TankVO>this.tank.vo).fireInterval;
            }
            else {
                this.fireCount--;
            }

        }

    }
}