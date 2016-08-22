module tank {
    export class LightBullet extends one.Bullet {

        private light:egret.Shape;

        constructor(buildId:number, side:number) {
            super(buildId, side);
        }
        
        setPoints(x1:number, y1:number, x2:number, y2:number):void {
            var width:number = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
            // this.light.width = width;
            this.vo.x = (x1 + x2) / 2;
            this.vo.y = (y1 + y2) / 2;

            var ro:number = Math.acos((x2 - x1) / width) / Math.PI * 180;

            var sizes:Array<one.BlockVO> = [];
            var size:number = 20;
            for (var i:number = -width / 2 + size / 2; i < width / 2 - size / 2; i+=size) {
                var blockVO:one.BlockVO = new one.BlockVO(i, 0, size, size);
                sizes.push(blockVO);
            }

            var blockVO:one.BlockVO = new one.BlockVO(width / 2 - size / 2, 0, size, size);
            sizes.push(blockVO);

            (<one.AttackExtVO>this.vo.extVO).setAttackSizes(sizes);
            // (this.vo).setBlocks(sizes);

            this.light = new egret.Shape();
            this.light.graphics.beginFill(0xff0000, 1);
            this.light.graphics.drawRect(-width / 2, 0, width, 2);
            this.light.graphics.endFill();
            this.addChildAt(this.light, 0);

            this.vo.rotation = 360;
            this.vo.changeRotation(ro);
            this.light.rotation = ro;
            this.updateView();

            this.showGrid();
        }

        fire():void {
            
        }

        dead():void {
            super.dead();
        }
    }
}