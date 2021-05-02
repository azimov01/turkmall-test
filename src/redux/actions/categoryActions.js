import {
    ADD_BRAND,
    ADD_CATEGORY
} from "../../constants/constants";


export const addBrand = brand =>({
    type: ADD_BRAND,
    payload: brand
})



export const addCategory = category =>({
    type: ADD_CATEGORY,
    payload: category
})
