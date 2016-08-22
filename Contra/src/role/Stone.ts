module one {
    export class Stone extends tank.BaseItem {
        
        constructor(buildId:number, side:number) {
            super(buildId, side);
        }

        public getVOClazz():any {
            return tank.BaseVO;
        }
    }
}