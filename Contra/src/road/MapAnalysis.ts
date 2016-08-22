module tank {
    export class MapAnalysis {

        constructor() {
        }

        private map:one.Map;
        
        public initMap(id:number, map:one.Map):void {
            var config = RES.getRes("map" + id + "_json");
            this.map = map;
            
            this.map.setMapSize(config.width, config.height);
            
            this.initItems(config.res.g);
            this.initItems(config.res.r);
            this.initItems(config.res.b);
            this.initItems(config.res.s);
            this.initItems(config.res.z);
            this.initItems(config.res.t);
            this.initMainHero(config.res.m[0]);

            this.map.refreshRivers();

        }

        private initItems(gArr:Array<any>):void {
            for (var i:number = 0; gArr && i < gArr.length; i++) {
                var info:any = gArr[i];

                for (var y:number = 0; y < info.n[0]; y++) {
                    for (var x:number = 0; x < info.n[1]; x++) {

                        var bg:tank.BaseItem = ItemFactory.createItem(info.id, info.side || one.SideType.NEUTRAL);

                        bg.vo.x = info.p[0] + x * info.d[0];
                        bg.vo.y = info.p[1] + y * info.d[1];
                        if (info.r) {
                            bg.vo.changeRotation(info.r);
                            bg.rotationChanged();
                        }
                        bg.updateView();

                        if (bg.vo.type == one.ItemType.LAND) {
                            this.map.addToGround(bg, false);
                        }
                        else if (bg.vo.type == one.ItemType.RIVER
                                || bg.vo.type == one.ItemType.BRIDGE) {
                            this.map.addToGround(bg, true);
                        }
                        else {
                            this.map.addBuild(bg);
                        }
                        
                    }
                }
            }
        }

        private initMainHero(info:any):void {
            var role:one.Tank = new one.Tank(info.id || 1, one.SideType.FRIEND, true);

            role.vo.x = info.p[0];
            role.vo.y = info.p[1];
            role.updateView();

            this.map.addBuild(role);
        }
    }
}