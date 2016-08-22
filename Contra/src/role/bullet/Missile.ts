module one {
    export class Missile extends Bullet {

        constructor(buildId:number, side:number) {
            super(buildId, side);
        }
        
        public getVOClazz():any {
            return one.MissileVO;
        }

        fire():void {
            var vo:one.MissileVO = <one.MissileVO>this.vo;
            var startX:number = this.x;
            var startY:number = this.y;
            var rangeX:number = -vo.attackRange * Math.sin(vo.rotation / 180 * Math.PI);
            var rangeY:number = vo.attackRange * Math.cos(vo.rotation / 180 * Math.PI);

            var self = this;
            
            egret.Tween.get(this.view).to({scaleX:2, scaleY:2}, 200)
                .to({scaleX:1, scaleY:1}, 200).call(function () {
                    egret.Tween.removeTweens(self.view);
                }, this);

            egret.Tween.get(this).to({x:startX + rangeX / 2, y:startY + rangeY / 2}, 200)
                .to({x:startX + rangeX, y:startY + rangeY}, 200)
                .call(function() {
                    self.vo.x = self.x;
                    self.vo.y = self.y;

                    egret.Tween.removeTweens(self);
                    self.exploded();
                }, this);
        }

        private exploded():void {
            this.blob();

            var facade:puremvc.IFacade = puremvc.Facade.getInstance('Map');
            facade.sendNotification( 'EXPLOEDED', this);

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
            effect.scaleX = effect.scaleY = 0.4;

            var facade:puremvc.IFacade = puremvc.Facade.getInstance('Map');
            facade.sendNotification( 'ADD_TO_EFFECT', effect);
        }
    }
}