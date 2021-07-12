// axios.defaults.baseURL = "https://blackboxbasic.herokuapp.com/";

const parser = {
    dataFetch: async () => {
        return icons;
        // return axios.get(config.query_url + _uid);
    }
}

const icons = {
    objects: [
        {
            url : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Information_icon.svg/768px-Information_icon.svg.png"
        },
        {
            url : "https://upload.wikimedia.org/wikipedia/commons/6/6c/Phone_icon.png"
        },
        {
            url : "https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
        }
    ]
}