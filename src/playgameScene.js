var PlayGameLayer = cc.Layer.extend({
    beforeimageSprite:null,
    afterimageSprite:null,
    playimageSprite:null,
    barSprite:null,
    listener:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        // ----- 変更後の画像を作成する
        afterimageSprite = new cc.Sprite(res.AfterImage_png);
        afterimageSprite.attr({
            x: size.width / 2,
            y: size.height - 200,
        });
        this.addChild(afterimageSprite, 0);

        // ----- 変更前の画像を作成する
        beforeimageSprite = new cc.Sprite(res.BeforeImage_png);
        beforeimageSprite.attr({
            x: size.width / 2,
            y: size.height - 200,
        });
        this.addChild(beforeimageSprite, 1);

        // ----- 再生ボタンの画像を作成する
        playimageSprite = new cc.Sprite(res.PlayImage_png);
        playimageSprite.attr({
            x: size.width / 2,
            y: size.height - 200,
        });
        this.addChild(playimageSprite, 2);

        // ----- 時計枠の画像を作成する
        var wakuSprite = new cc.Sprite(res.Waku_png);
        wakuSprite.attr({
            x: 650,
            y: 380,
        });
        this.addChild(wakuSprite, 3);

        // ----- 秒針の画像を作成する
        barSprite = new cc.Sprite(res.Bar_png);
        barSprite.attr({
            x: 650,
            y: 380,
            anchorX: 0.5,
            anchorY: 0,
        });
        this.addChild(barSprite, 4);

        // ----- 答えを見るボタンを作成する
        var answerbuttonItem = new cc.MenuItemImage(
            res.AnswerButtonS_png,
            res.AnswerButtonE_png,
            this.onAnswerButtonTapped,
            this
        );
        answerbuttonItem.attr({
            x: size.width / 2,
            y: 35,
        });
        var menu = new cc.Menu(answerbuttonItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu);

        // ----- イベントリスナーを登録する
        listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        });
        cc.eventManager.addListener(listener, playimageSprite);

        return true;
    },

    onAnswerButtonTapped:function() {
        // ----- 答え画面へ遷移する
        cc.director.runScene(new AnswerScene());
    },

    onTouchBegan:function(touch, event) {
        var target = event.getCurrentTarget();
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var s = target.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);

        if(cc.rectContainsPoint(rect, locationInNode)) {
            // スプライトをタップした
            return true;
        }
        return false;
    },

    onTouchMoved:function(touch, event) {
    },

    onTouchEnded:function(touch, event) {
        // ----- 親（レイヤー）のゲームスタート関数を呼ぶ
        var target = event.getCurrentTarget();
        var parent = target.getParent();
        parent.startGame();
    },

    startGame:function() {
        // ----- 再生ボタンを非表示にする
        playimageSprite.setVisible(false);

        // ----- イベントリスナーを削除する
        cc.eventManager.removeListener(listener);

        // ----- １分かけて変更前の画像を透明にする
        beforeimageSprite.runAction(new cc.fadeOut(60));

        // ----- １分かけて秒針を360度回転させ、終わったらリセットする
        var resetFunc = new cc.callFunc(this.resetGame, this);
        var rotate = new cc.RotateBy(60, 360);
        barSprite.runAction(cc.sequence(rotate, resetFunc));
    },

    resetGame:function() {
        // ----- 再生ボタンを表示する
        playimageSprite.setVisible(true);

        // ----- 変更前の画像の透明度を戻す
        beforeimageSprite.opacity = 255;

        // ----- イベントリスナーを登録する
        listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        });
        cc.eventManager.addListener(listener, playimageSprite);
    },

});

var PlayGameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PlayGameLayer();
        this.addChild(layer);
    }
});
