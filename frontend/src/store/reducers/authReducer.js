const reducer = (state ={}, action) =>{
    if(action.type === "login_attempt") {
       return {loading:true}
    }
    else if (action.type === "login_success") {
        return {user : action.payload.user,
        isAuth : true,
       loading : false,}
       
    }else if (action.type === "login_failed") {
        return {
            error : action.payload,
            loading : false
        }
    }else if (action.type === "clear_errors") {
        return {
            ...state,
            error: null,
        }
    }else if (action.type == "logout_success") {
        localStorage.clear();
        return {
            user: null,
            isAuth: false,
            loading: false,
        }
    }else if( action. type =="login_failed") {
        return {
            ...state,
            loading: false,
            error: action.payload,
        }
    }
    else {
    return state;
}
}
export default reducer;