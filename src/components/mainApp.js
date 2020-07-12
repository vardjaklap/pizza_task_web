import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
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
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import History from "./history";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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

class mainApp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            fullMenu: [],
            cart: [

            ],
            incr: 10,
            snackOpen: false,
            snackMessage: ""
        };
        this.addToCart = this.addToCart.bind(this);
        this.updateCart = this.updateCart.bind(this);
        this.calcItems = this.calcItems.bind(this);
        this.closeSnack = this.closeSnack.bind(this);
        this.completeOrder = this.completeOrder.bind(this);
    }
    componentDidMount() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ fullMenu: JSON.parse(res) }));

        this.calcItems();
    }

    updateCart(newCart){
        this.setState({
            cart: newCart
        })
        if(newCart.length === 0){
            this.setState({
                itemsInCart: 0
            })
        }else{
            this.calcItems();
        }

    }

    calcItems(){
        let itemsInCart = 0;
        if(this.state.cart.length !== 0){
            this.state.cart.forEach((item) => {
                itemsInCart += item.qnt;
            })
        }
        this.setState({
            itemsInCart: itemsInCart
        });

    }
    addToCart(pizzaToAdd){
        let check = false;
        this.state.cart.filter((pizza) => {
            if(pizza.name === pizzaToAdd.name && pizza.size === pizzaToAdd.size){
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
                qnt: 1,
                imgurl: pizzaToAdd.imgurl
            });
            this.setState({
                cart: newCart,
                incr: this.state.incr + 1,
                snackOpen: true,
                snackMessage: "Pizza has been added to the cart!"
            })
        }
        this.calcItems();

    }
    closeSnack(){
        this.setState({
            snackOpen: false
        })
    }
    completeOrder(){
        this.setState({
            snackOpen: true,
            snackMessage: "The order has been received!"
        })
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
                                <Badge badgeContent={this.state.itemsInCart} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                edge="end"
                                color="inherit"
                                component={Link} to="/orders"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <div>
                    <div id="backgroundDecorations" style={{width: "100%", height: '100vh', position: "fixed", zIndex: -100}}>
                        <Grid container
                              justify="space-around" style={{height: "85vh", marginTop: "30px"}}>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Grid container justify="center">
                                            <i className="fas fa-drumstick-bite" style={{fontSize: "5rem", color: "rgba(0, 0, 0, 0.26)"}}></i>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid container justify="center">
                                            <i className="fas fa-pepper-hot" style={{fontSize: "5rem", color: "rgba(0, 0, 0, 0.26)"}}></i>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={9}>
                                        <Grid container justify="center">
                                            <i className="fas fa-cheese" style={{fontSize: "5rem", color: "rgba(0, 0, 0, 0.26)"}}></i>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid><Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={5}>
                                    <Grid container justify="center">
                                        <i className="fas fa-pizza-slice" style={{fontSize: "5rem", color: "rgba(0, 0, 0, 0.26)"}}></i>
                                    </Grid>
                                </Grid>
                                <Grid item xs={7}>
                                    <Grid container justify="center">
                                        <i className="fas fa-bacon" style={{fontSize: "5rem", color: "rgba(0, 0, 0, 0.26)"}}></i>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid><Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={8}>
                                    <Grid container justify="center">
                                        <i className="fas fa-pepper-hot" style={{fontSize: "5rem", color: "rgba(0, 0, 0, 0.26)"}}></i>
                                    </Grid>
                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container justify="center">
                                        <i className="fas fa-fish" style={{fontSize: "5rem", color: "rgba(0, 0, 0, 0.26)"}}></i>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        </Grid>
                    </div>
                    <Switch>
                        <Route exact path="/">
                            <Grid container justify="center">
                                <Grid item>
                                    <Card style={{marginTop: "20px"}}>
                                        <CardContent>
                                            <Typography color="textSecondary" variant="h3" gutterBottom>
                                                Welcome to our pizza delivery!
                                            </Typography>

                                            <Button variant="contained" color="primary"  component={Link} to="/menu" style={{height: "120px", width: "100%"}}>
                                                Proceed to the menu
                                            </Button>

                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Route>
                        <Route exact path="/menu">
                            <Menu addToCartFunc = {this.addToCart} fullMenu={this.state.fullMenu}/>
                        </Route>
                        <Route exact path="/cart">
                            <Cart cart={this.state.cart} updateCartFunc = {this.updateCart}  completeOrder = {this.completeOrder}/>
                        </Route>
                        <Route exact path="/orders">
                            <History />
                        </Route>
                    </Switch>
                </div>
            </Router>
            <Snackbar anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }} open={this.state.snackOpen} autoHideDuration={5000} onClose={this.closeSnack} >
                <Alert onClose={this.closeSnack} elevation={6} variant="filled">
                    {this.state.snackMessage}
                </Alert>
            </Snackbar>
        </ThemeProvider>

    )};
}

export default mainApp;