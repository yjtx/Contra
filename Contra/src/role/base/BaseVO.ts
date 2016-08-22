module tank {
    export class BaseVO extends one.MapItemVO {
        attack:number = 0;
        defense:number = 0;
        health:number = 0;
        mana:number = 0;

        buildId:number;

        resVO:ResourceVO;

        subType:number = 0;

        public initConfig(buildId:number, side:number):void {

            this.buildId = buildId;

            var cfg:any = RES.getRes("itemCfg_json")[buildId];

            this.initType(cfg['type']);
            this.initSide(side);

            this.resVO = new ResourceVO();
            this.resVO.initConfig(cfg);

            this.subType = cfg['subType'] || 1;

            if (cfg['properties']) {
                this.attack = cfg['properties']['attack'] || 0;
                this.defense = cfg['properties']['defense'] || 0;
                this.health = cfg['properties']['health'] || 0;
                this.mana = cfg['properties']['mana'] || 0;
            }

            if (cfg['size']) {
                if (cfg['size']['range']) {
                    this.setRange(cfg['size']['range'][0], cfg['size']['range'][1], cfg['size']['range'][2], cfg['size']['range'][3]);
                }
                
                if (this.type == one.ItemType.BRIDGE) {
                    var bridges = cfg['size']['bridgeSizes'];
                    if (bridges) {
                        var blockVOs = [];
                        for (var i:number = 0; bridges && i < bridges.length; i++) {
                            var blockVO = new one.BlockVO(bridges[i][0], bridges[i][1], bridges[i][2], bridges[i][3]);
                            blockVOs.push(blockVO);
                        }
                        (<one.BridgeExtVO>this.extVO).setBridgeSizes(blockVOs);
                    }
                }
                else if (this.type == one.ItemType.RIVER) {
                    var rivers = cfg['size']['riverSizes'];
                    if (rivers) {
                        var blockVOs = [];
                        for (var i:number = 0; rivers && i < rivers.length; i++) {
                            var blockVO = new one.BlockVO(rivers[i][0], rivers[i][1], rivers[i][2], rivers[i][3]);
                            blockVOs.push(blockVO);
                        }
                        (<one.RiverExtVO>this.extVO).setRiverSizes(blockVOs);
                    }
                }
                else if (this.type == one.ItemType.BULLET || this.type == one.ItemType.BOMB) {
                    var attackSizes = cfg['size']['attackSizes'];
                    if (attackSizes) {
                        var blockVOs = [];
                        for (var i:number = 0; attackSizes && i < attackSizes.length; i++) {
                            var blockVO = new one.BlockVO(attackSizes[i][0], attackSizes[i][1], attackSizes[i][2], attackSizes[i][3]);
                            blockVOs.push(blockVO);
                        }
                        (<one.AttackExtVO>this.extVO).setAttackSizes(blockVOs);
                    }
                }


                var blocks = cfg['size']['beAttackedSizes'];
                var blockVOs = [];
                for (var i:number = 0; blocks && i < blocks.length; i++) {
                    var blockVO = new one.BlockVO(blocks[i][0], blocks[i][1], blocks[i][2], blocks[i][3]);
                    blockVOs.push(blockVO);
                }
                this.setBeAttackBlocks(blockVOs);

                var blocks = cfg['size']['blockSizes'];
                var blockVOs = [];
                for (var i:number = 0; blocks && i < blocks.length; i++) {
                    var blockVO = new one.BlockVO(blocks[i][0], blocks[i][1], blocks[i][2], blocks[i][3]);
                    blockVOs.push(blockVO);
                }
                this.setBlocks(blockVOs);
            } 
            
            this.initCfg(cfg);
        }

        protected initCfg(cfg:any):void {

        }
    }

    export class BuildType {
        static STONE:number = 1;
        static TANk:number = 2;
        static TOWER:number = 3;
        static HEADQUARTER:number = 4;
        static MagneticTower:number = 5;//磁能塔
    }
}
