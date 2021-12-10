import { MODIFY_BASKET, CLEAN_BASKET } from "../actions/basket/actions-types";

//on récuère le panier dans le localStorage on stock dans une variable lsBasket
let lsBasket = JSON.parse(window.localStorage.getItem("coachme-basket"));
//si lsBasket est null (pas trouvé)
if (lsBasket === null) {
  //lsBasket sera un tableau vide
  lsBasket = [];
}
//on initialise un totalAmount(appel de fonction) qu'on stock dans une variable totalAmount
let totalPrice = calculateTotalAmount(lsBasket);
//on va créer l'initialState en fonction de la variable lsBasket et totalAmount
const initialState = {
  basket: lsBasket,
  totalPrice: totalPrice,
};

function calculateTotalAmount(basket) {
  //on initialise une variable total à 0
  let totalPrice = 0;
  //boucle qui parcours tous les éléments du panier
  for (let i = 0; i < basket.length; i++) {
    //additionne le prix de chaque lesson au total
    totalPrice += parseFloat(basket[i].price);
  }
  //on retourne le total
  return totalPrice;
}

export default function BasketReducer(state = initialState, action) {
  switch (action.type) {
    case MODIFY_BASKET:
      let totalPrice = calculateTotalAmount(action.payload);

      return { basket: action.payload, totalPrice: totalPrice };
      break;

    case CLEAN_BASKET:
      console.log("reducer clean", action);
      return { basket: [], totalPrice: 0 };
      break;

    default:
      return state;
      break;
  }

  return state;
}
