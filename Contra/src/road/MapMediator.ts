module tank {
    export class MapMediator extends puremvc.Mediator {
        public static NAME: string = "MapMediator";

        constructor(view: any) {
            super(MapMediator.NAME, view);
        }

        listNotificationInterests(): string[] {
            return ['ADD_TO_BULLET', 'ADD_TO_GROUND', 'ADD_TO_EFFECT', 'ADD_TO_BUILD', "REMOVE_FROM_BUILD", "REMOVE_VO", "CAMERA"];
        }

        handleNotification(notification: puremvc.INotification) {
            if (notification.getName() == 'ADD_TO_BULLET') {
                var map: one.Map = this.getViewComponent();

                map.addBullet(notification.getBody());
            }
            else if (notification.getName() == 'ADD_TO_GROUND') {
                var map: one.Map = this.getViewComponent();

                map.addToGround(notification.getBody(), false);
            }
            else if (notification.getName() == 'ADD_TO_EFFECT') {
                var map: one.Map = this.getViewComponent();

                map.addToEffect(notification.getBody());
            }
            else if (notification.getName() == 'ADD_TO_BUILD') {
                var map: one.Map = this.getViewComponent();

                map.addBuild(notification.getBody());
            }
            else if (notification.getName() == 'REMOVE_FROM_BUILD') {
                var map: one.Map = this.getViewComponent();

                map.removeItem(notification.getBody());
            }
            else if (notification.getName() == 'REMOVE_VO') {
                var map: one.Map = this.getViewComponent();

                map.removeVO(notification.getBody());
            }
            else if (notification.getName() == 'CAMERA') {
                var map: one.Map = this.getViewComponent();
                var p: egret.Point = notification.getBody();
                map.fixedCamera(p);
            }
        }
    }
}