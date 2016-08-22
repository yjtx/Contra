module one {
    export class Anmiation extends egret.DisplayObjectContainer {
        
        movie:egret.DisplayObject;
        type:number = 0;//0 图片  1 db  2 mc
        constructor(vo:tank.ResourceVO) {
            super();
            
            this.type = vo.type;
            if (vo.type == tank.ResourceType.DB) {
                this.init(RES.getRes(vo.name + "_ske_json"), RES.getRes(vo.name + "_texture_json"), RES.getRes(vo.name + "_texture_png"), vo.armatureName, vo.animationName);
            }
            else if (vo.type == tank.ResourceType.MC) {
                this.initMC(RES.getRes(vo.name + "_json"), RES.getRes(vo.name + "_png"), vo.mcName, vo.animationName);
            }
            else {
                if (vo.name != "") {
                    this.movie = new egret.Bitmap(RES.getRes(vo.name));
                }
                else {
                    this.movie = new egret.Bitmap();
                }
                this.addChild(this.movie);
            }
            this.movie.scaleX = vo.scaleX;
            this.movie.scaleY = vo.scaleY;
            this.movie.anchorOffsetX = vo.offX;
            this.movie.anchorOffsetY = vo.offY;
        }
        
        public setScale(scaleX:number, scaleY:number):void {
            this.movie.scaleX = scaleX;
            this.movie.scaleY = scaleY;
        }

        private animationName:string = "";
        changeAnimation(name:string, times:number):void {
            if (this.animationName == name) {
                return;
            }

            this.animationName = name;
            if (this.type == tank.ResourceType.DB) {
                this.armature.animation.gotoAndPlay(name, times);
            }
            else if (this.type == tank.ResourceType.MC) {
                this.mc.gotoAndPlay(name, times);
            }
        }

        private armature:dragonBones.Armature;
        private init(skeletonData, textureData, texture, armatureName, animationName):void {
            var factory = new dragonBones.EgretFactory();
            factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
            factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
            
            var armature = this.armature = factory.buildArmature(armatureName);
            var armatureDisplay = this.movie = armature.getDisplay();
            dragonBones.WorldClock.clock.add(armature);
            this.addChild(armatureDisplay);
            armature.animation.gotoAndPlay(animationName, 0);

            var self = this;
            armature.addEventListener(dragonBones.AnimationEvent.COMPLETE, function (e) {
                self.dispatchEvent(e);
            },this);

            armature.addEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT , function (e) {
                self.dispatchEvent(e);
            },this);

            armature.addEventListener(dragonBones.FrameEvent.MOVEMENT_FRAME_EVENT , function (e) {
                self.dispatchEvent(e);
            },this);
        }

        private mc:egret.MovieClip;
        private initMC(movieclipData, texture, mcName, animationName):void {
            var mcDataFactory1 = new egret.MovieClipDataFactory(movieclipData, texture);
            var movie:egret.MovieClip = this.movie = this.mc = new egret.MovieClip((mcDataFactory1).generateMovieClipData(mcName));
            this.addChild(this.mc);
            this.mc.gotoAndPlay(animationName, -1);

            var self = this;
            movie.addEventListener(egret.Event.COMPLETE, function (e) {
                self.dispatchEvent(e);
            },this);
            movie.addEventListener(egret.Event.LOOP_COMPLETE, function (e) {
                self.dispatchEvent(e);
            },this);

            movie.addEventListener(egret.MovieClipEvent.FRAME_LABEL , function (e) {
                self.dispatchEvent(e);
            },this);
        }
    }
    
    function getInfoById(id:number):{name:string, armature?:string, animation?:string} {
        switch (id) {
            case 2:
                return {"name" :"enemy_png"};
            case 11:
                return {"name" :"bullet_png"};
            case 12:
                return {"name" :"bullet2_png"};
            case 21:
                return {"name" :"stone_png"};
            case 101:
                return {"name" :"tank", "armature":"myTank", "animation":"walk"};
            default:
                return {"name" :"hero_png"};
        }
    }
        
    
}
