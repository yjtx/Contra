module one {
    export class Bullet extends RunningItem {

        constructor(buildId:number, side:number) {
            super(buildId, side);
        }
        
        public getVOClazz():any {
            return one.BulletVO;
        }

        attack(voes:Array<one.MapItemVO>):void {
            
        }

        fire():void {
            
        }

        disappear():void {
            this.dead();
        }

        private isDead:boolean = false;
        dead():void {
            if (!this.isDead) {
                var facade:puremvc.IFacade = puremvc.Facade.getInstance('Map');
                facade.sendNotification( 'REMOVE_FROM_BUILD', this);

                this.isDead = true;
            }
        }
        
    }
}