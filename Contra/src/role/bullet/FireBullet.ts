module one {
    export class FireBullet extends Bullet {

        constructor(buildId:number, side:number) {
            super(buildId, side);
        }
        
        private timeId:number = -1;
        fire():void {
            var self = this;
            this.timeId = egret.setTimeout(function () {
                self.dead();
            }, this, 5000);
        }

        dead():void {
            if (this.timeId > 0) {
                egret.clearTimeout(this.timeId);
            }

            super.dead();
        }
    }
}