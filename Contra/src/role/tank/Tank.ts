module one {
    export class Tank extends RunningItem {

        private ext:tank.ITankExt;

        constructor(id:number, side:number, isMain:boolean) {
            super(id, side);

            if (isMain) {
                this.ext = new tank.MainHeroExt(this);
                this.ext.init();
            }
            else if (side == one.SideType.ENEMY) {
                this.ext = new tank.IntelligentExt(this);
                this.ext.init();
            }
        }
        
        public getVOClazz():any {
            return one.TankVO;
        }

        public rotationChanged():void {
            if (this.vo.rotation < 180) {
                // this.view.rotation = -180;
                this.view.scaleX = -1;
            }
            else {
                this.view.scaleX = 1;
            }

            if (!(<one.TankVO>this.vo).isJumping()) {
                if ((<one.TankVO>this.vo).getStepX() != 0) {
                    this.view.changeAnimation("run", -1);
                }
                else {
                    this.view.changeAnimation("stand", -1);
                }
            }
            

            this.showGrid();
        }
        
        public stand1():void {
            this.view.changeAnimation("stand", -1);
        }
        
        public jump():void {
            this.view.changeAnimation("jump", 1);
            this.view.once(egret.Event.COMPLETE, function() {
                this.view.changeAnimation("drop", -1);
            }, this);
        }

        public run():void {
            this.view.changeAnimation("run", -1);
        }

        public drop():void {
            this.view.changeAnimation("drop", -1);
        }

        updateStep():void {
            super.updateStep();
            
            if (this.ext) {
                this.ext.updateStep();
            }


            this.shadowCount++;
            if (this.shadowCount >= this.shadowTimes / (<one.TankVO>this.vo).speed) {
                this.shadowCount = 0;
            }
        }

        private shadowCount:number = 130;
        private shadowTimes:number = 32;
        private getShadow():tank.Shadow {
            if (tank.Shadow.shadows.length) {
                return tank.Shadow.shadows.pop();
            }
            var shadow:tank.Shadow = new tank.Shadow();
            return shadow;
        }
    }
}