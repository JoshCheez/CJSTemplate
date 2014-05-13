
    
(function () {
    var stage;
    var graph;
    var bgShape;
    var height;
    var width;
    var StartPos = [0,0];
    var endPos = [250, 400];
    var dx = 3;
    var dy = 3;
    var CompleteGrid = []
    var random_tile;
    var col = 5;
    var row = 5;
    var Tile_Obj = {
        tiletype: 0,
        y: 0,
        x: 0,
    }
    
    function init() {

        canvas = document.getElementById('mainwindow');
        context = canvas.getContext("2d");
        stage = new createjs.Stage( canvas );
        var w = stage.canvas.width;
        var h = stage.canvas.height;
        height = 100;
        width = 50;

        CompleteGrid = [];
        for (var k = 0; k < row; k++) {
            CompleteGrid.push(Tile_Obj);
        }
        CompleteGrid[2].tiletype = 1;

        //CompleteGrid = new Array(row);
        //for (var i = 0; i < CompleteGrid.length; i++) {
        //    CompleteGrid[i] = new Array(col);
        //}

        //for (var x = 0; x < CompleteGrid.length; x++) {
        //    for (var y = 0; y < CompleteGrid[0].length; y++) {
        //        CompleteGrid[x][y] = Tile_Obj;
        //        CompleteGrid[x][y].type = 0;
        //    }
        //    random_tile = (Math.floor(Math.random() * CompleteGrid.length))
        //    //CompleteGrid[0][0].type = 23;
        //    //CompleteGrid[x][random_tile].type = 1;
        //}
        //CompleteGrid[0][0].type = 1;
        console.log(CompleteGrid);
        

        


        bgBlack = new createjs.Shape();
        bgBlack.graphics.beginStroke("#F00").beginFill("#000000").drawRect(0, 0, width, height).draw(context);
        bgBlack.x = 1;
        context.fillText(bgBlack.x, 5, 5)
        stage.addChild(bgBlack);


        bgWhite = new createjs.Shape();
        bgWhite.graphics.beginStroke("#F00").beginFill("#FFFFFF").drawRect(0, 100, width, height).draw(context);
        bgWhite.x = 0;
        context.fillText(bgWhite.x, 5, 5)
        stage.addChild(bgWhite);
        createjs.Ticker.addEventListener("tick", handleTick);


    }

    function handleTick(event) {
        //console.log (bgShape.x);
        //bgShape.x += dx
        //if ((bgShape.x + width)> endPos[0] || bgShape.x < StartPos[0] ||
        //    bgShape.y > endPos[1] || bgShape.y < StartPos[1]) {
        //    dx = -dx;
        //    //dy = -dy;
        //}


        stage.update();
    }

    init();
})();
  