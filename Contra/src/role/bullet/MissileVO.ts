module one {
    export class MissileVO extends one.BulletVO {
        
        fireInterval:number = 100;

        constructor() {
            super();

            this.attackNumbers = 100000;
        }

        attackRange:number = 0;
        protected initCfg(cfg:any):void {
            super.initCfg(cfg);
            this.attackRange = cfg['properties']['range'] || 100;
        }
    }
}