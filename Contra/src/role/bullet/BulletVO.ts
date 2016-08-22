module one {
    export class BulletVO extends tank.BaseVO implements tank.IRunningVO {
        
        fireInterval:number = 100;
        speed:number = 1;

        bulletId:number = 0;
        bulletPower:number = 0;

        HardnessType:number = 0;
        intervalTime:number = 1000;

        isAttacking:boolean = true;
        
        attackNumbers:number = 1;
        
        constructor() {
            super();
            
        }

        private attackingIds:Array<number> = [];

        private attackedIds:{[id:number]:number} = {};
        public addAttackId(hashId:number):void {
            var time:number = egret.getTimer();

            this.attackedIds[hashId] = time;
        }

        public getAttackingIds():Array<number> {
            this.attackingIds.length = 0;
            var time:number = egret.getTimer();
            for (var key in this.attackedIds) {
                var orTime:number = this.attackedIds[key];

                if (time - orTime <= this.intervalTime) {
                    this.attackingIds.push(parseInt(key));
                }
                else {
                    delete this.attackedIds[key];
                }
            }
            return this.attackingIds;
        }

        //
        private stepX:number = 0;
        private stepY:number = 0;

        getStepX():number {
            return this.stepX;
        }

        getStepY():number {
            return this.stepY;
        }

        addStepX():void {
            this.x += this.stepX;
        }

        addStepY():void {
            this.y += this.stepY;
        }

        protected initCfg(cfg:any):void {
            super.initCfg(cfg);

            if (cfg.bullet) {
                this.bulletId = cfg['bullet']['id'];
                this.bulletPower = cfg['bullet']['power'] || 1;
            }

            this.speed = cfg['properties']['speed'] || 1;
            this.HardnessType = cfg['properties']['hardness'];
            this.intervalTime = (cfg['properties']['interval'] || 0) * 1000;
        }

        //更改旋转弧度
        public changeTankRotation(rotation:number, power:number):void {
            super.changeRotation(rotation);
            
            if (power != 0) {
                this.stepX = -power * this.speed * Math.sin(this.rotation / 180 * Math.PI);
                this.stepY = power * this.speed * Math.cos(this.rotation / 180 * Math.PI);
            }
            else {
                this.stepX = 0;
                this.stepY = 0;
            }
        }
    }
}

module tank {
    export class HardnessType {
        static ONCE:number = 1;//普通子弹，一次一个。不管被攻击对象强与弱，攻击到子弹即消失。
        static Less:number = 2;//随着攻击物体后攻击力减少。每消灭一个对象，攻击力相应减小，直至攻击力为 0 消失。
        static Constant:number = 3;//伤害恒定的，按照设定的间隔时间来降低被攻击物体血量。攻击力永不更改，一直持续。会有个对同一对象持续伤害的间隔时间
        static BOMB:number = 4;//直接攻击，不管有没有攻击到对象。
    }

    export class BulletType {
        static M:number = 1;//普通子弹
        static S:number = 2;//散弹
        static F:number = 3;//撞击后会出现排列的5个小型散弹
        static L:number = 4;//激光弹
        static MINE:number = 5;//地雷、水雷
        static MISSILE:number = 6;//导弹
        static NUCLEAR:number = 7;//核弹
        static FIRE:number = 8;//喷火
        static Magnetic:number = 9;//磁能子弹
    }

}