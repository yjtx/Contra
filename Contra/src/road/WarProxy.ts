module tank {
    export class WarProxy {
        private map:one.Map;
        private mapProxy:one.MapProxy;

        private minX:number = 0;
        private minY:number = 0;
        private maxX:number = 0;
        private maxY:number = 0;

        private screenW:number = 0;
        private screenH:number = 0;

        public setMapSize(w:number, h:number):void {
            this.minX = 0;
            this.minY = 0;
            this.maxX = w;
            this.maxY = h;
        }

        public initValues(screenW:number, screenH:number, 
                        map:one.Map):void {
            this.screenW = screenW;
            this.screenH = screenH;

            this.map = map;
            this.mapProxy = map.mapProxy;

            //创建主角
            egret.startTick(this.loop, this);
        }

        public loop(t:number):boolean {
            var array:Array<one.MapItemVO>;
            array = this.map.getAllVOes(one.ItemType.BUILD);

            //计算主角的位置，并算出地图移动位置
            for (var i = array.length - 1; i >= 0; i--) {
                var role:one.RunningItem = <one.RunningItem>array[i].item;
                if (!this.mapProxy.getBuildVO(role.vo.hashId)) {
                    continue;
                }
                
                else if (role.vo.type == one.ItemType.BUILD && (<tank.BaseVO>role.vo).subType == tank.BuildType.TANk) {
                    var roleVO:one.TankVO = <one.TankVO>role.vo;
                    
                    var stepX:number = roleVO.getStepX();
                    var stepY:number = roleVO.getStepY();

                    if (stepX != 0) {
                        if (!this.mapProxy.isBlocked(roleVO.x + stepX, roleVO.y + stepY, roleVO.getBlockSizes(), roleVO.type, roleVO.side, roleVO.hashId)) {
                            roleVO.addStepX();
                            roleVO.addStepY();
                        
                            roleVO.x = Math.min(Math.max(roleVO.x, this.minX + roleVO.minX), this.maxX - roleVO.maxX);
                            roleVO.y = Math.max(roleVO.y, this.minY + roleVO.minY);
                            if (roleVO.y > this.maxY - roleVO.maxY) {
                                roleVO.y = this.maxY - roleVO.maxY;

                                (<one.Tank>role).run();
                            }

                            role.updateStep();

                            this.mapProxy.buildRefresh(roleVO);
                            role.updateView();
                        }
                        else if (!this.mapProxy.isBlocked(roleVO.x + stepX, roleVO.y, roleVO.getBlockSizes(), roleVO.type, roleVO.side, roleVO.hashId)) {
                            
                            if (!roleVO.isJumping()) {
                                (<one.Tank>role).run();
                            }

                            roleVO.addStepX();
                            roleVO.setStepY(0);
                            role.updateStep();
                            console.log(stepY);
                            
                            roleVO.x = Math.min(Math.max(roleVO.x, this.minX + roleVO.minX), this.maxX - roleVO.maxX);
                        
                            this.mapProxy.buildRefresh(roleVO);
                            role.updateView();
                        }
                        else if (!this.mapProxy.isBlocked(roleVO.x, roleVO.y + stepY, roleVO.getBlockSizes(), roleVO.type, roleVO.side, roleVO.hashId)) {
                            
                            roleVO.addStepY();
                            roleVO.y = Math.max(roleVO.y, this.minY + roleVO.minY);
                            if (roleVO.y > this.maxY - roleVO.maxY) {
                                roleVO.y = this.maxY - roleVO.maxY;

                                (<one.Tank>role).run();
                            }
                            
                            role.updateStep();
                        
                            this.mapProxy.buildRefresh(roleVO);
                            role.updateView();
                        }
                        else {
                            if (!roleVO.isJumping()) {
                                (<one.Tank>role).run();
                            }
                            roleVO.setStepY(0);
                                
                            role.updateStep();
                        }
                    }
                    else {
                        if (!this.mapProxy.isBlocked(roleVO.x, roleVO.y + stepY, roleVO.getBlockSizes(), roleVO.type, roleVO.side, roleVO.hashId)) {
                            roleVO.addStepY();
                            roleVO.y = Math.max(roleVO.y, this.minY + roleVO.minY);
                            if (roleVO.y > this.maxY - roleVO.maxY) {
                                roleVO.y = this.maxY - roleVO.maxY;

                                (<one.Tank>role).stand1();
                            }
                        
                            role.updateStep();
                        
                            this.mapProxy.buildRefresh(roleVO);
                            role.updateView();
                        }
                        else {
                            if (!roleVO.isJumping()) {
                                (<one.Tank>role).stand1();
                            }
                            roleVO.setStepY(0);
                                
                            role.updateStep();
                        }
                    }
                }
                else if (role.vo.type == one.ItemType.BULLET) {
                    this.dealBullet(role);
                }
            }
            
            array = this.map.getAllVOes(one.ItemType.BULLET);

            for (var i = 0; i < array.length; i++) {
                var vo:one.MapItemVO = array[i];
                if (!this.mapProxy.getBuildVO(vo.hashId)) {
                    continue;
                }

                this.dealBullet(<one.RunningItem>vo.item);
            }
            
            // this.map.sort();
            
            return false;
        }

        private dealBullet(role:one.RunningItem):void {
            var bulletVO:one.BulletVO = <one.BulletVO>role.vo;
            if (!this.mapProxy.getBuildVO(bulletVO.hashId)) {
                return;
            }

            if (bulletVO.type == one.ItemType.BULLET) {
                var excludeIds:Array<number> = (<one.AttackExtVO>bulletVO.extVO).getExcludeIds().concat([bulletVO.hashId]);

                if (bulletVO.subType == tank.BulletType.MINE) {
                    var tempHashIds:Array<number> = this.mapProxy.getAttacks(bulletVO.x + bulletVO.getStepX(), bulletVO.y + bulletVO.getStepY(), bulletVO.getBeAttackSizes(), bulletVO.type, bulletVO.side, excludeIds, 1, 1);
                    if (tempHashIds && tempHashIds.length > 0) {
                        (<one.Mine>role).dead();
                    }
                    return;
                }

                var attackSizes:Array<one.BlockVO> = (<one.AttackExtVO>bulletVO.extVO).getAttackSizes();
                if (attackSizes.length == 0) {
                    return;
                }
                excludeIds = excludeIds.concat(bulletVO.getAttackingIds());
                var criHashIds:Array<number> = this.mapProxy.getAttacks(bulletVO.x + bulletVO.getStepX(), bulletVO.y + bulletVO.getStepY(), attackSizes, bulletVO.type, bulletVO.side, excludeIds, bulletVO.attackNumbers, 2);
                if (criHashIds && criHashIds.length > 0) {
                    var voes:Array<one.MapItemVO> = [];
                    for (var i:number = 0; i < criHashIds.length; i++) {
                        var criHashId:number = criHashIds[i];
                        var buildVO:tank.BaseVO = <tank.BaseVO>this.mapProxy.getBuildVO(criHashId);
                        if (buildVO == null) {
                            continue;
                        }

                        voes.push(buildVO);

                        var build:tank.BaseItem = <tank.BaseItem>buildVO.item;
                        
                        var initBH = buildVO.health + buildVO.defense;
                        if (bulletVO.attack > buildVO.defense) {
                            buildVO.health -= bulletVO.attack - buildVO.defense;
                            
                            if (buildVO.health <= 0) {
                                build.dead();
                            }
                            else {
                                build.beAttack();
                            }
                        }
                        else {
                            build.beAttack();
                        }

                        if (bulletVO.HardnessType == tank.HardnessType.ONCE) {
                            bulletVO.attack = 0;
                            break;

                        }
                        else if (bulletVO.HardnessType == tank.HardnessType.Constant) {
                            if (buildVO.health > 0) {
                                bulletVO.addAttackId(criHashId);
                            }
                        }
                        else if (bulletVO.HardnessType == tank.HardnessType.Less) {
                            bulletVO.attack -= initBH;
                            if (bulletVO.attack <= 0) {
                                break;
                            }
                        }
                        else {
                            
                        }
                    }

                    (<one.Bullet>role).attack(voes);
                    if (bulletVO.attack <= 0) {
                        role.dead();
                    }
                    else {
                        // this.goBullet(role);
                    }
                    
                }
                else {
                    this.goBullet(role);
                }
            }
        }

        private goBullet(role:one.RunningItem):void {
            var bulletVO:one.BulletVO = <one.BulletVO>role.vo;
            if (bulletVO.subType == tank.BulletType.L) {
                return;
            }

            bulletVO.addStepX();
            bulletVO.addStepY();
            role.updateStep();
            
            if (bulletVO.x + bulletVO.maxY < -this.map.x 
                || bulletVO.x - bulletVO.minY > -this.map.x + this.screenW
                || bulletVO.y + bulletVO.maxY < -this.map.y
                || bulletVO.y - bulletVO.minY > -this.map.y + this.screenH) {
                (<one.Bullet>role).disappear();
            }
            else {
                this.mapProxy.buildRefresh(bulletVO);
                role.updateView();
            }
        }
    }
}