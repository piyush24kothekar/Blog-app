
//API_NOTIFICAITONS_MESSAGES
export const API_NOTIFICATIONS_MESSAGES={   
    loading:{
        title:'loading...',
        message:'Data is being loaded,Please wait'
    },
    success:{
        title:'Success',
        message:'Data successfully loaded'
    },
    responseFailure:{
        title:'Error',
        message:"An error occured while fetching response from the server.Please try again"
    },
    requestFailure:{
        title:'Error',
        message:"An error occured while parsing request body"
    },
    networkError:{
        title:"Error",
        message:"Unable to connect with the server. Please check the internet connectivity and try again later"
    }
}

//API SERVICE CALL
//SAMPLE SERVICE
//NEED SERVICE  CALL :{url:"/",method:"POST/GET/PUT/DELETE" ,params:true/false,query:true/false};

export const SERVICE_URLS={
    userSignup:{url:'/signup',method:'POST'},
    userLogin:{url:'/login',method:"POST"},
    uploadFile:{url:'/file/upload',method:"POST"},
    createPost:{url:'create ',method:"POST"},
    getAllPosts:{url:'/posts',method:"GET",params:true},
    getPostbyId:{url:'post',method:"GET",query:true},//id koa assa query  paas kiya
    updatePost:{url:"update",method:"PUT",query:true},
    deletePost:{url:"delete",method:"DELETE",query:true},//id ko bhejne ke liye id true karna pada
    newComment:{url:"/comment/new",method:"POST"},
    getAllComments:{url:"/comments",method:"GET",query:true},//uss post ke corresponding saare comments ko lo
    deleteComment:{url:"/comment/delete",method:"DELETE",query:true}
}
