
    
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
    var totalloaded = 0;
    var doge, grumpypcat, btnStart, LoseImg, Replay, btnTimed, btnTimedStart, ScoreBG;
    var Timed = false;
    var RelayOn = false;
    var counter = 0;
    var tickspeed = 1;
    var tick = 40;
    var canvasw;
    var canvash;



    function FillGrid(array, canvaswidth, canvasheight, dogeimg, grumpycatimg, container) {
        var startx = 0;
        var starty = (canvasheight - height);
        for (var x = 0; x < array.length; x++) {
            for (var y = 0; y < array[0].length; y++) {
                array[x][y] = new Object();
                array[x][y] = { tiletype: 0, y: 0, x: 0, img: 0, onScreen: false, clicked: false };
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
                    if (starty > 0) {
                        array[k][i].onScreen = true;
                    }
                    array[k][i].img = grumpybmp;
                    startx += width;
                    container.addChild(array[k][i].img);

                } else if (array[k][i].tiletype === 1) {
                    var dogebmp = new createjs.Bitmap("images/doge.jpg");
                    dogebmp.x = startx;
                    dogebmp.y = starty;
                    if (starty > 0) {
                        array[k][i].onScreen = true;
                    }
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
               // console.log("Last Y = " + lastknowny);
               // console.log("Last X = " + lastknownx);
                grumpybmp.x = lastknownx;
                grumpybmp.y = lastknowny;
                //This should never happen (SHOULD)
                if (lastknowny > 0) {
                    array[array.length - 1][i].onScreen = true;
                }
                array[array.length - 1][i].img = grumpybmp;
                lastknownx += width;
                container.addChild(array[array.length - 1][i].img);

            } else if (array[array.length - 1][i].tiletype === 1) {
                var dogebmp = new createjs.Bitmap("images/doge.jpg");
              //  console.log("Last Y = " + lastknowny);
              //  console.log("Last X = " + lastknownx);
                dogebmp.x = lastknownx;
                dogebmp.y = lastknowny;
                array[array.length - 1][i].img = dogebmp;
                lastknownx += width;
                container.addChild(array[array.length - 1][i].img);

            }


        }



    }

    function CheckMatching(colLocation, rowLocation) {
        if (CompleteGrid[colLocation][rowLocation].tiletype === 1) {
            console.log("CORRECT");
            return 1;
        } else {
            console.log("WRONG");
            return -1;
        }
    }

    function addTitleView() {
        stage.removeAllChildren();
        for (x = 0; x < manifest.length; x++) {
            if (manifest[x].id == 'btnStart') {
                btnStart = new createjs.Bitmap(manifest[x].src);
            } else
                if (manifest[x].id == 'btnTimed') {
                    btnTimed = new createjs.Bitmap(manifest[x].src);
                }

        }
        btnStart.name = 'btnStart';
        btnStart.addEventListener("click", function (event) { addGameView() });
        btnStart.x = 50;
        btnStart.y = 50;

        btnTimed.name = 'btnTimed';
        btnTimed.addEventListener("click", function (event) { addTimedScreen() });
        btnTimed.x = 50;
        btnTimed.y = 120;
        TitleView.addChild(btnStart);
        TitleView.addChild(btnTimed);
        stage.addChild(TitleView);
        stage.update(); 

    }


    function handleFileLoad(event) {
        switch (event.type) {
            case PreloadJS.IMAGE:
                var image = new Image();
                image.src = event.src;
                image.id = event.id;
                image.onload = handleLoadComplete();
                switch (image.id) {
                    case 'doge':
                        doge = new createjs.Bitmap(image);
                        break;
                    case 'grumpycat':
                        grumpycat = new createjs.Bitmap(image);
                        break;
                    case 'btnStart':
                        btnStart = new createjs.Bitmap(image);
                        break;
                    case 'LoseImg':
                        LoseImg = new createjs.Bitmap(image);
                        break;
                    case 'Replay':
                        Replay = new createjs.Bitmap(image);
                        break;
                    case 'btnTimed':
                        btnTimed = new createjs.Bitmap(image);
                        break;
                    case 'ScoreBG':
                        ScoreBG = new createjs.Bitmap(image);
                        break;
                    
                }
                ImageArray.push(image);
                console.log(ImageArray);
                break;
            case PreloadJS.SOUND:
                break;

                
        }

    }

    function handleLoadComplete(event) {
        totalloaded++;
        if (manifest.length == totalloaded) {
            addTitleView();
        }

    }

    function addGameView() {
        canvas.removeEventListener("click", Replay);
        stage.removeChild(Replay);
        canvas.addEventListener("keydown", onUnTimedKeyDown);
        stage.removeChild(TitleView);
        height = 75;
        width = 50;
        switch (event.type) {
            case PreloadJS.IMAGE:
                var doge = new createjs.Bitmap(preloader.getResult("doge"));
                var grumpycat = new createjs.Bitmap(preloader.getResult("grumpycat"));
        }
        FillGrid(CompleteGrid, canvasw, canvash, doge, grumpycat, container);

        scoretext = new createjs.Text(('Score = ' + score), 'bold 20px Arial', 'black');
        stage.addChildAt(ScoreBG, stage.children.length);
        stage.addChildAt(scoretext, stage.children.length);


    }


    function addTimedScreen() {
        addGameView();
        Timed = true;
        canvas.removeEventListener("keydown", onUnTimedKeyDown);
        canvas.addEventListener("keydown", onTimedKeyDown);

        //for (x = 0; x < manifest.length; x++) {
        //    if (manifest[x].id == 'btnStart') {
        //        btnTimedStart = new createjs.Bitmap(manifest[x].src);
        //    }
        //}

        //btnTimedStart.addEventListener("click", function (event) { StartTimed() });
        //btnTimedStart.x = 50;
        //btnTimedStart.y = 50;
        //stage.addChild(btnTimedStart);
    }

    function StartTimed() {
        setTimeout(function () {
            RelayOn = true;
            //add onTimedKeyDown
            canvas.addEventListener("keydown", onTimedKeyDown);
        }, 3000);
        stage.removeChild(btnTimedStart);
        //add visual countdown
        //add buffer tiles of first level (maybe add an if in the initial fillgrid()
        // add another function that looks at the y of the bottom most tile and see if they missed
        //make sure they cant continue to use keystrokes while the tiles are off the screen
        CheckIfMissed();

    }

    function CheckIfMissed() {
        var loc;
        if (CompleteGrid[0][0].img.y > (canvash - height)) {
            for (x = 0; x < CompleteGrid[0].length; x++) {
                if (CompleteGrid[0][x].tiletype == 1) {
                    loc = x;
                }
            }
            if (CompleteGrid[0][loc].clicked == false) { addLoseScreen(); };
        }

    }



    function addLoseScreen() {
        Timed = false;
        RelayOn = false;
        tickspeed = 1;
        stage.removeAllChildren();
        canvas.removeEventListener("keydown", onUnTimedKeyDown);
        canvas.removeEventListener("keydown", onTimedKeyDown);
        stage.addChild(LoseImg);
        Replay.x = 75;
        Replay.y = 100;
        Replay.name = 'Replay';
        stage.addChild(Replay);
        Replay.addEventListener("click", function (event) { addTitleView() });
        score = 0;
        counter = 0;
        scoretext.text = ""
        stage.update();

    }

    function handleComplete(event) {


        //var w = stage.canvas.width;
        //var h = stage.canvas.height;
        //height = 75;
        //width = 50;
        //switch (event.type) {
        //    case PreloadJS.IMAGE:
        //        var doge = new createjs.Bitmap(preloader.getResult("doge"));
        //        var grumpycat = new createjs.Bitmap(preloader.getResult("grumpycat"));
        //}
        //FillGrid(CompleteGrid, w, h, doge, grumpycat, container);

        //scoretext = new createjs.Text(('Score = ' + score), 'bold 20px Arial', 'black');
        //scorestage.addChild(scoretext);
        //scorestage.update();


    }



    function UpdateGrid() {
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

    function KeyValidator(colLoc) {
        var keycode = event.keyCode;
        if (event.keyCode === 65) {
            valid = CheckMatching(colLoc, 0);
            return [valid, 0];
        } else
            if (event.keyCode === 83) {
                valid = CheckMatching(colLoc, 1);
                return [valid, 1];
            } else
                if (event.keyCode === 68) {
                    valid = CheckMatching(colLoc, 2);
                    return [valid, 2];
                } else
                    if (event.keyCode === 70) {
                        valid = CheckMatching(colLoc, 3);
                        return [valid, 3];
                    }
    }

    function onUnTimedKeyDown(event) {
        var valid = KeyValidator(0);
        if (valid[0] == 1) {
            UpdateGrid();
            AddScore();
        } else if (valid[0] == -1) {
            addLoseScreen();
        }
       

    }
    function onTimedKeyDown(event) {
        if (CompleteGrid[counter][0].onScreen == true) {
            var valid = KeyValidator(counter);
            if (valid[0] == 1 && RelayOn == false) {
                RelayOn = true;
            }
            if (valid[0] == 1) {
                CompleteGrid[counter][valid[1]].clicked = true;
                counter++;
                AddScore();
                console.log("looking at " + counter);
            } else if (valid[0] == -1) {
                addLoseScreen();
            }
        }
        // the validator to look at the NEXT row without deleting
        // Only look at the ones on the screen

    }

    function TweenTest() {
        doge = new createjs.Bitmap("images/doge.jpg");
        stage.addChild(doge);
        stage.update();
        createjs.Tween.get(doge, { loop: true })
                .wait(1000)
                .to({ y: 200 }, 1000, createjs.Ease.quadInOut)
                .to({ y: 0 }, 500, createjs.Ease.quadInOut);
    }
    
    function init() {

        canvas = document.getElementById('mainwindow');
        context = canvas.getContext("2d");
        stage = new createjs.Stage(canvas);
        stage.mouseEventsEnabled = true;
        container = new createjs.Container();
        TitleView = new createjs.Container();
        canvasw = stage.canvas.width;
        canvash = stage.canvas.height;

        manifest = [
            { src: "images/doge.jpg", id: "doge" },
            { src: "images/grumpycat.jpg", id: "grumpycat" },
            { src: "images/btnStart.jpg", id: "btnStart" },
            { src: "images/LoseImg.jpg", id: "LoseImg" },
            { src: "images/Replay.jpg", id: "Replay" },
            { src: "images/btnTimed.jpg", id: "btnTimed" },
            { src: "images/ScoreBG.jpg", id: "ScoreBG" }

        ]

       // queue = new createjs.LoadQueue(false);
        // queue.addEventListener("complete", handleComplete);
        preloader = new PreloadJS();
        preloader.onComplete = handleComplete;
        preloader.onFileLoad = handleFileLoad;
        preloader.loadManifest(manifest);



       // queue.loadManifest(manifest);

        // queue.load();

        //TweenTest();


        CompleteGrid = new Array(row);
        for (var i = 0; i < CompleteGrid.length; i++) {
            CompleteGrid[i] = new Array(col);
        }

 
        createjs.Ticker.addEventListener("tick", handleTick);
        createjs.Ticker.setFPS(60);

    }
    

    function handleTick(event) {
      

        if (RelayOn == true) {
            tickspeed += .001;
            for (x = 0; x < CompleteGrid.length; x++) {
                for (y = 0; y < CompleteGrid[0].length; y++) {
                    CompleteGrid[x][y].img.y += tickspeed;
                }
            }
            var h = stage.canvas.height;
            if (CompleteGrid[0][0].img.y > h) {
                for (z = 0; z < CompleteGrid[0].length; z++) {
                    container.removeChild(CompleteGrid[0][z].img);
                    stage.removeChild(CompleteGrid[0][z].img);
                }
                CompleteGrid.splice(0, 1);
                counter--;
                AddtoGrid(CompleteGrid, h);

                console.log(CompleteGrid.length);
            }
            for (y = 0; y < CompleteGrid.length; y++) {
                for (k = 0; k < CompleteGrid[y].length; k++) {
                    if (CompleteGrid[y][k].img.y > ScoreBG.image.height) {
                        CompleteGrid[y][k].onScreen = true;
                        console.log("on screen");
                    }
                }
            }
            CheckIfMissed();

        }
      
        stage.update();
    }

    init();
})();
  