module tank {
    export class WarMap extends egret.DisplayObjectContainer {
        constructor(width:number, height:number) {
            super();
        }

        private map:one.Map;

        private proxy:tank.WarProxy;
        
        private sdf():void {
        }

        public init():void {
            Effect.start();

            this.map = new one.Map();
            this.addChild(this.map);
            this.map.setScreenSize(this.stage.stageWidth, this.stage.stageHeight);
            
			var facade:puremvc.IFacade = puremvc.Facade.getInstance('Map');
            facade.registerCommand(one.CreateBulletCMD.NAME, one.CreateBulletCMD);
            facade.registerCommand(one.CreateBombCMD.NAME, one.CreateBombCMD);
            
            facade.registerProxy(new tank.AAAProxy());

            facade.registerProxy(new puremvc.Proxy("mapProxy", this.map.mapProxy));


			var mapMediator:puremvc.IMediator = new tank.MapMediator( this.map );
			facade.registerMediator( mapMediator );
            
			var mapMediator:puremvc.IMediator = new tank.ExploededMediator( this.map );
			facade.registerMediator( mapMediator );

			var facade1:puremvc.IFacade = puremvc.Facade.getInstance('Tower');
			var mapMediator1:puremvc.IMediator = new tank.TowerMediator( this.map );
			facade1.registerMediator( mapMediator1 );
            

            var ans = new tank.MapAnalysis();
            ans.initMap(parseInt(egret.getOption('mapid')) || 1, this.map);


            this.proxy = new tank.WarProxy();
            this.proxy.setMapSize(this.map.mapW, this.map.mapH);
            this.proxy.initValues(this.map.screenW, this.map.screenH, this.map);

        }
    }
}