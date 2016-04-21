module one {
    export class Role extends egret.DisplayObjectContainer {
        
        protected dicX:number = 0;
        protected dicY:number = 0;
        
        private isAttack:boolean = false;
        private isJump:boolean = false;
        
        protected movie:one.Anmiation;
        
        constructor() {
            super();
        }
        
        init():void {
            var self = this;
            
            var isRunning:boolean = false;
            var f = function (e:egret.Event) {
                var dataArr = e.data;
                self.dicX = dataArr[0];
                self.dicY = dataArr[1];
                
                self.isAttack = dataArr[2] == one.BUTTONS.ATTACK;
                self.isJump = dataArr[3] == one.BUTTONS.JUMP;
                
                
                if (self.isJump) {
                    if (self.dicY == one.Direction.DOWN && self.dicX == one.Direction.NONE) {//跳下
                        
                    }
                }
                
                console.log(dataArr);
            }
            one.KeyBoardCtr.getInstance().addEventListener(egret.Event.CHANGE, f, this);
            one.TouchCtr.getInstance().addEventListener(egret.Event.CHANGE, f, this);
        }
        
        public jump():void {
            
        }
        
        public run():void {
            
        }
        
        public down():void {
            
        }
        
        public setDic(x:number, y:number):void {
            
        }
        
        public updateStep():void {
            switch (this.dicX) {
                    case one.Direction.LEFT:
                        this.x--;
                        break;
                    case one.Direction.RIGHT:
                        this.x++;
                        break;
                    default:
                        break;
                }
                switch (this.dicY) {
                    case one.Direction.UP:
                        console.log("up");
                        break;
                    case one.Direction.DOWN:
                        console.log("down");
                        break;
                    default:
                        break;
                }
                
                if (this.isAttack) {
                    
                }
                
                if (this.isJump) {
                    
                }
                
        }
    }
}