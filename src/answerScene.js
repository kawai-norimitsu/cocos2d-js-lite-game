var AnswerLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;

        // ----- 変更前の画像を作成する
        var beforeimageSprite = new cc.Sprite(res.BeforeImage_png);
        beforeimageSprite.attr({
            x: size.width / 2,
            y: size.height - 200,
        });
        this.addChild(beforeimageSprite, 1);

        // ----- 変更後の画像を作成する
        var afterimageSprite = new cc.Sprite(res.AfterImage_png);
        afterimageSprite.attr({
            x: size.width / 2,
            y: size.height - 200,
        });
        this.addChild(afterimageSprite, 0);

        // ----- 答えの画像を作成する
        var answerimageSprite = new cc.Sprite(res.AnswerImage_png);
        answerimageSprite.attr({
            x: 650,
            y: 380,
        });
        this.addChild(answerimageSprite, 2);

        // ----- 戻るボタンを作成する
        var backbuttonItem = new cc.MenuItemImage(
            res.BackButtonS_png,
            res.BackButtonE_png,
            this.onBackButtonTapped,
            this
        );
        backbuttonItem.attr({
            x: size.width / 2,
            y: 35,
        });
        var menu = new cc.Menu(backbuttonItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 3);

        // ----- 画像を交互に見せる
        var blink = cc.sequence(cc.fadeTo(0.5, 0), cc.fadeTo(0.5, 255));
        beforeimageSprite.runAction(cc.repeatForever(blink));

        return true;
    },

    onBackButtonTapped:function() {
        // ----- ゲーム画面へ遷移する
        cc.director.runScene(new PlayGameScene());
    },

});

var AnswerScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new AnswerLayer();
        this.addChild(layer);
    }
});
