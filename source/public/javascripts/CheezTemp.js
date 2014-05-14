
    
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
    var valid = 0;


    function FillGrid(array, canvaswidth, canvasheight) {
        var startx = 0;
        var starty = (canvasheight - height);
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

        for (var k = 0; k < 5; k++) {
            console.log(CompleteGrid[0].length);
            for (var i = 0; i < CompleteGrid[0].length; i++) {
                if (CompleteGrid[k][i].tiletype === 0) {
                    console.log("k = " + k);
                    console.log("i = " + i);
                    bgWhite[k][i] = new createjs.Shape();
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
            starty -= height;
            startx = 0;
        }
    }

    function DisplayGrid() {
        for (var k = 0; k < 5; k++) {
            for (var i = 0; i < CompleteGrid[0].length; i++) {
                 CompleteGrid[k][i].shape.draw(context);
                 stage.addChild(CompleteGrid[k][i].shape);
            }
        }
    }


    function CheckMatching(location) {
        if (CompleteGrid[0][location].tiletype === 1) {
            console.log("CORRECT");
            return 1;
        } else {
            console.log("WRONG");
            return -1;
        }
    }

    function UpdateGrid() {
        for (x = 0; x < 5; x++) {
            for (y = 0; y < CompleteGrid[0].length; y++) {
                CompleteGrid[x][y].y += height;
            }
        }
        stage.removeAllChildren();
        stage.update();
        DisplayGrid();
        stage.update();
    }
    
    function init() {

        canvas = document.getElementById('mainwindow');
        context = canvas.getContext("2d");
        stage = new createjs.Stage(canvas);
        stage.mouseEventsEnabled = true;


        var queue = new createjs.LoadQueue(false);
        queue.on("fileload", handleFileLoad, this);
        queue.on("complete", handleComplete, this);
        queue.loadFile({ id: "doge", src: "https://pbs.twimg.com/profile_images/378800000822867536/3f5a00acf72df93528b6bb7cd0a4fd0c.jpeg"});
        queue.loadFile({ id: "grumpycat", src: "http://static3.businessinsider.com/image/5238c9c5ecad047f12b2751a/internet-famous-grumpy-cat-just-landed-an-endorsement-deal-with-friskies.jpg"});
        queue.load();

        function handleFileLoad(event) {
            var item = event.item;
           // stage.addChild(item);
        }
        function handleComplete(event) {
            var item = event.item;

        }



        var container = new createjs.Container();

        var w = stage.canvas.width;
        var h = stage.canvas.height;
        height = 75;
        width = 50;
        //var doge = new createjs.Bitmap("https://pbs.twimg.com/profile_images/378800000822867536/3f5a00acf72df93528b6bb7cd0a4fd0c.jpeg");
        //var grumpycat = new createjs.Bitmap("http://static3.businessinsider.com/image/5238c9c5ecad047f12b2751a/internet-famous-grumpy-cat-just-landed-an-endorsement-deal-with-friskies.jpg");
        //var grumpycat = new Image();
        //doge.src = "https://pbs.twimg.com/profile_images/378800000822867536/3f5a00acf72df93528b6bb7cd0a4fd0c.jpeg";
        //grumpycat.src = "http://static3.businessinsider.com/image/5238c9c5ecad047f12b2751a/internet-famous-grumpy-cat-just-landed-an-endorsement-deal-with-friskies.jpg";
        //console.log(doge);
        //grumpycat.scaleX = .25;
       // grumpycat.scaleY = .25;
        //doge.x = 0;
        //doge.y = 0;
        //grumpycat.regX = height;
        //grumpycat.regY = width;
        //grumpycat.x = 50;
        //grumpycat.y = 75;

        //container.addChild(grumpycat)
       // stage.addChild(container);


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

        function onMouseDown(event) {
            if (event.keyCode === 65) {
                valid = CheckMatching(0);
                if (valid === 1) {
                    //update the graph
                    for (x = 0; x < CompleteGrid[0].length; x++) {
                        stage.removeChild(CompleteGrid[0][x].shape);
                    }
                    
                    CompleteGrid.splice(0, 1);
                    stage.update();
                    UpdateGrid(); 
                    //stage.removeAllChildren();
                    //DisplayGrid();
                    console.log("df");
                } else {
                    //start over
                }
                console.log ("a");
            } else
                if (event.keyCode === 83) {
                    valid = CheckMatching(1);
                    console.log("s");
                } else
                    if (event.keyCode === 68) {
                        valid = CheckMatching(2);
                        console.log("d");
                    } else
                        if (event.keyCode === 70) {
                            valid = CheckMatching(3);
                            console.log("f");
                        }
         
        }
       // FillGrid(CompleteGrid, w, h);
       //DisplayGrid();
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
  