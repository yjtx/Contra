/**
 * Created by yjtx on 15-6-23.
 */

class Effect extends egret.DisplayObjectContainer {

    private skeletonData;
    private textureData;
    private texture;
    private armatureName;
    private animationName;
    public constructor(skeletonData, textureData, texture, armatureName, animationName) {
        super();

        this.skeletonData = skeletonData;
        this.textureData = textureData;
        this.texture = texture;
        this.armatureName = armatureName;
        this.animationName = animationName;
    }

    public initRoot():void {
        var self = this;

        //眼睛有bug
        var container = new egret.DisplayObjectContainer();

        this.addChild(container);
        
        var factory = new dragonBones.EgretFactory();
        factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(this.skeletonData));
        factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(this.texture, this.textureData));
        
        var armature = factory.buildArmature(this.armatureName);
        var armatureDisplay = armature.getDisplay();
        dragonBones.WorldClock.clock.add(armature);
        container.addChild(armatureDisplay);
        armature.animation.gotoAndPlay(this.animationName, 0);

        var func = function (e) {
            
            self.dispatchEvent(e);
            self.parent.removeChild(self);

            dragonBones.WorldClock.clock.remove(armature);

            armature.removeEventListener(dragonBones.AnimationEvent.COMPLETE, func, self);
        };
        armature.addEventListener(dragonBones.AnimationEvent.COMPLETE, func, this);
    }

    static start():void {
        egret.Ticker.getInstance().register(function (advancedTime):boolean {
            dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
            return true;
        }, this);
    }
}

