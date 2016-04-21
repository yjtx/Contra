module one {
    export class Map extends egret.DisplayObjectContainer {
        
        private groundLayer:egret.DisplayObjectContainer;
        private roleLayer:egret.DisplayObjectContainer;
        private bulletLayer:egret.DisplayObjectContainer;
        
        constructor() {
            super();
        }
        
        public addBullet(x:number, y:number, rotation:number, dicX:number, dicY:number):void {
            
        }
        
        public addEnemyBullet():void {
            
        }
        
        public loop():void {
            //计算主角的位置，并算出地图移动位置
            
            //移动地图，移动子弹层
            
            //判断子弹与人物碰撞问题
            
        }
    }
}