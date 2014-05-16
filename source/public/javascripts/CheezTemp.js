
    
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
    var queue;
    var container;
    var score = 0;
    var manifest;
    var preloader;
    var ImageArray = [];


    function FillGrid(array, canvaswidth, canvasheight, dogeimg, grumpycatimg, container) {
        var startx = 0;
        var starty = (canvasheight - height);
        for (var x = 0; x < array.length; x++) {
            for (var y = 0; y < array[0].length; y++) {
                array[x][y] = new Object();
                array[x][y] = { tiletype: 0, y: 0, x: 0, img: 0 };
            }
            random_tile = (Math.floor(Math.random() * array[0].length))
            array[x][random_tile].tiletype = 1;

        }
   
       
        for (var k = 0; k < array.length; k++) {

            for (var i = 0; i < array[0].length; i++) {
                if (array[k][i].tiletype === 0) {
                    var grumpybmp = new createjs.Bitmap("images/grumpycat.jpg");
                    grumpybmp.x = startx;
                    grumpybmp.y = starty;
                    array[k][i].img = grumpybmp;
                    startx += width;
                    container.addChild(array[k][i].img);

                } else if (array[k][i].tiletype === 1) {
                    var dogebmp = new createjs.Bitmap("images/doge.jpg");
                    dogebmp.x = startx;
                    dogebmp.y = starty;
                    array[k][i].img = dogebmp;
                    startx += width;
                    container.addChild(array[k][i].img);

                } 
            }
            starty -= height;
            startx = 0;
        }

        stage.addChild(container);
        
    }

    function AddScore() {
        score += 1;
        scoretext.text = "Score = " + score;
        scorestage.update();
    }

    function AddtoGrid(array, canvasheight) {
        var temparray = new Array();
        var lastknownx = 0;
        var lastknowny;


        for (var y = 0; y < array[0].length; y++) {
            temparray[y] = new Object();
            temparray[y] = { tiletype: 0, y: 0, x: 0, img: 0 };
        }
        random_tile = (Math.floor(Math.random() * array[0].length))
        temparray[random_tile].tiletype = 1;

        array.push(temparray);
        lastknowny = (container.children[container.children.length - 1].y - height);
        for (var i = 0; i < array[0].length; i++) {
            if (array[array.length -1][i].tiletype === 0) {
                var grumpybmp = new createjs.Bitmap("images/grumpycat.jpg");
                //lastknownx = container.children[container.children.length - 1].x;
               // lastknowny = (container.children[container.children.length - 1].y - height);
                console.log("Last Y = " + lastknowny);
                console.log("Last X = " + lastknownx);
                grumpybmp.x = lastknownx;
                grumpybmp.y = lastknowny;
                array[array.length - 1][i].img = grumpybmp;
                lastknownx += width;
                container.addChild(array[array.length - 1][i].img);

            } else if (array[array.length - 1][i].tiletype === 1) {
                var dogebmp = new createjs.Bitmap("images/doge.jpg");
                //lastknownx = container.children[container.children.length - 1].x;
               // lastknowny = (container.children[container.children.length - 1].y - height);
                console.log("Last Y = " + lastknowny);
                console.log("Last X = " + lastknownx);
                dogebmp.x = lastknownx;
                dogebmp.y = lastknowny;
                array[array.length - 1][i].img = dogebmp;
                lastknownx += width;
                container.addChild(array[array.length - 1][i].img);

            }
            //lastknowny -= height;

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

    function addTitleView() {
        var menu = new createjs.Bitmap("images/test.jpg");
        TitleView.addChild(menu);
        stage.update(); 

    }


    function handleFileLoad(event) {
        switch (event.type) {
            case PreloadJS.IMAGE:
                var image = new Image();
                image.src = event.src;
                image.id = event.id;
                ImageArray.push(image);
                console.log(ImageArray);
                break;
            case PreloadJS.SOUND:
                break;

                
        }

        }

    function handleComplete(event) {


        var w = stage.canvas.width;
        var h = stage.canvas.height;
        height = 75;
        width = 50;
        switch (event.type) {
            case PreloadJS.IMAGE:
                var doge = new createjs.Bitmap(preloader.getResult("doge"));
                var grumpycat = new createjs.Bitmap(preloader.getResult("grumpycat"));
        }
        FillGrid(CompleteGrid, w, h, doge, grumpycat, container);

        scoretext = new createjs.Text(('Score = ' + score), 'bold 20px Arial', 'black');
        scorestage.addChild(scoretext);
        scorestage.update();


    }



    function UpdateGrid(code) {
        var h = stage.canvas.height;
        for (x = 0; x < CompleteGrid[0].length; x++) {
            container.removeChild(CompleteGrid[0][x].img);
            stage.removeChild(CompleteGrid[0][x].img);
        }

        CompleteGrid.splice(0, 1);

        for (k = 0; k < CompleteGrid.length; k++) {
            for (i = 0; i < CompleteGrid[0].length; i++) {
                CompleteGrid[k][i].img.y += height;
            }
        }

        AddtoGrid(CompleteGrid, h);
        stage.update();

    }

    function onMouseDown(event) {
        var keycode = event.keyCode;
        if (event.keyCode === 65) {
            valid = CheckMatching(0);
            if (valid == 1) {
                UpdateGrid(keycode);
                AddScore();
            } else {
                console.log("YOU LOSE");
            }
        } else
            if (event.keyCode === 83) {
                valid = CheckMatching(1);
                if (valid == 1) {
                    UpdateGrid(keycode);
                    AddScore();
                } else
                    console.log("YOU LOSE");
            } else
                if (event.keyCode === 68) {
                    valid = CheckMatching(2);
                    if (valid == 1) {
                        UpdateGrid(keycode);
                        AddScore();
                    } else
                        console.log("YOU LOSE");
                } else
                    if (event.keyCode === 70) {
                        valid = CheckMatching(3);
                        if (valid == 1) {
                            UpdateGrid(keycode);
                            AddScore();
                        } else
                            console.log("YOU LOSE");
                    }

    }
    
    function init() {

        canvas = document.getElementById('mainwindow');
        context = canvas.getContext("2d");
        stage = new createjs.Stage(canvas);
        stage.mouseEventsEnabled = true;
        container = new createjs.Container();
        TitleView = new createjs.Container();

        scorecanvas = document.getElementById('score');
        scorecontext = scorecanvas.getContext("2d");
        scorestage = new createjs.Stage(scorecanvas);

        manifest = [
            { src: "images/doge.jpg", id: "doge" },
            { src: "images/grumpycat.jpg", id: "grumpycat" },
            { src: "images/btnStart.jpg", id: "btnStart" },

        ]

       // queue = new createjs.LoadQueue(false);
        // queue.addEventListener("complete", handleComplete);
        preloader = new PreloadJS();
        preloader.onComplete = handleComplete;
        preloader.onFileLoad = handleFileLoad;
        preloader.loadManifest(manifest);



       // queue.loadManifest(manifest);

       // queue.load();

        CompleteGrid = new Array(row);
        for (var i = 0; i < CompleteGrid.length; i++) {
            CompleteGrid[i] = new Array(col);
        }

        createjs.Ticker.addEventListener("tick", handleTick);
        canvas.setAttribute("tabindex", 0);
        canvas.addEventListener("keydown", onMouseDown);

    }
    

    function handleTick(event) {

      
        stage.update();
    }

    init();
})();
  