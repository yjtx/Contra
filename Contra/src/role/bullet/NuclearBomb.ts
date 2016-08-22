module tank {
    export class NuclearBomb extends one.Bullet {

        private endX:number = 0;
        private endY:number = 0;
        constructor(buildId:number, side:number) {
            super(buildId, side);
        }

        public setBombPoint(x:number, y:number):void {
            this.endX = x;
            this.endY = y;
        }

        public getVOClazz():any {
            return one.MissileVO;
        }

        fire():void {
            var vo:one.MissileVO = <one.MissileVO>this.vo;
            
            var self = this;
            self.vo.changeRotation(180);
            self.rotationChanged();
            
            egret.Tween.get(this).to({x:self.vo.x, y: -(<tank.BaseVO>this.vo).minY * 10}, 2000, egret.Ease.quadIn)
                .call(function() {
                    self.vo.x = self.endX;
                    self.vo.y = -100;
                    self.updateView();

                    egret.Tween.get(this).to({x: self.endX, y: self.endY}, 2000, egret.Ease.quadIn)
                    .call(function() {
                        self.vo.x = self.x;
                        self.vo.y = self.y;
                        self.exploded();
                    }, this);
                }, this)
                
            egret.Tween.get(this.view).to({scaleX:10, scaleY:10}, 2000, egret.Ease.quadIn)
                .call(function() {
                    self.vo.changeRotation(0);
                    self.rotationChanged();
                }, this)
                .to({scaleX:1, scaleY:1}, 2000, egret.Ease.quadIn);
        }

        private exploded():void {
            this.blob();

            var facade:puremvc.IFacade = puremvc.Facade.getInstance('Map');
            facade.sendNotification( 'EXPLOEDED', this);

            var bitmap:egret.Bitmap = new egret.Bitmap(RES.getRes("dankeng_png"));
            bitmap.x = this.x;
            bitmap.y = this.y;
            bitmap.width = 400;
            bitmap.height = 400;
            bitmap.anchorOffsetX = bitmap.width / 2;
            bitmap.anchorOffsetY = bitmap.height / 2;

            var facade:puremvc.IFacade = puremvc.Facade.getInstance('Map');
            facade.sendNotification( 'ADD_TO_GROUND', bitmap);

            egret.Tween.get(bitmap).wait(3000).to({alpha:0}, 3000)
                .call(function() {
                    bitmap.parent.removeChild(bitmap);
                }, this);

            this.dead();
        }

        dead():void {
            super.dead();
        }
        
        private blob():void {
            var skeletonData = RES.getRes("baozhaxiaoguo_ske_json");
            var textureData = RES.getRes("baozhaxiaoguo_texture_json");
            var texture = RES.getRes("baozhaxiaoguo_texture_png");
            var effect:Effect = new Effect(skeletonData, textureData, texture, "baozha", "baozha");
            effect.initRoot();
            effect.x = this.x;
            effect.y = this.y;
            effect.scaleX = effect.scaleY = 1.4;

            var facade:puremvc.IFacade = puremvc.Facade.getInstance('Map');
            facade.sendNotification( 'ADD_TO_EFFECT', effect);
        }
    }
}