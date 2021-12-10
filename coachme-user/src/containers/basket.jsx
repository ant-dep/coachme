import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeToBasket } from "../actions/basket/basketAction";
import moment from "moment";
import localization from "moment/locale/fr";
moment.updateLocale("fr", localization);

const Basket = (props) => {
  return (
    <div>
      <h2>Panier</h2>
      {props.cart.basket.length > 0 ? (
        <table className="basket-table">
          <thead>
            <tr>
              <th>Coach</th>
              <th>Sport</th>
              <th>Date</th>
              <th>Prix</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props.cart.basket.map((lesson) => {
              return (
                <tr key={lesson.id}>
                  <td>
                    {lesson.firstName} {lesson.lastName}
                  </td>
                  <td>{lesson.sport}</td>
                  <td>
                    {moment(lesson.start).format("L")} :{" "}
                    {moment(lesson.start).format("LT")} /{" "}
                    {moment(lesson.end).format("LT")}
                  </td>
                  <td>{lesson.price} €</td>
                  <td>
                    <button
                      className="red-button"
                      onClick={(e) => {
                        props.removeToBasket(props.cart.basket, lesson);
                      }}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>Votre panier est vide</p>
      )}
      {props.cart.basket.length > 0 && <Link to="/payment">Payer</Link>}
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    cart: store.basket,
    user: store.user,
  };
};
const mapDispatchToProps = {
  removeToBasket,
};

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
