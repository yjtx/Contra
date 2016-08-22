module tank {
    export class MagneticTowerVO extends tank.BaseVO {
        
        bulletId:number = 0;

        constructor() {
            super();
            
        }

        protected initCfg(cfg:any):void {
            super.initCfg(cfg);

            this.bulletId = cfg['bullet']['id'];
        }
    }
}