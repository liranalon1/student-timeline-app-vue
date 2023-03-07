import axios from 'axios';
const baseAPI = "http://localhost:3000";

async function callAPI({url, params}) {
    return await axios({
        url: `${baseAPI}/${url}`,
        ...params
    }).then ( (response) => {
        return {
            status: response.status,
            data: response.data
        }
    }).catch((error) =>{
        console.log(error)
        return {
            status: error.response.status,
            data: error.response.data
        }
    })
}

export { callAPI };