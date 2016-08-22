module tank {
    export class ResourceVO {
        //------------建筑素材创建相关------------
        //素材中心点，用来创建动画偏移位置的
        offX:number = 0;
        offY:number = 0;
        scaleX:number = 1;
        scaleY:number = 1;

        type:number;
        name:string;
        armatureName:string;
        mcName:string;
        animationName:string;
        //------------建筑素材创建相关------------
        
        public initConfig(cfg:any):void {
            this.offX = cfg['res']['offPoint'][0] || 0;
            this.offY = cfg['res']['offPoint'][1] || 0;
            this.scaleX = cfg['res']['offPoint'][2] || 1;
            this.scaleY = cfg['res']['offPoint'][3] || 1;

            this.name = cfg['res']['name'];
            this.type = cfg['res']['t'] || 0;

            this.armatureName = cfg['res']['armature'];
            this.mcName = cfg['res']['mc'];
            this.animationName = cfg['res']['animation'];
        }
    }

    export const enum ResourceType {
        BITMAP = 0,
        DB = 1,
        MC = 2
    }

}