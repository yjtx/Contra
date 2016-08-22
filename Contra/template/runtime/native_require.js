
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/modules/dragonBones/dragonBones.js",
	"libs/modules/puremvc/puremvc.js",
	"libs/modules/utils/utils.js",
	"libs/modules/map/map.js",
	"libs/modules/rocker/rocker.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/command/CreateBombCMD.js",
	"bin-debug/command/CreateBulletCMD.js",
	"bin-debug/command/MapInitCommand.js",
	"bin-debug/effects/Effect.js",
	"bin-debug/factory/ItemFactory.js",
	"bin-debug/road/AAAProxy.js",
	"bin-debug/road/ExploededMediator.js",
	"bin-debug/road/MapAnalysis.js",
	"bin-debug/road/MapMediator.js",
	"bin-debug/road/WarMap.js",
	"bin-debug/road/WarProxy.js",
	"bin-debug/rocker/Rocker.js",
	"bin-debug/role/base/BaseItem.js",
	"bin-debug/role/Headquarter.js",
	"bin-debug/role/HeadquarterMediator.js",
	"bin-debug/role/IRunningVO.js",
	"bin-debug/role/Stone.js",
	"bin-debug/role/base/Animation.js",
	"bin-debug/role/base/BaseVO.js",
	"bin-debug/role/base/ResourceVO.js",
	"bin-debug/role/base/RunningItem.js",
	"bin-debug/role/bullet/Bullet.js",
	"bin-debug/role/bullet/BulletVO.js",
	"bin-debug/role/bullet/FBullet.js",
	"bin-debug/role/bullet/FireBullet.js",
	"bin-debug/role/bullet/LightBullet.js",
	"bin-debug/role/bullet/MagneticBullet.js",
	"bin-debug/role/bullet/Mine.js",
	"bin-debug/role/bullet/Missile.js",
	"bin-debug/role/bullet/MissileVO.js",
	"bin-debug/role/bullet/NuclearBomb.js",
	"bin-debug/role/tank/IntelligentExt.js",
	"bin-debug/role/tank/MainHeroExt.js",
	"bin-debug/role/tank/Shadow.js",
	"bin-debug/role/tank/Tank.js",
	"bin-debug/role/tank/TankMediator.js",
	"bin-debug/role/tank/TankVO.js",
	"bin-debug/role/tower/MagneticTower.js",
	"bin-debug/role/tower/MagneticTowerVO.js",
	"bin-debug/role/tower/Tower.js",
	"bin-debug/role/tower/TowerMediator.js",
	"bin-debug/test/MapTest.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "fixedHeight",
		contentWidth: 960,
		contentHeight: 640,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0x00c200,bgAlpha:0.9",
		showLog: true,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};