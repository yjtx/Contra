module tank {
    export class ExploededMediator extends puremvc.Mediator {
        public static NAME: string = "ExploededMediator";

        constructor(view: any) {
            super(ExploededMediator.NAME, view);
        }

        listNotificationInterests(): string[] {
            return ["EXPLOEDED"];
        }

        handleNotification(notification: puremvc.INotification) {
            if (notification.getName() == 'EXPLOEDED') {
                var b: one.Bullet = notification.getBody();
                this.exploded(b);
            }
        }

        private exploded(b: one.Bullet): void {
            var map: one.Map = this.getViewComponent();
            var proxy:one.MapProxy = map.mapProxy;

            var missleVO: one.BulletVO = <one.BulletVO>b.vo;

            var excludeIds: Array<number> = (<one.AttackExtVO>missleVO.extVO).getExcludeIds().concat([missleVO.hashId]);

            var hashIds: Array<number> = proxy.getAttacks(missleVO.x, missleVO.y, (<one.AttackExtVO>missleVO.extVO).getAttackSizes(), missleVO.type, missleVO.side, excludeIds, 100000, 2);

            var voes:Array<one.MapItemVO> = [];
            for (var i: number = 0; i < hashIds.length; i++) {
                if (!proxy.getBuildVO(hashIds[i])) {
                    continue;
                }

                var buildVO: tank.BaseVO = <tank.BaseVO>proxy.getBuildVO(hashIds[i]);
                voes.push(buildVO);

                if (missleVO.attack > buildVO.defense) {
                    buildVO.health -= missleVO.attack - buildVO.defense;

                    var build: tank.BaseItem = <tank.BaseItem>buildVO.item;
                    if (buildVO.health <= 0) {
                        build.dead();
                    }
                    else {
                        build.beAttack();
                    }
                }
            }

            b.attack(voes);
        }
    }
}