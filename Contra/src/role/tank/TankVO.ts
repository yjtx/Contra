module one {
    export class TankVO extends tank.BaseVO implements tank.IRunningVO {
        
        fireInterval:number = 30;

        bulletId:number = 0;

        bulletPower:number = 1;//越大，子弹速度越快

        //默认速度
        speed:number = 0;

        //
        private speedX:number = 0;
        private speedY:number = 0;
        private g:number = 0.5;
        private maxSpeedY:number = 5;

        constructor() {
            super();
        }

        getStepX():number {
            return this.speedX;
        }

        getStepY():number {
            var speedY:number = this.speedY + this.g;

            if (speedY < -this.maxSpeedY) {
                return -this.maxSpeedY;
            }
            else if (speedY > this.maxSpeedY) {
                return this.maxSpeedY;
            }
            
            return speedY;
        }

        getSpeedY():number {
            return this.speedY;
        }

        addStepX():void {
            this.x += this.speedX;
        }

        addStepY():void {
            this.y += this.getStepY();
            this.speedY += this.g;
            
            // console.log(this.speedY);
        }
        
        private isJump:boolean = false;

        public isJumping():boolean {
            return this.isJump;
        }
        setStepY(speedY:number):void {
            if (this.speedY == speedY) {
                return;
            }
            this.speedY = speedY;

            if (speedY == 0) {
                this.isJump = false;
            }
            else {
                this.isJump = true;
            }

        }

        protected initCfg(cfg:any):void {
            super.initCfg(cfg);

            this.speed = cfg['properties']['speed'];

            this.bulletId = cfg['bullet']['id'];
            this.bulletPower = cfg['bullet']['power'] || 1;
        }

        //更改旋转弧度
        public changeTankRotation(rotation:number, speed:number):void {
            super.changeRotation(rotation);
            
            rotation = rotation % 360;

            // console.log(rotation);
            if (speed != 0) {
                this.speedX = parseFloat((-this.speed * Math.sin(this.rotation / 180 * Math.PI)).toFixed(1));
                // this.stepY = parseFloat((this.speed * Math.cos(this.rotation / 180 * Math.PI)).toFixed(1));
            }
            else {
                this.speedX = 0;
                this.speedY = 0;
            }
        }
    }
}