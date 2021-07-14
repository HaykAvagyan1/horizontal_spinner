const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let data;
let currentIcon = 0;
let scrolling   = false;
let dontScroll  = false;
let positions   = [];

let activeButton = -1;
let activeIcon   = -1;

let flashDone = false;

jQuery.event.special.wheel = {
    setup: function( _, ns, handle ) {
        this.addEventListener("wheel", handle, { passive: !ns.includes("noPreventDefault") });
    }
};

const onPlay = async () => {
    await view.onPlay();
    $("#play").attr("onclick", "check()");
}

const onPageLoad = async () => {
    data = await parser.dataFetch();
    data = data.objects;

    currentIcon = Math.floor(Math.random() * data.length - 1);

    view.addCurrent(getIcon(currentIcon).url);
    for (let i = 1; i <= 1; i++) {
        view.addOthers( 1, i, getIcon(currentIcon + i).url);
        view.addOthers(-1, i, getIcon(currentIcon - i).url);
    }

    $(".block").each(function (i) {
        positions[i] = $(this).position().left;
    });

    if (data.length < 5) {
        dontScroll = true;
        return;
    }
    $(".scrollbar").on('wheel', async function (e) { await wheel(e) });
}

const changeInfo = (i) => {
    if (flashDone) {
        $("#warning").css("opacity", 0);
    }

    activeButton = view.toggleButton(i);

    if (activeIcon == -1 || activeIcon == undefined) return;

    if (activeButton == -1) {
        view.updateDescription(getIcon(activeIcon).description);
    } else {
        view.updateDescription(getIcon(activeIcon).info[i]);
    }
}

const flashWarning = async (length) => {
    for (let i = 0; i < length; i++) {
        await view.flashWarning();
    }

    $("#warning").css("opacity", 1);
}

const wheel = async (e) => {
    if (!scrolling) {
        let dir = -Math.sign(e.originalEvent.wheelDelta);
        currentIcon += dir;

        await view.scroll(dir);
    }
}

const scrollHere = async(i) => {
    if (!dontScroll) {
        let amount = -(i - $(".current").index());
        currentIcon += amount;

        await view.scroll(amount);
    } else {
        
    }

    if (!flashDone) {
        flashWarning(1);
        flashDone = true;
    }

    activeIcon = view.toggleIcon(i);
    if (activeIcon == -1 || activeIcon == undefined) return;

    view.updateTitle      (getIcon(activeIcon).title);
    view.updateDescription(getIcon(activeIcon).description);
}

const getIcon = (newIndex) => {
    newIndex %= data.length;
    
    if (newIndex < 0) {
        newIndex = data.length + newIndex;
    }
    else if (newIndex > data.length) {
        newIndex = 0;
    }

    return data[newIndex];
}

$(onPageLoad);