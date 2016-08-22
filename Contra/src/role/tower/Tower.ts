module tank {
    export class Tower extends tank.BaseItem {
        constructor(buildId:number, side:number) {
            super(buildId, side);

            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        private onAddToStage(e:egret.Event):void {

            var facade:puremvc.IFacade = puremvc.Facade.getInstance('Tower');
            facade.sendNotification( 'ADD_TOWER', this );
        }

        private onRemoveFromStage(e:egret.Event):void {
            var facade:puremvc.IFacade = puremvc.Facade.getInstance('Tower');
            facade.sendNotification( 'REMOVE_TOWER', this );
        }
    }
}