import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Menu from "./menu";
import Cart from "./cart";
import grey from "@material-ui/core/colors/grey";
import Button from "@material-ui/core/Button";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: amber[500],
        },
        secondary: {
            main: grey[900]
        }
    },
});
const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
}));


class mainApp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cart: [
                {
                    id: 0,
                    name: "Margherita",
                    desc: "Cheese. Mozarella.",
                    price: 10.99,
                    size: "sm",
                    qnt: 1
                },{
                    id: 1,
                    name: "Margherita",
                    desc: "Cheese. Mozarella.",
                    price: 15.99,
                    size: "md",
                    qnt: 1
                },{
                    id: 2,
                    name: "Margherita",
                    desc: "Cheese. Mozarella.",
                    price: 17.99,
                    size: "lg",
                    qnt: 3
                },
            ],
            incr: 10
        };
        this.addToCart = this.addToCart.bind(this);
        this.updateCart = this.updateCart.bind(this);
    }

    updateCart(newCart){
        this.setState({
            cart: newCart
        })
    }

    addToCart(pizzaToAdd){
        let check = false;
        this.state.cart.filter((pizza) => {
            if(pizza.name === pizzaToAdd.name && pizza.size == pizzaToAdd.size){
                pizza.qnt++;
                check = true;
            }
        })
        if(!check){
            let newCart = this.state.cart;
            newCart.push({
                id: this.state.incr,
                name: pizzaToAdd.name,
                desc: pizzaToAdd.desc,
                price: pizzaToAdd.price,
                size: pizzaToAdd.size,
                qnt: 1
            });
            this.setState({
                cart: newCart,
                incr: this.state.incr + 1
            })
            console.log(this.state.incr)
        }

    }
    render(){
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
                            Pizza Co.
                        </Typography>
                        <div >
                            <Button variant="contained" color="secondary" component={Link} to="/menu">
                                Menu
                            </Button>
                            <IconButton aria-label="show 4 new mails" color="inherit" component={Link} to="/cart">
                                <Badge badgeContent={this.state.cart.length} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <div> </div>
                        </Route>
                        <Route exact path="/menu">
                            <Menu addToCartFunc = {this.addToCart}/>
                        </Route>
                        <Route exact path="/cart">
                            <Cart cart={this.state.cart} updateCartFunc = {this.updateCart}/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </ThemeProvider>

    )};
}

export default mainApp;