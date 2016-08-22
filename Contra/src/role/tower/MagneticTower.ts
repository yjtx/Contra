module tank {
    export class MagneticTower extends tank.BaseItem {

        private bullet:tank.MagneticBullet;
        constructor(buildId:number, side:number) {
            super(buildId, side);

            this.bullet = new tank.MagneticBullet((<MagneticTowerVO>this.vo).bulletId, side);
            (<one.AttackExtVO>this.bullet.vo.extVO).addExcludeId(this.vo.hashId);
            
            // egret.setTimeout(function() {
                var facade:puremvc.IFacade = puremvc.Facade.getInstance('Map');
                facade.sendNotification( 'ADD_TO_BULLET', this.bullet);
            // }, this, 1000);
        }

        updateView():void {
            this.x = this.vo.x;
            this.y = this.vo.y;
            this.bullet.vo.x = this.vo.x;
            this.bullet.vo.y = this.vo.y;
            this.bullet.updateView();
        }
        
        public getVOClazz():any {
            return MagneticTowerVO;
        }

        public dead():void {
            super.dead();

            var facade:puremvc.IFacade = puremvc.Facade.getInstance('Map');
            facade.sendNotification( 'REMOVE_FROM_BUILD', this.bullet);
        }
    }
}