module tank {
    export class MagneticBullet extends one.Bullet {

        private shape:egret.Shape;

        private tempAttackSizes:Array<one.BlockVO>;
        constructor(buildId:number, side:number) {
            super(buildId, side);

            (<one.BulletVO>this.vo).attackNumbers = 3;

            this.tempAttackSizes = (<one.AttackExtVO>this.vo.extVO).getConfigAttackSizes();

            this.shape = new egret.Shape();
            this.addChild(this.shape);
        }
        
        attack(voes:Array<one.MapItemVO>):void {
            super.attack(voes);

            if (voes.length > 0) {

                (<one.AttackExtVO>this.vo.extVO).setAttackSizes([]);
                (<one.AttackExtVO>this.vo.extVO).refreshSizes();
                
                this.shape.visible = true;
                this.shape.graphics.clear();
                this.shape.graphics.lineStyle(2, 0xffff00, 1);
                for (var i:number = 0; i < voes.length; i++) {
                    this.shape.graphics.moveTo(0, 0);
                    this.shape.graphics.lineTo(voes[i].x - this.vo.x, voes[i].y - this.vo.y);
                    console.log(voes[i].x - this.vo.x, voes[i].y - this.vo.y)
                }

                var self  = this;
                egret.setTimeout(function () {
                    self.shape.visible = false;
                }, this, 1000);

                egret.setTimeout(function() {
                    (<one.AttackExtVO>self.vo.extVO).setAttackSizes(self.tempAttackSizes);
                    (<one.AttackExtVO>self.vo.extVO).refreshSizes();
                }, this, 1200);

            }
        }

        fire():void {

        }

        dead():void {
        }
    }
}