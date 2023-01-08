$(document).ready(function () {
    //new line
    // new line
    var logs = 0;
    var logTotal = 0;
    var woodCuttingLevel = 1;
    var woodToLevelUp = 1000;
    var money = 1000000;
    var logPlus = 1;
    var autoLogPlus = 0;
    var autoChopperPrice = 100;
    var logPrice = 1;
    var logsPerSec = 0;
    var logsPerClick = 0;
    var menu;
    var isVisable = false;
    var multiplier = 10;
    setInterval(function () {
        logs += autoLogPlus;
        logTotal += autoLogPlus;
        changeInventory();
        changeMarket();
        move();
    }, 100);


    $("#chop").click(function () {
        logs += logPlus;
        logTotal += logPlus;
        changeInventory();
        changeMarket();
    });

    $("#autoChopper").click(function () {
        money -= autoChopperPrice;
        autoLogPlus += 0.1;
        logsPerSec++
        changeInventory();
        changeMarket();
    });

    $("#sell1").click(function () {
        logs--;
        money += logPrice;
        changeInventory();
        changeMarket();
    });

    $("#sell10").click(function () {
        logs -= 10;
        money += logPrice * 10;
        changeInventory();
        changeMarket();
    });

    $("#sellAll").click(function () {
        money += logPrice * logs;
        logs = 0;
        changeInventory();
        changeMarket();
    });

    $("#homeBar").click(function () {
        menu = switchMenu("main")
    });
    $("#visit").click(function () {
        menu = switchMenu("marketplace");
        changeMarket();
    });

    $("#return").click(function () {

    });

    function move() {
        var elem = document.getElementById("lumberProgressBar");
        width = logTotal;
        elem.style.width = width / multiplier + "%";
        if (logTotal >= woodToLevelUp){
            woodCuttingLevel++;
            woodToLevelUp *= 2;
            multiplier *= 2;
        }
    }
    function changeInventory() {

        $("#money").html("Money: $" + parseInt(money));
        $("#logsPerSec").html("LPS: " + parseInt(logsPerSec));
        $("#logsPerClick").html("LPC: " + parseInt(logsPerClick));
        $("#totalLogs").html("Total Logs: " + parseInt(logTotal));
        $("#woodcuttingLevel").html("Woodcutting Lvl: " + parseInt(woodCuttingLevel));

        if (logs == 1) {
            $("#logs").html("You own " + parseInt(logs) + " log.")
            $("#logsInShop").html("You own " + parseInt(logs) + " log.")
        } else {
            $("#logs").html("You own " + parseInt(logs) + " logs.")
            $("#logsInShop").html("You own " + parseInt(logs) + " logs.")
        }
    }

    function changeMarket() {
        if (logs > 0) {
            document.getElementById("sellAll").disabled = false;
        } else {
            document.getElementById("sellAll").disabled = true;
        }
        if (logs >= 1) {
            document.getElementById("sell1").disabled = false;
        } else {
            document.getElementById("sell1").disabled = true;
        }
        if (logs >= 10) {
            document.getElementById("sell10").disabled = false;
        } else {
            document.getElementById("sell10").disabled = true;
        }

        if (money >= autoChopperPrice || (isVisable === true)) {
            $("#autoChopper").css("display", "block");
            isVisable = true;
        } else {
            $("#autoChopper").css("display", "none");
        }
        if (money < autoChopperPrice) {
            document.getElementById("autoChopper").disabled = true;
            document.getElementById('autoChopper').style.backgroundColor = 'Red';
        } else {
            document.getElementById("autoChopper").disabled = false;
            document.getElementById('autoChopper').style.backgroundColor = 'Green';
        }
    }

    function switchMenu(menu) {
        $(".menus").children().css("display", "none");
        $("." + menu).css("display", "block");
        return menu;
    }
});