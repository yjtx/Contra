module tank {
    export class BaseItem extends one.MapItem {
        
        view:one.Anmiation;
        constructor(buildId:number, side:number) {
            super();

            var itemVO:BaseVO = <BaseVO>this.vo;
            itemVO.initConfig(buildId, side);

            this.view = new one.Anmiation(itemVO.resVO);
            this.addChild(this.view);

            this.gridLayer = new egret.DisplayObjectContainer();
            this.addChild(this.gridLayer);

            this.showGrid();
        }
        
        public getVOClazz():any {
            return BaseVO;
        }

        private gridLayer:egret.DisplayObjectContainer;
        protected showGrid():void {
            if (egret.getOption("debug") != "1") {
                return;
            }
            
            this.gridLayer.removeChildren();

            var blocks = this.vo.getBlockSizes();
            for (var i:number = 0; i < blocks.length; i++) {
                var s:egret.Shape = new egret.Shape();

                s.graphics.beginFill(0xffffff, 0.5);
                if (blocks[i].height != 0) {
                    s.graphics.drawRect(-blocks[i].width / 2, -blocks[i].height / 2, blocks[i].width, blocks[i].height);
                }
                else {
                    s.graphics.drawCircle(0, 0, blocks[i].width / 2);
                }
                s.graphics.endFill();

                this.gridLayer.addChild(s);
                s.x = blocks[i].centerX;
                s.y = blocks[i].centerY;
            }
        }

        public rotationChanged():void {
            this.view.rotation = this.vo.rotation;

            this.showGrid();
        }

        beAttack():void {
            var skeletonData = RES.getRes("baozhaxiaoguo_ske_json");
            var textureData = RES.getRes("baozhaxiaoguo_texture_json");
            var texture = RES.getRes("baozhaxiaoguo_texture_png");
            var effect:Effect = new Effect(skeletonData, textureData, texture, "baozha", "baozha");
            effect.initRoot();
            effect.x = this.x;
            effect.y = this.y;
            effect.scaleX = effect.scaleY = 0.3;
            
            var facade:puremvc.IFacade = puremvc.Facade.getInstance('Map');
            facade.sendNotification( 'ADD_TO_EFFECT', effect);
        }

        dead():void {
            var skeletonData = RES.getRes("baozhaxiaoguo_ske_json");
            var textureData = RES.getRes("baozhaxiaoguo_texture_json");
            var texture = RES.getRes("baozhaxiaoguo_texture_png");
            var effect:Effect = new Effect(skeletonData, textureData, texture, "baozha", "baozha");
            effect.initRoot();
            effect.x = this.x;
            effect.y = this.y;
            effect.scaleX = effect.scaleY = 0.3;

            var facade:puremvc.IFacade = puremvc.Facade.getInstance('Map');
            facade.sendNotification( 'ADD_TO_EFFECT', effect);
            
            facade.sendNotification( 'REMOVE_FROM_BUILD', this);
        }

        disappear():void {
            var facade:puremvc.IFacade = puremvc.Facade.getInstance('Map');
            facade.sendNotification( 'REMOVE_FROM_BUILD', this);
        }
    }
}