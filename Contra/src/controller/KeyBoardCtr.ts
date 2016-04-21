module one {
    export class KeyBoardCtr extends egret.EventDispatcher{
        
        static leftCode:number = 65;
        static upCode:number = 87;
        static rightCode:number = 68;
        static downCode:number = 83;
        
        static jumpCode:number = 75;
        static  attackCode:number = 74;
        
        isLeft:boolean = false;
        isUp:boolean = false;
        isRight:boolean = false;
        isDown:boolean = false;
        isJump:boolean = false;
        isAttack:boolean = false;
        
        constructor() {
            super();
        }
        
        
        static instance:KeyBoardCtr;
        static getInstance():KeyBoardCtr {
            if (KeyBoardCtr.instance == null) {
                KeyBoardCtr.instance = new KeyBoardCtr();
            }
            
            return KeyBoardCtr.instance;
        }
        
        init():void {
            window.addEventListener("keydown", this.onDown);
            window.addEventListener("keyup", this.onUp);
        }
        
        downKeys:Array<number> = [];
        private onDown = (e:any)=> {
            var keyCode = e.keyCode;
            
            var index = this.downKeys.indexOf(keyCode);
            if (index >= 0) {
                return;
            }
            
            switch (e.keyCode) {
                case KeyBoardCtr.jumpCode:
                    this.isJump = true;
                    this.downKeys.push(e.keyCode);
                    break;
                case KeyBoardCtr.attackCode:
                    this.isAttack = true;
                    this.downKeys.push(e.keyCode);
                    break;
                case KeyBoardCtr.leftCode:
                    this.isLeft = true;
                    this.downKeys.push(e.keyCode);
                    break;
                case KeyBoardCtr.upCode:
                    this.isUp = true;
                    this.downKeys.push(e.keyCode);
                    break;
                case KeyBoardCtr.rightCode:
                    this.isRight = true;
                    this.downKeys.push(e.keyCode);
                    break;
                case KeyBoardCtr.downCode:
                    this.isDown = true;
                    this.downKeys.push(e.keyCode);
                    break;
                default:
                    return;
            }
            
            this.onChange();
        }
        
        private onUp = (e:any)=> {
            var keyCode = e.keyCode;
            
            var index = this.downKeys.indexOf(keyCode);
            if (index >= 0) {
                this.downKeys.splice(index, 1);
                
                switch (e.keyCode) {
                    case KeyBoardCtr.jumpCode:
                        this.isJump = false;
                        break;
                    case KeyBoardCtr.attackCode:
                        this.isAttack = false;
                        break;
                    case KeyBoardCtr.leftCode:
                        this.isLeft = false;
                        break;
                    case KeyBoardCtr.upCode:
                        this.isUp = false;
                        break;
                    case KeyBoardCtr.rightCode:
                        this.isRight = false;
                        break;
                    case KeyBoardCtr.downCode:
                        this.isDown = false;
                        break;
                    default:
                        break;
                }
                
                this.onChange();
            }
        }
        
        public isKeyDown(keyCode:number):boolean {
            return this.downKeys.indexOf(keyCode) >= 0;
        }
        
        private onChange():void {
            var dicH:number = 0;
            var dicV:number = 0;
            if (this.isUp) {
                dicV = Direction.UP;
            }
            else if (this.isDown) {
                dicV = Direction.DOWN;
            }
            else {
                dicV = Direction.NONE;
            }
            if (this.isLeft) {
                dicH = Direction.LEFT;
            }
            else if (this.isRight) {
                dicH = Direction.RIGHT;
            }
            else {
                dicH = Direction.NONE;
            }
            
            var btnJ:number = 0;
            var btnA:number = 0;
            if (this.isJump) {
                btnJ = BUTTONS.JUMP;
            }
            else {
                btnJ = BUTTONS.NONE;
            }
            
            if (this.isAttack) {
                btnA = BUTTONS.ATTACK;
            }
            else {
                btnA = BUTTONS.NONE;
            }
            
            this.dispatchEvent(new egret.Event(egret.Event.CHANGE, false, false, [dicH, dicV, btnA, btnJ]));
            
        }
    }
}