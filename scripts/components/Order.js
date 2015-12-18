/*
  Order
*/
import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import h from '../helpers';

var Order = React.createClass({
  renderOrder: function(key) {
    var fish = this.props.fishes[key];
    var count = this.props.order[key];
    var removeButton = <button onClick={this.props.removeFromOrder.bind(null, key)}>&times;</button>
    if (!fish) {
      return <li key={key}>Sorry! Fish no longer available! {removeButton} </li>
    }
    return (
      <li key={key}>
        <CSSTransitionGroup
            component="span"
            transitionName="count"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}
        >
          <span key={count}>{count}</span>
        </CSSTransitionGroup>
        lbs {fish.name} {removeButton}
        <span className="price">{h.formatPrice(count * fish.price)}</span>
      </li>
    )
  },
  render : function() {
    var orderIds = Object.keys(this.props.order); //array of order keys
    var total = orderIds.reduce((prevTotal, key)=> {
      var fish = this.props.fishes[key];
      var count = this.props.order[key];

      var isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return prevTotal + (parseInt(fish.price) * count || 0);
      }

      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2 className="order-title">Your Order</h2>
        <CSSTransitionGroup
            className="order"
            component="ul"
            transitionName="order"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {h.formatPrice(total)}
          </li>
        </CSSTransitionGroup>
      </div>
    );
  },
  propTypes : {
    fishes : React.PropTypes.object.isRequired,
    order : React.PropTypes.object.isRequired,
    removeFromOrder : React.PropTypes.func.isRequired
  }
})

export default Order;