//HTTP/ HTTPS Call
import URL from '../utils/constant.js';
export const makeNetworkCall = async () => {
    try {
        const promise = await fetch(URL);
        const data = await promise.json();
        return data;
    }
    catch (err) {
        console.log("Some problem in API Call ", err);
        throw err;
    }
}
export default makeNetworkCall;


// function makeNetworkCall1() {
//     const promise = fetch("https://gist.githubusercontent.com/kshirsagarps/36fade16fa39202715656ef487aaf7b0/raw/2b682e589ef283f06be42d2799dfa54f57794a6e/Pizza.json");
//     console.log("Promise is ", promise);
//     promise.then(response => {
//         console.log("Response is ", response);
//         const promise2 = response.json();
//         promise2.then(data => console.log("Data is ", data))
//             .catch(e => console.log("JSON parse error ", e))
//     }).catch(err => {
//         console.log("Error is ", err);
//     })
// }
// makeNetworkCall1();