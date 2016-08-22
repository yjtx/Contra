module one {
    export class MapInitCommand extends puremvc.SimpleCommand {
        constructor() {
            super();
        }
        
        public execute(notification: puremvc.INotification): void {
            var mapCfg:Object = <Object>notification;
            
            var mapVO:MapVO = <MapVO><any>(this.facade().retrieveProxy(MapVO.NAME));
            
        }
    }
}