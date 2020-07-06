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

const theme = createMuiTheme({
    palette: {
        primary: {
            main: amber[500],
        },
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
            ]
        };
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
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={this.state.cart.length} color="secondary">
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
                            <Menu/>
                        </Route>
                        <Route exact path="/cart">
                            <Cart cart={this.state.cart}/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </ThemeProvider>

    )};
}

export default mainApp;