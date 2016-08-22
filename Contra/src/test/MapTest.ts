class MapTest extends egret.DisplayObjectContainer {
    constructor() {
        super();
        
        this.once(egret.Event.ADDED_TO_STAGE, this.init, this);
    }
    
    private init(e:egret.Event):void {
        
        var map:tank.WarMap = new tank.WarMap(this.stage.stageWidth, this.stage.stageHeight);
        this.addChild(map);
        map.init();
        
        var rocker:tank.Rocker = new tank.Rocker();
        this.addChild(rocker);
        rocker.init();

        var k = one.KeyCode;
        one.OptionCtr.getInstance().initKeys([k.Key_W, k.Key_S, k.Key_A, k.Key_D], 
            [k.Key_J, k.Key_K, k.Key_L, k.Key_Y, k.Key_U, 
            k.Key_I, k.Key_O, k.Key_P, k.Key_B, k.Key_N, k.Key_M]);
        one.OptionCtr.getInstance().initRocker(rocker, rocker.getBtns());
        one.OptionCtr.getInstance().start();
    }
    
    
}