module tank {
    export class Shadow extends egret.DisplayObjectContainer {
        static shadows:Array<Shadow> = [];

        private shadow:egret.Bitmap;
        constructor() {
            super();
            this.shadow = new egret.Bitmap(RES.getRes("shadow_png"))
            this.addChild(this.shadow);
            this.shadow.anchorOffsetX = this.shadow.width / 2;
            this.shadow.anchorOffsetY = this.shadow.height / 2;
            this.shadow.scaleX = this.shadow.scaleY = 0.5;
            
        }

        public show():void {
            var self = this;

            this.shadow.alpha = 1;
            egret.Tween.get(this.shadow).to({alpha:0}, 2000).call(function () {
                self.parent.removeChild(self);
                Shadow.shadows.push(self);
            }, this);
        }


    }
}