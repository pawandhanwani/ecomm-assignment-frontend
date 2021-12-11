import React , {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/index';
class Dashboard extends Component {
    state = {
        items : [],
        cartId : null,
        itemsInCart : [],
        orders : ''
    }
    componentDidMount()
    {
        this.getCart();
        this.getAllItems();
        this.getOrders();
    }
    getCart = () => {
        axios.post('http://localhost:3011/user/cart' , {token : this.props.token})
        .then(resp => {
            this.setState({cartId : resp.data.cart_id , itemsInCart : resp.data.itemsInCart });
        })
        .catch(err => {
            this.setState({cartId : null});
        })
    }
    getOrders = () => {
        axios.post('http://localhost:3011/user/orders' , {token : this.props.token})
        .then(resp => {
            let orders= '';
            resp.data.orders.forEach(order => {
                let orderStr = ' Order Id : ' + order.orderId + '->'
                order.items.forEach(item => {
                    orderStr += ' ' + item + ', '
                })
                orderStr = orderStr + '|'
                orders += orderStr
            });
            this.setState({orders : orders});
        })
        .catch(err => {
            console.log(err);
            this.setState({orders : ''});
        })
    }
    getAllItems = () => {
        axios.get('http://localhost:3011/item/list')
        .then(resp => {
            this.setState({items : resp.data.items});

        })
        .catch(err => {
            console.log(err);
            this.setState({items : []})
        })
    }
    addHandler = (itemId) => {
        axios.post('http://localhost:3011/cart/add',{token : this.props.token, itemId :itemId})
        .then(resp => {
            this.getCart();
        })
        .catch(err => {
            console.log(err);
            window.alert('item already present');
        })
    }
    checkoutHandler = () => {
        if(this.state.itemsInCart.length>0)
        {
            axios.patch(`http://localhost:3011/cart/${this.state.cartId}/complete` , {token : this.props.token})
            .then(resp => {
                this.getCart();
                this.getOrders();
            })
            .catch(err => {
                console.log(err);
                window.alert('cannot complete checkout');
            })
        }
        else
        {
            window.alert('Please add something in cart to checkout');
        }
    }
    render() {
        return (
            <div>
                <button onClick={() => this.checkoutHandler()}>Checkout</button>
                <button onClick={() => {window.alert('cartId = '+ this.state.cartId + ' items = ' + this.state.itemsInCart)}}>Cart</button>
                <button onClick={() => {window.alert(this.state.orders)}}>Orders</button>
                <button onClick={() =>this.props.onLogout()}>LogOut</button>
                <h1 align="center">Dashboard</h1>
                <h3>All products</h3>
                {this.state.items.map(item => {
                    return (
                    <div>
                        <p>Name : {item.name}</p>
                        <p>Price : {item.price}</p>
                        <button onClick={()=>{this.addHandler(item.itemId)}}>Add</button>
                        <button onClick={()=>{window.alert('cartId = '+ this.state.cartId + ' itemId = ' +item.itemId)}}>Show Ids</button>
                        <hr/>
                    </div>
                );
                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token : state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout : () => (dispatch(actionCreators.authLogout()))
    }
}
 
export default withRouter (connect(mapStateToProps,mapDispatchToProps)(Dashboard));
