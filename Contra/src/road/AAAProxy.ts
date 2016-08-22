module tank {
    export class AAAProxy extends puremvc.Proxy implements puremvc.IProxy {
        constructor() {
            super(AAAProxy.NAME, '');
        }

        onRegister(): void {
        }

        onRemove(): void {
        }

        test111():void {
            console.log("asdfasdf ");
        }

        public static NAME: string = 'AAAProxy';

    }
}