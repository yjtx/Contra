module tank {
    export class Rocker extends egret.DisplayObjectContainer implements one.IRocker {
        constructor() {
            super();
        }

        private rockerCon:egret.DisplayObjectContainer;
        private bg:egret.Bitmap;
        private tab:egret.Bitmap;


        private randios:number;

        private _btns:Array<egret.DisplayObject> = [];
        public getBtns():Array<egret.DisplayObject> {
            return this._btns;
        }

        init():void {
            this.rockerCon = new egret.DisplayObjectContainer();
            this.addChild(this.rockerCon);

            var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("fangxiang1_png"));
            this.rockerCon.addChild(bg);
            bg.width = this.stage.stageWidth;
            bg.height = this.stage.stageHeight;
            bg.alpha = 0;


            this.bg = new egret.Bitmap(RES.getRes("fangxiang1_png"));
            this.bg.anchorOffsetX = this.bg.width / 2;
            this.bg.anchorOffsetY = this.bg.height / 2;
            this.rockerCon.addChild(this.bg);

            this.tab = new egret.Bitmap(RES.getRes("fangxiang_png"));
            this.tab.anchorOffsetX = this.tab.width / 2;
            this.tab.anchorOffsetY = this.tab.height / 2;
            this.rockerCon.addChild(this.tab);

            this.randios = this.bg.width / 2 - this.tab.width / 2;

            this.rockerCon.touchEnabled = true;

            this.clear();


            for (var i:number = 9; i >= 0; i--) {
                var bullet:egret.Bitmap = new egret.Bitmap(RES.getRes("zidan_png"));
                bullet.width = bullet.height = 60;
                bullet.anchorOffsetX = bullet.width / 2;
                bullet.anchorOffsetY = bullet.height / 2;
                this.addChild(bullet);
                bullet.x = this.stage.stageWidth - (bullet.width * (i % 5 + 0.5) + 30);
                bullet.y = this.stage.$stageHeight -(bullet.height * (Math.floor(i / 5) + 0.5) + 10);

                this._btns.push(bullet);
            }
        }

        //用来设置摇杆最小区域
        getRange():number {
            return 20;
        }

        //摇杆监听的容器
        getRocker():egret.DisplayObject {
            return this.rockerCon;
        }

        public changeDic(dicX:number, dicY:number):void {
            if (dicX == 0 && dicY == 0) {
                this.tab.x = this.bg.x;
                this.tab.y = this.bg.y;
                return;
            }

            var tr:number = Math.sqrt(dicX * dicX + dicY * dicY);
            if (tr < this.getRange()) {
                this.tab.x = this.bg.x;
                this.tab.y = this.bg.y;
                return;
            }

            var rotation:number = Math.acos(dicX / tr);
            if (dicY < 0) {
                rotation = Math.PI * 2 - rotation;
            }
            
            tr = Math.min(tr, this.randios);
            this.tab.x = this.bg.x + tr * Math.cos(rotation);
            this.tab.y = this.bg.y + tr * Math.sin(rotation);
        }
        
        //摇杆开始
        start():void {
            this.bg.visible = true;
            this.tab.visible = true;
        }

        //摇杆结束
        clear():void {
            this.bg.visible = false;
            this.tab.visible = false;
        }

        //设置摇杆的位置
        setPosition(x:number, y:number):void {
            this.bg.x = x;
            this.bg.y = y;
            this.tab.x = x;
            this.tab.y = y;
        }
    }
}