var TitleLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;

        // ----- 背景を作成する
        var backgroundSprite = new cc.Sprite(res.BackGround_png);
        backgroundSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
        });
        this.addChild(backgroundSprite);

        // ----- スタート表示を作成する
        var taptostartSprite = new cc.Sprite(res.TapToStart_png);
        taptostartSprite.attr({
            x: size.width / 2,
            y: size.height / 5,
        });
        this.addChild(taptostartSprite);

        // ----- スタート表示を点滅させる
        var blink = cc.sequence(cc.fadeTo(0.5, 127), cc.fadeTo(0.5, 255));
        taptostartSprite.runAction(cc.repeatForever(blink));

        // ----- タッチイベントリスナーを登録する
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        return true;
    },

    onTouchBegan:function(touch, event) {
        return true;
    },

    onTouchMoved:function(touch, event) {
    },

    onTouchEnded:function(touch, event) {
        // ----- ゲーム画面へ遷移する
        cc.director.runScene(new PlayGameScene());
    },

});

var TitleScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new TitleLayer();
        this.addChild(layer);
    }
});
