
import axiosClient from "./axiosClient";


const cityApi = {
    getAll():Promise<any> {
        const URL="/cities";
        return axiosClient.get(URL,{
            params: {
              _page: 1,
              _limit: 10,
            },
          })
    }
}
export default cityApi;