const view = {
    correct: 0,
    row: `<div class="row"></div>`,
    offset: 67,
    currentPosition: 375,
    rightOffset: 10,

    addCurrent: (img) => {
        $(".scrollbar").append(`<div onclick="scrollHere(7)" class="block current" id="7"><div class="innerCircle"><img src="${img}"></div></div>`);
        $("#7").css("left", `${view.currentPosition}px`);
    },
    addOthers: (dir, i, img) => {
        let id = 7 + (dir * i);

        if (dir > 0) {
            view.addIcon(id, img, dir);
            let newPosition = view.currentPosition + (i * view.offset);
            view.setPosition(id, newPosition);
        } else {
            view.addIcon(id, img, dir);
            let newPosition = view.currentPosition - (i * view.offset);
            view.setPosition(id, newPosition);
        }
    },
    scroll: async (amount) => {
        if (amount == 0) return;
        scrolling = true;

        let current = $(".current").index();

        $(".current").removeClass("current");
        $(`#${current - amount}`).addClass("current");

        $(".scrollbar div").each(function(i) {
            $(this).css("left", amount > 0 ? `+=${amount * view.offset}` : `-=${Math.abs(amount) * view.offset}`);
        });

        current = $(".current").index();

        let length = $(".block").length;

        for (let i = 1; i <= Math.abs(amount); i++) {
            let remove = amount > 0 ? length - i : Math.abs(amount) - i;
            $(`#${remove}`).remove();

            let iZero = i - 1;

            if (remove < current) {
                view.addIcon(current + 7, getIcon((currentIcon - iZero) + 7), -amount);
                let newPosition = view.currentPosition + ((7 + iZero) * view.offset);
                view.setPosition(current + 7, newPosition);
            } else {
                view.addIcon(current - 7, getIcon((currentIcon - iZero) - 7), -amount);
                let newPosition = view.currentPosition - ((7 - iZero) * view.offset);
                view.setPosition(current - 7, newPosition);
            }
        }

        view.resetIds();

        await timeout(200);
        scrolling = false;
    },
    addIcon: (id, img, dir) => {
        if (dir > 0) {
            $(".scrollbar").append (`<div onclick="scrollHere(${id})" class="block" id="${id}"><div class="innerCircle"><img src="${img}"></div></div>`);
        } else {
            $(".scrollbar").prepend(`<div onclick="scrollHere(${id})" class="block" id="${id}" ><div class="innerCircle"><img src="${img}"></div></div>`);
        }
    },
    setPosition: (id, newPosition) => {
        $(`#${id}`).css("left", `${newPosition}px`);
    },
    resetIds: () => {
        $(function() {
            $(".block").each(function(index) {
                $(this).prop("id", index.toString());
                $(this).attr("onclick", `scrollHere(${index})`);
            });
        })
    },
    onPlay: async () => {
        $("#status span").last().text(data.length);
        $("#status").addClass("show");
        $(".question").css("opacity", 0);

        $("#play svg").css("opacity", 0);
        $("#play").addClass("goUnder");
        await timeout (500);
        $("#play svg").remove();
        $(".icon").load(window.location.href + "graphics/checkmark.svg");
        $(".icon").addClass("checkmark");

        await timeout (1000);
        $(".question").hide("opacity", 0);

        let classes = [".scrollbar", ".scrollbarOverlay"];
        for (let i = 0; i < classes.length; i++) {
            $(classes[i]).removeClass("closed");
        }
    },
    toggleFlash: async(color) => {
		$(`#${color}`).css("opacity", 1);
		await timeout(500);
		$(`#${color}`).css("opacity", 0);
	},
    updateStatus: () =>{
        $("#status span").first().text(++view.correct);
    },
    deletePair: () =>{
        $(".left .current").addClass("goLeft");
        $(".right .current").addClass("goRight");
    },
    shake: async () => {
        $(".current").addClass("shake");
        await timeout(820);
        $(".current").removeClass("shake");
    },
    end: async () => {
        await timeout(200);
        let classes = [".left", ".right", ".leftOverlay", ".rightOverlay"];

        for (let i = 0; i < classes.length; i++) {
            $(classes[i]).addClass("closed");
        }

        $("#play").addClass("goUnder");
        $("#status").removeClass("show");

        await timeout(1000);
        $(".outcome").show();
        $(".outcome").addClass("showOutcome");

        let rowCount = Math.ceil(originalData.length / 3);
        let itemCount = 0;

        for (let i = 0; i < rowCount; i++) {
            $(".outcome").append(view.row);
            
            for (let j = 0; j < 3; j++) {
                view.createItem($(".row").eq(i), originalData[itemCount].text, originalData[itemCount].value);
                itemCount++;

                if (itemCount == originalData.length) {
                    return;
                }
            }

            await timeout(200);
        }
    },
    createItem: async (parent, text, value) => {
        let item = `<div class="item">
                        <p>${text}</p>
                        <div class="bar"></div>
                        <p>${value}</p>
                    </div>`;

        $(parent).append(item);
    }
}