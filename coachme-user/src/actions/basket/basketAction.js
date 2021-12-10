import { MODIFY_BASKET, CLEAN_BASKET } from "./actions-types";

// permet d'ajouter des articles dans le basket
export const addToBasket = (basket, newLesson, price) => {
  return function (dispatch) {
    //findIndex sur basket de la lesson
    let same = basket.findIndex((b) => b.id === newLesson.id);
    // si on trouve un produit same renvoie un index, sinon -1
    if (same === -1) {
      //on ajoute le price à l'objet newLesson
      newLesson.price = price;
      //on ajoute la lesson au basket
      basket.push(newLesson);
      //on sauvegarde le basket dans le localStorage
      let lsBasket = JSON.stringify(basket);
      window.localStorage.setItem("coachme-basket", lsBasket);
      //on envoi le panier dans le store
      dispatch({
        type: MODIFY_BASKET,
        payload: basket,
      });
      //sinon
    } else {
      //on retourne un message d'erreur que la lesson est déjà dans le panier
      return "Attention, vous avez déjà ajouté ce cours dans votre panier";
    }
  };
};

export const removeToBasket = (basket, lesson) => {
  return function (dispatch) {
    //on filtre le basket en enlevant la lesson qu'on veut supprimer on stock dans une variable newBaske
    let newBasket = basket.filter((b) => b.id !== lesson.id);
    //on enregistre dans le localStorage
    let lsBasket = JSON.stringify(newBasket);
    window.localStorage.setItem("coachme-basket", lsBasket);
    //on envoi vers le reducer
    dispatch({
      type: MODIFY_BASKET,
      payload: newBasket,
    });
  };
};

export const cleanBasket = () => {
  console.log("action clean");
  return function (dispatch) {
    dispatch({
      type: CLEAN_BASKET,
      payload: null,
    });
  };
};
