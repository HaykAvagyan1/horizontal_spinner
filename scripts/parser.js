axios.defaults.baseURL = "https://blackboxbasic.herokuapp.com/";

const parser = {
    dataFetch: async () => {
        let  url	= new URL(document.location.href);
		let _uid    = url.searchParams.get("_uid");

        if (_uid == undefined) {
            return undefined;
        }

        return axios.get(config.query_url + _uid);
    }
}

const icons = {
    objects: [
        {
            url : "images/plastic_bag.svg",
            title: "Plastic bags",
            description: "you know single-use plastic bags, plates, cups, straws, and more were banned in France last year (1)?  This is because of the waste created by these single-use items.  Roughly 17 billion plastic bags were used every day before the ban, and about half of those were just thrown away.  To make things worse, these bags take up to 400 years to biodegrade (2).  So what can you do?",
            info: {
                reduce  : "Did you know single-use plastic bags, plates, cups, straws, and more were banned in France last year (1)?  This is because of the waste created by these single-use items.  Roughly 17 billion plastic bags were used every day before the ban, and about half of those were just thrown away.  To make things worse, these bags take up to 400 years to biodegrade (2).  So what can you do?",
                reuse   : "no I didn't know",
                recycle : "yes I Know"    
            }
        },
        {
            url : "images/bottle.svg",
            title: "Plastic bags",
            description: "Did you know single-use plastic tes, , a we banned in Fran  is cause of thewate cted by these single-use items.  Roughly 17 billion plastic bags were used every day before the ban, and about half of those were just thrown away.  To make things worse, these bags take up to 400 years to biodegrade (2).  So what can you do?",
            info: {
                reduce  :  "aaaaaa",
                reuse   :  "no I didn't know",
                recycle :  "yes I Know"
            }
        },
        {
            url : "images/basket.svg",
            title: "Plastic bags",
            description: "Did you know single-use plastic bs, straws, and last yea(?is because of the waste created by these single-use items.  Roughly 17 billion plastic bags were used every day before the ban, and about half of those were just thrown away.  To make things worse, these bags take up to 400 years to biodegrade (2).  So what can you do?",
            info: {
                reduce  : "bbbbb",
                reuse   : "no I didn't know",
                recycle : "yes I Know"    
            }
        }
    ]
}