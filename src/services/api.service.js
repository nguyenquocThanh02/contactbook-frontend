import axios from "axios";

const commonConfig = {
    headers: {
        "Content-type": "application/json",
        Accept: "application/json"
    }
};

export default (baseURL) => {
    return axios.create({
        baseURL,
        ...commonConfig
    })
};