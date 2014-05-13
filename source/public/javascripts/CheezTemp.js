
    
(function () {
    var stage;
    var graph;
    var bgShape;
    var height;
    var width;
    var CompleteGrid = [];
    var random_tile;
    var col = 4
    var row = 10;
    var startx = 0;
    var starty = 0;

    function FillGrid(array, black, white) {
        for (var x = 0; x < CompleteGrid.length; x++) {
            for (var y = 0; y < CompleteGrid[0].length; y++) {
                CompleteGrid[x][y] = new Object();
                CompleteGrid[x][y] = { tiletype: 0, y: 0, x: 0, shape: 0};
            }
            random_tile = (Math.floor(Math.random() * CompleteGrid[0].length))
            CompleteGrid[x][random_tile].tiletype = 1;
            console.log("Random = " + random_tile);
        }
        console.log(CompleteGrid);

        for (var k = 0; k < CompleteGrid.length; k++) {
            console.log(CompleteGrid[0].length);
            for (var i = 0; i < CompleteGrid[0].length; i++) {
                if (CompleteGrid[k][i].tiletype === 0) {
                    console.log("k = " + k);
                    console.log("i = " + i);
                    bgWhite = new createjs.Shape();
                    bgWhite.graphics.beginStroke("#F00").beginFill("#FFFFFF").drawRect(startx, starty, width, height);
                    CompleteGrid[k][i].shape = bgWhite;
                    CompleteGrid[k][i].x = startx;
                    CompleteGrid[k][i].y = starty;
                    startx += width;
                   // CompleteGrid[k][i].shape.draw(context);
                    //stage.addChild(CompleteGrid[k][i].shape);
                } else if (CompleteGrid[k][i].tiletype === 1) {
                    console.log("k = " + k);
                    console.log("i = " + i);
                    bgBlack = new createjs.Shape();
                    bgBlack.graphics.beginStroke("F00").beginFill("#000000").drawRect(startx, starty, width, height);
                    CompleteGrid[k][i].shape = bgBlack;
                    CompleteGrid[k][i].x = startx;
                    CompleteGrid[k][i].y = starty;
                    startx += width;
                   // CompleteGrid[k][i].shape.draw(context);
                   // stage.addChild(CompleteGrid[k][i].shape);
                } 
            }
            starty += height;
            startx = 0;
        }
    }

    function DisplayGrid() {
        for (var k = 0; k < CompleteGrid.length; k++) {
            console.log(CompleteGrid[0].length);
            for (var i = 0; i < CompleteGrid[0].length; i++) {
                 CompleteGrid[k][i].shape.draw(context);
                 stage.addChild(CompleteGrid[k][i].shape);
            }
        }
    }
    
    function init() {

        canvas = document.getElementById('mainwindow');
        context = canvas.getContext("2d");
        stage = new createjs.Stage( canvas );
        var w = stage.canvas.width;
        var h = stage.canvas.height;
        height = 75;
        width = 50;

        CompleteGrid = new Array(row);
        for (var i = 0; i < CompleteGrid.length; i++) {
            CompleteGrid[i] = new Array(col);
        }
        console.log(CompleteGrid);

        
        //bgBlack = new createjs.Shape();
        //bgBlack.graphics.beginStroke("F00").beginFill("#000000").drawRect(0, 0, 50, 75);
        //bgBlack.draw(context)
        //bgBlack.graphics.beginStroke("#F00").beginFill("#000000").drawRect(0, 0, width, height).draw(context);
        //bgBlack.x = 1;
        //stage.addChild(bgBlack);
        //context.fillText(bgBlack.x, 5, 5)

    
        //bgWhite = new createjs.Shape();
        //bgWhite.graphics.beginStroke("#F00").beginFill("#FFFFFF").drawRect(0, 100, width, height).draw(context);
        //bgWhite.x = 0;
        //context.fillText(bgWhite.x, 5, 5)
        //stage.addChild(bgWhite);
        function CheckMatching(location) {
            if (CompleteGrid[CompleteGrid.length - 1][location].tiletype === 1) {
                console.log("CORRECT");
            } else {
                console.log("WRONG");
            }
        }
        function onMouseDown(event) {
            if (event.keyCode === 65) {
                CheckMatching(0);
                console.log ("a");
            } else
                if (event.keyCode === 83) {
                    CheckMatching(1);
                    console.log("s");
                } else
                    if (event.keyCode === 68) {
                        CheckMatching(2);
                        console.log("d");
                    } else
                        if (event.keyCode === 70) {
                            CheckMatching(3);
                            console.log("f");
                        }
         
        }
        FillGrid(CompleteGrid);
        DisplayGrid();
        createjs.Ticker.addEventListener("tick", handleTick);
        canvas.setAttribute("tabindex", 0);
        canvas.addEventListener("keydown", onMouseDown);

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
  