module one {
    export class RunningItem extends tank.BaseItem {
        constructor(buildId:number, side:number) {
            super(buildId, side);
            
            this._dicX = 0;
            this._dicY = 1;
        }
        
        updateStep():void {
        }
        
        private _dicX:number;
        private _dicY:number;
        public getDicX():number {
            return this._dicX;
        }
        public getDicY():number {
            return this._dicY;
        }
        
        public changeDic(stepX:number, stepY:number):void {
            var rotation:number = 0;
            if (stepX == 0 && stepY == 0) {//不动
                (<one.TankVO>this.vo).changeTankRotation(this.vo.rotation, 0);
                this.rotationChanged();
                return;
            }

            if (stepX != 0) {
                this._dicX = stepX;
                this._dicY = stepY;
                
                if (stepY == 0) {
                    rotation = -(stepX) * 90;
                }
                else if (stepY == 1) {
                    rotation = (135 / (stepX + 2) + (stepY + 1) * 45) + 180;
                }
                else {
                    rotation = ((stepX) * 45 + (stepY + 1) * 45) + 180;
                }
            }
            else {
                this._dicY = stepY;
                this._dicX = 0;
                
                rotation = (stepY + 1) * 90 + 180;
            }
            (<one.TankVO>this.vo).changeTankRotation(rotation, (<one.TankVO>this.vo).speed);
            this.rotationChanged();
        }
        
    }
}