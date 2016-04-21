module one {
    
    export class TouchCtr extends egret.EventDispatcher {
        
        private dicX:number = 0;
        private dicY:number = 0;
        private dicR:number = 50;
        
        private btnX:number = 0;
        private btnY:number = 0;
        private btnR:number = 50;
        
        constructor() {
            super();
        }
        
        static instance:TouchCtr;
        static getInstance():TouchCtr {
            if (TouchCtr.instance == null) {
                TouchCtr.instance = new TouchCtr();
            }
            
            return TouchCtr.instance;
        }
        
        init(panel:egret.DisplayObjectContainer):void {
            
            var rap:number = this.dicR * 1.2;
            
            this.dicX = rap;
            this.dicY = panel.stage.stageHeight - rap;
            
            var shape:egret.Shape = new egret.Shape();
            shape.graphics.beginFill(0xff0000);
            shape.graphics.drawCircle(this.dicR, this.dicR, this.dicR);
            shape.graphics.endFill();
            panel.addChild(shape);
            shape.x = this.dicX - this.dicR;
            shape.y = this.dicY - this.dicR; 
            
            this.btnX = panel.stage.$stageWidth - rap;
            this.btnY = panel.stage.stageHeight - rap;
            
            var shape:egret.Shape = new egret.Shape();
            shape.graphics.beginFill(0xff0000);
            shape.graphics.drawCircle(this.btnR, this.btnR, this.btnR);
            shape.graphics.endFill();
            panel.addChild(shape);
            shape.x = this.btnX - this.btnR;
            shape.y = this.btnY - this.btnR; 
            
            panel.touchEnabled = true;
            
            panel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onDown, this);
            panel.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
            panel.addEventListener(egret.TouchEvent.TOUCH_END, this.onUp, this);
            panel.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onUp, this);
            panel.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onUp, this);
        }
        
        horizontalDirect:number = 0;
        verticalDirect:number = 0;
            
        horizontalBtn:number = 0;
        verticalBtn:number = 0;
            
                    
        private dircPointID:number = 0;
        private btnPointID:number = 0;

           
        private isInButton(x:number, y:number):boolean {
            return this.isInCircle(this.btnX, this.btnY, x, y, this.btnR * 2);
        }

        private isInDirection(x:number, y:number):boolean {
            return this.isInCircle(this.dicX, this.dicY, x, y, this.dicR * 2);
        }
        
        private isInCircle(px:number, py:number, x:number, y:number, r:number):boolean {
            return (px - x) * (px - x) + (py - y) * (py - y) < r * r;
        }
        
        private onMove = (e:egret.TouchEvent)=> {
            if (e.touchPointID > 0) {
                if (this.dircPointID == e.touchPointID) {
                    this.setDirection(e.localX, e.localY)
                }
                else if (this.btnPointID == e.touchPointID) {
                    this.setBtn(e.localX, e.localY);
                }
            }
            else {
                if (this.dircPointID > 0) {
                    this.setDirection(e.localX, e.localY)
                }
                else {
                    this.setBtn(e.localX, e.localY);
                }
            }
        }
        
        private setDirection(localX:number, localY:number):void {
            var isChanged:boolean =false;
            
            var keyCode = 0;
            if (localX > this.dicX + this.dicR / 2) {
                keyCode = 1;
            }
            else if (localX < this.dicX - this.dicR / 2) {
                keyCode = -1;
            }
            
            if (this.horizontalDirect != keyCode) {
                isChanged = true;
                this.horizontalDirect = keyCode;
            }
            
            var keyCode = 0;
            if (localY > this.dicY + this.dicR / 2) {
                keyCode = 1;
            }
            else if (localY < this.dicY - this.dicR / 2) {
                keyCode = -1;
            }
            
            if (this.verticalDirect != keyCode) {
                isChanged = true;
                this.verticalDirect = keyCode;
            }
            
            if (isChanged) {
                this.onChange();
            }
        }
        
        private setBtn(localX:number, localY:number):void {
            var isChanged:boolean =false;
            
            var keyCode = 0;
            if (localX > this.btnX + this.btnR / 2) {
                keyCode = 1;
            }
            else if (localX < this.btnX - this.btnR / 2) {
                keyCode = -1;
            }
            
            if (this.horizontalBtn != keyCode) {
                isChanged = true;
                this.horizontalBtn = keyCode;
            }
            
            var keyCode = 0;
            if (localY > this.btnY + this.btnR / 2) {
                keyCode = 1;
            }
            else if (localY < this.btnY - this.btnR / 2) {
                keyCode = -1;
            }
            
            if (this.verticalBtn != keyCode) {
                isChanged = true;
                this.verticalBtn = keyCode;
            }
            
            if (isChanged) {
                this.onChange();
            }
        }
        
        private onDown = (e:egret.TouchEvent)=> {
            if (this.isInDirection(e.localX, e.localY)) {
                if (this.dircPointID == 0) {
                    this.dircPointID = Math.max(e.touchPointID, 1);
                    
                    this.setDirection(e.localX, e.localY);
                }
            }
            
            if (this.isInButton(e.localX, e.localY)) {
                if (this.btnPointID == 0) {
                    this.btnPointID = Math.max(e.touchPointID, 1);
                    
                    this.setBtn(e.localX, e.localY);
                }
            }
        }
        
        private onUp = (e:any)=> {
            if (e.touchPointID > 0) {
                if (this.dircPointID == e.touchPointID) {
                    this.verticalDirect = 0;
                    this.horizontalDirect = 0;
                    this.dircPointID = 0;
                    this.onChange();
                }
                else if (this.btnPointID == e.touchPointID) {
                    this.verticalBtn = 0;
                    this.horizontalBtn = 0;
                    this.btnPointID = 0;
                    this.onChange();
                }
            }
            else {
                    this.verticalDirect = 0;
                    this.horizontalDirect = 0;
                    this.dircPointID = 0;
                    this.verticalBtn = 0;
                    this.horizontalBtn = 0;
                    this.btnPointID = 0;
                    this.onChange();
            }
        }
        private onChange():void {
            var dicH:number = 0;
            var dicV:number = 0;
            
            if (this.horizontalDirect < 0) {
                dicH = Direction.LEFT
            }
            else if (this.horizontalDirect > 0) {
                dicH = Direction.RIGHT;
            }
            else {
                dicH = Direction.NONE;
            }
            
            if (this.verticalDirect < 0) {
                dicV = Direction.UP
            }
            else if (this.verticalDirect > 0) {
                dicV = Direction.DOWN;
            }
            else {
                dicV = Direction.NONE;
            }
            
            var btnJ:number = 0;
            var btnA:number = 0;
            if (this.horizontalBtn > 0) {
                btnJ = BUTTONS.JUMP;
                btnA = BUTTONS.ATTACK;
            }
            else if (this.verticalBtn < 0) {
                btnJ = BUTTONS.JUMP;
                btnA = BUTTONS.NONE;
            }
            else if (this.verticalBtn > 0) {
                btnA = BUTTONS.ATTACK;
                btnJ = BUTTONS.NONE;
            }
            else {
                btnJ = BUTTONS.NONE;
                btnA = BUTTONS.NONE;
            }
            
            this.dispatchEvent(new egret.Event(egret.Event.CHANGE, false, false, [dicH, dicV, btnA, btnJ]));
            
        }
    }
    
}