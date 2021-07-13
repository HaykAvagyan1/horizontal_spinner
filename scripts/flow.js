const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let data;
let currentIcon = 0;
let scrolling = false;
let done = false;

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

    view.addCurrent(getIcon(currentIcon));
    for (let i = 1; i < 8; i++) {
        view.addOthers(1, i, getIcon(currentIcon + i));
        view.addOthers(-1, i, getIcon(currentIcon - i));
    }
    
    $(".scrollbar").on('wheel', async function (e) { await wheel(e) });
}

const wheel = async (e) => {
    if (!scrolling) {
        let dir = -Math.sign(e.originalEvent.wheelDelta);
        currentIcon += dir;

        await view.scroll(dir);
    }
}

const scrollHere = async(i) => {
    let amount = -(i - $(".current").index());
    currentIcon += amount;

    await view.scroll(amount);
}

const getIcon = (newIndex) => {
    newIndex %= data.length;
    
    if (newIndex < 0) {
        newIndex = data.length + newIndex;
    }
    else if (newIndex > data.length) {
        newIndex = 0;
    }

    return data[newIndex].url;
}

$(onPageLoad);