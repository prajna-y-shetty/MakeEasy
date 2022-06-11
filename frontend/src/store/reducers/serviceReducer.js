export const serviceReducer = (state = {services : {}}, action) => {
    if (action.type === "addservice") {
        return { loading: true }
    } else if (action.type === "add_failed") {
        return {
            ...state,
            error: action.payload,
            loading: false,
        }
    } else if (action.type === "add_success") {
        return {
            service: action.payload.service,
            loading: false,
        }
    }  if (action.type === "listsevice") {
        return { loading: true }
    } else if (action.type === "list_failed") {
        return {
            ...state,
            error: action.payload,
            loading: false,
        }
    } else if (action.type === "list_success") {
        return {
            services: action.payload.services,
            loading: false,
        }
    } else if (action.type === "editservice") {
        return { loading: true }
    } else
    if (action.type === "edit_failed") {
        return {
            ...state,
            error: action.payload,
            loading: false,
        }
    } else if (action.type === "edit_success") {
        return {
            service: action.payload.service,
            loading: false,
        }
    }else if (action.type === "delete_service") {
        return {
            loading: true
        }
    } else if (action.type === "delete_failed") {
        return {
            ...state,
            error: action.payload,
            loading: false,
        }
    } else if (action.type === "delete_success") {
        return {
            services: state.services.filter((service) => {
                return service.id != action.payload.id
            }),
            error: action.payload,
            loading: false,
        }

    } else {
        return state;
    }
}

