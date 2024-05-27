import axios from 'axios';
// axios ki helpp se api ko call karunga Axios is a popular JavaScript library used to make HTTP requests from both the browser and Node.js. Interceptors are functions that Axios runs before a request is sent or after a response is received, allowing you to modify the request or response.
import { API_NOTIFICATIONS_MESSAGES,SERVICE_URLS } from '../constants/config.js';
import { getAccessToken,getType } from '../utils/common-utils.js';

const API_URL='http://localhost:5000';

const axiosInstance=axios.create({
    baseURL:API_URL,
    // agar response delay ho gaya toh delay 10000 miliseconds ka dalo
    timeout:10000,
    headers: {
        "Accept": "application/json, multipart/form-data", 
        "Content-Type": "application/json"
}
})

axiosInstance.interceptors.request.use(
    function (config){
        // It receives the config object, which contains details about the request such as the URL, headers, method, etc.
// The function must return the config object, possibly after modifying it (e.g., adding an authoriz    ation header).
        if(config.TYPE.params){
            config.params=config.TYPE.params;
        }else if(config.TYPE.query){
            config.url=config.url+"/"+config.TYPE.query;
        }

        return config;
    },
    function(error){
        // This function is executed if there is an error in setting up the request.
// It receives the error object and must return a rejected Promise with this error, which will allow the error to be handled later in the promise chain.
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    //2 callback function ka use karo   
    function(response){
        //loader ko yahape rukhva sakhte ho
        return processResponse(response);//response ko process karne ke baad woh processed respobse bhejo
    },
    function (error){
        //Stop global loader here
        return Promise.reject(processError(error));
    }
)


const processResponse=(response)=>{
    if(response?.status===200){
        return {isSuccess:true,data:response.data};
    }else
    {
        return {
            isFailure:true,
            status:response?.status,
            msg:response?.msg,
            code:response?.code
        }
    }
}

//debugging becomes simpler 
const processError=(error)=>{
    if(error.response){
        //request was made and server responded with a other status code like 500
        //that falls out of the 2.x.x
        console.log("ERROR IN RESPONSE: ",error.toJSON());
        return {
            isError:true,
            msg:  API_NOTIFICATIONS_MESSAGES.responseFailure,
            code:error.response.status
        }
    }else if(error.request){
        //request made but no response was received probable errors:frontend not connected with backend
        console.log("ERROR IN REQUEST: ",error.toJSON());
        return {
            isError:true,
            msg:  API_NOTIFICATIONS_MESSAGES.requestFailure,
            code:""//request se koi status code hi aata
        }
    }
    else
    {
        //frontend se gadbad hui hai
        console.log("ERROR IN NETWORK: ",error.toJSON());
        return {
            isError:true,
            msg:  API_NOTIFICATIONS_MESSAGES.networkError,
            code:""//request se koi status code hi aata
        }
    }
}

const API={};

for(const [key,value] of Object.entries(SERVICE_URLS)){
    // showUploadProgress and showDownloadProgress hum loading bar ko dikhane ke liye mentioned karte hai
    API[key]=(body,showUploadProgress,showDownloadProgress)=>
        axiosInstance({
            method:value.method,
            url:value.url,
            data:value.method==="DELETE"?{}:body,
            responseType:value.responseType,
            headers:{
                authorization:getAccessToken()
            },
            TYPE:getType(value,body),
            onUploadProgress:function(progressEvent ){
                if(showUploadProgress){
                    let percentageCompleted=Math.round((progressEvent.loaded*100)/progressEvent.total);//calculated percentageof API data fetching 

                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress:function(progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted=Math.round((progressEvent.loaded*100)/progressEvent.total);//calculated percentageof API data fetching 

                    showDownloadProgress(percentageCompleted);
                }   
            }
        })
}

export {API};