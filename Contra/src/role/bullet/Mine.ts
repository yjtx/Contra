
module one {
    export class Mine extends Bullet {

        constructor(buildId:number, side:number) {
            super(buildId, side);
        }
        
        public getVOClazz():any {
            return one.MissileVO;
        }
        
        fire():void {
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
        }

        dead():void {
            super.dead();

            this.exploded();
        }
        
        private blob():void {
            var skeletonData = RES.getRes("baozhaxiaoguo_ske_json");
            var textureData = RES.getRes("baozhaxiaoguo_texture_json");
            var texture = RES.getRes("baozhaxiaoguo_texture_png");
            var effect:Effect = new Effect(skeletonData, textureData, texture, "baozha", "baozha");
            effect.initRoot();
            effect.x = this.x;
            effect.y = this.y;
            effect.scaleX = effect.scaleY = 0.4;

            var facade:puremvc.IFacade = puremvc.Facade.getInstance('Map');
            facade.sendNotification( 'ADD_TO_EFFECT', effect);
        }
    }
}