module tank {
    export class Headquarter extends tank.BaseItem {
        constructor(buildId:number, side:number) {
            super(buildId, side);


			var facade:puremvc.IFacade = puremvc.Facade.getInstance('Headquarter');
			var roleM:puremvc.IMediator = new tank.HeadquarterMediator( this );
			facade.registerMediator( roleM );
        }

        public getVOClazz():any {
            return tank.BaseVO;
        }
    }
}