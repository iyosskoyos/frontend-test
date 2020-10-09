export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0)

export const initialState = {
    basket: [],
    user: "null",
    itemDetail: {}
}

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_ITEM':
            return {
                ...state,
                itemDetail: action.item
            }
        case 'ADD_TO_BASKET':
            //logic
            return {
                ...state,
                basket: [...state.basket, action.item]
            }
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }
        case 'REMOVE_FROM_BASKET':
            //logic
            let newBasket = [...state.basket];
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id)

            if (index >= 0) {
                newBasket.splice(index, 1)
            } else {
                console.warn(
                    `cant remove product id ${action.id}`
                )
            }

            return {
                ...state,
                basket: newBasket
            }
        default:
            return state;
    }
}

export default reducer;