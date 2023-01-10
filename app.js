$(document).ready(function () {
    //new line
    // new line
    var logs = 0;
    var stone = 0;
    var logTotal = 0;
    var moneyTotal = 0;
    var autoMoneyPlus = 0;
    var clickTotal = 0;
    var stoneTotal = 0;
    var woodCuttingLevel = 1;
    var stoneCuttingLevel = 1;
    var woodToLevelUp = 1000;
    var stoneToLevelUp = 1000;
    var money = 100000;
    var logPlus = 1;
    var stonePlus = 1;
    var autoLogPlus = 0;
    var autoStonePlus = 0;
    var autoChopperPrice = 100;
    var autoMinerPrice = 100;
    var autoWoodSellerPrice = 100;
    var autoWoodSellerCount = 0;
    var logPrice = 1;
    var stonePrice = 1;
    var logsPerSec = 0;
    var stonePerSec = 0;
    var moneyPerSec = 0;
    var logsPerClick = 0;
    var stonePerClick = 0;
    var menu;
    var isWoodVisable = false;
    var isStoneVisable = false;
    var woodMultiplier = 10;
    var stoneMultiplier = 10;

    setInterval(function () {
        money += autoMoneyPlus;
        logs += autoLogPlus;
        logTotal += autoLogPlus;
        stone += autoStonePlus;
        stoneTotal += autoStonePlus
        changeInventory();
        changeMarket();
        moveWood();
        moveStone();
        woodSeller();
    }, 100);

    $("#chop").click(function () {
        clickTotal++
        logs += logPlus;
        logTotal += logPlus;
        changeInventory();
        changeMarket();
    });

    $("#mine").click(function () {
        clickTotal++
        stone += stonePlus;
        stoneTotal += stonePlus;
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

    $("#autoMiner").click(function () {
        money -= autoMinerPrice;
        autoStonePlus += 0.1;
        stonePerSec++
        changeInventory();
        changeMarket();
    });

    $("#autoWoodSeller").click(function () {
        money -= autoWoodSellerPrice;
        autoMoneyPlus += 0.1;
        autoLogPlus -= 0.1;
        logsPerSec --;
        moneyPerSec++
        autoWoodSellerCount++
        changeInventory();
        changeMarket();
    });

    $("#sell1L").click(function () {
        logs--;
        money += logPrice;
        moneyTotal += logPrice;
        changeInventory();
        changeMarket();
    });

    $("#sell10L").click(function () {
        logs -= 10;
        money += logPrice * 10;
        moneyTotal += logPrice * 10;
        changeInventory();
        changeMarket();
    });

    $("#sellAllL").click(function () {
        money += logPrice * logs;
        moneyTotal += logPrice * logs;
        logs = 0;
        changeInventory();
        changeMarket();
    });

    $("#sell1S").click(function () {
        stone--;
        money += stonePrice;
        moneyTotal += stonePrice;
        changeInventory();
        changeMarket();
    });

    $("#sell10S").click(function () {
        stone -= 10;
        money += stonePrice * 10;
        moneyTotal += stonePrice * 10;
        changeInventory();
        changeMarket();
    });

    $("#sellAllS").click(function () {
        money += stonePrice * stone;
        moneyTotal += stonePrice * stone;
        stone = 0;
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
    $("#statBar").click(function () {
        menu = switchMenu("stats");
        changeMarket();
    });

    function moveWood() {
        var elem = document.getElementById("lumberProgressBar");
        width = logTotal;
        elem.style.width = width / woodMultiplier + "%";
        if (logTotal >= woodToLevelUp) {
            woodCuttingLevel++;
            woodToLevelUp *= 2;
            woodMultiplier *= 2;
        }
    }

    function moveStone() {
        var elem = document.getElementById("stoneProgressBar");
        width = stoneTotal;
        elem.style.width = width / stoneMultiplier + "%";
        if (stoneTotal >= stoneToLevelUp) {
            stoneCuttingLevel++;
            stoneToLevelUp *= 2;
            stoneMultiplier *= 2;
        }
    }

    function woodSeller(){
        if (logs <= 0){
            autoMoneyPlus
        }
    }

    function changeInventory() {

        $("#money").html("Money: $" + parseInt(money));
        $("#moneyPersec").html("MPS: $" + parseInt(moneyPerSec));
        
        $("#logsPerSec").html("LPS: " + parseInt(logsPerSec));
        $("#logsPerClick").html("LPC: " + parseInt(logsPerClick));
        $("#stonePerSec").html("SPS: " + parseInt(stonePerSec));
        $("#stonePerClick").html("LPC: " + parseInt(stonePerClick));
        $("#totalClicks").html("Total Clicks: " + parseInt(clickTotal));
        $("#totalLogs").html("Total Logs: " + parseInt(logTotal));
        $("#totalStone").html("Total Stone: " + parseInt(stoneTotal));
        $("#totalMoney").html("Total Money: " + parseInt(moneyTotal));
        $("#woodcuttingLevel").html("Woodcutting Lvl: " + parseInt(woodCuttingLevel));
        $("#stonecuttingLevel").html("Stonecutting Lvl: " + parseInt(stoneCuttingLevel));
        $("#stone").html("You own " + parseInt(stone) + " stone.")
        $("#stoneInShop").html("You own " + parseInt(stone) + " stone.")


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
            document.getElementById("sellAllL").disabled = false;
        } else {
            document.getElementById("sellAllL").disabled = true;
        }
        if (logs >= 1) {
            document.getElementById("sell1L").disabled = false;
        } else {
            document.getElementById("sell1L").disabled = true;
        }
        if (logs >= 10) {
            document.getElementById("sell10L").disabled = false;
        } else {
            document.getElementById("sell10L").disabled = true;
        }

        if (money >= autoChopperPrice || (isWoodVisable === true)) {
            $("#autoChopper").css("display", "block");
            isWoodVisable = true;
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

        if (stone > 0) {
            document.getElementById("sellAllS").disabled = false;
        } else {
            document.getElementById("sellAllS").disabled = true;
        }
        if (stone >= 1) {
            document.getElementById("sell1S").disabled = false;
        } else {
            document.getElementById("sell1S").disabled = true;
        }
        if (stone >= 10) {
            document.getElementById("sell10S").disabled = false;
        } else {
            document.getElementById("sell10S").disabled = true;
        }

        if (money >= autoMinerPrice || (isStoneVisable === true)) {
            $("#autoMiner").css("display", "block");
            isStoneVisable = true;
        } else {
            $("#autoMiner").css("display", "none");
        }
        if (money < autoMinerPrice) {
            document.getElementById("autoMiner").disabled = true;
            document.getElementById('autoMiner').style.backgroundColor = 'Red';
        } else {
            document.getElementById("autoMiner").disabled = false;
            document.getElementById('autoMiner').style.backgroundColor = 'Green';
        }

        if (money >= autoMinerPrice || (isStoneVisable === true)) {
            $("#autoMiner").css("display", "block");
            isStoneVisable = true;
        } else {
            $("#autoMiner").css("display", "none");
        }
        if (money >= autoWoodSellerPrice && logsPerSec <= 0) {
            document.getElementById("autoWoodSeller").disabled = true;
            document.getElementById('autoWoodSeller').style.backgroundColor = 'Red';
        } else {
            document.getElementById("autoWoodSeller").disabled = false;
            document.getElementById('autoWoodSeller').style.backgroundColor = 'Green';
        }
    }
    
    function switchMenu(menu) {
        $(".menus").children().css("display", "none");
        $("." + menu).css("display", "block");
        return menu;

    }

});