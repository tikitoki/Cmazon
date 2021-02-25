export const initialState = {
  basket: [],
  user: null,
};

// export const getBasketTotal = (basket) => {
//   let sum = 0;
//   for (let i = 0; i < basket.length; i++) {
//     sum += parseFloat(basket[i].price);
//     console.log(i + basket[i].price);
//   }
//   return sum;
// };

export const getBasketTotal = (basket = []) => {
  return basket.reduce((total, item) => {
    return total + parseFloat(item.price);
  }, 0);
};

const reducer = (state = { basket: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "EMPTY_BASKET":
      console.log("basketBeforeReducer>>>", state.basket);
      return {
        ...state,
        basket: [],
      };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = state.basket;

      if (index >= 0) {
        // console.log(index);
        // console.log(newBasket);
        newBasket = newBasket.filter((item, i) => i !== index);
        // console.log(newBasket);
      } else {
        console.warn(`无法移除物品(id:${action.id}),id错误`);
      }

      return {
        ...state,
        basket: newBasket,
      };
    case "SET_USER":
      console.log("reducer-user>>>", action.user);
      return {
        ...state,
        user: action.user,
      };
    case "SET_SUPER_USER":
      console.log("isSuperUser>>>", action.isSuperUser);
      return {
        ...state,
        user: { email: "测试用户" },
        isSuperUser: action.isSuperUser,
      };
    case "SET_SUPER_USER_FALSE":
      return {
        ...state,
        user: null,
        isSuperUser: action.isSuperUser,
      };
    default:
      return state;
  }
};

export default reducer;
