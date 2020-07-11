import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Grow from "@material-ui/core/Grow";
import TextField from "@material-ui/core/TextField";


class Cart  extends React.Component {
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
                    qnt: 1,
                    imgurl: "https://media.dominos.ua/__sized__/menu/product_osg_image_category/2019/10/04/BBQ_DeLUX_300dpi-min-thumbnail-960x960-70.jpg"
                }
            ],
            subtotal: 0,
            tax: 0,
            total: 0,
            euroPrice: 0,
            dialog: false
        };
        this.closeDialog = this.closeDialog.bind(this);
        this.openDialog = this.openDialog.bind(this);

    }
    componentDidMount() {
         this.setState({
             cart: this.props.cart
         });
        this.calcTotal(this.props.cart)
    }
    calcTotal(cart){
        let subtotal = 0;
        cart.forEach((item) => {
            subtotal += item.price * item.qnt;
        });
        subtotal =  parseFloat(subtotal.toFixed(2));
        let tax = (subtotal * 0.05).toFixed(2);
        let total = parseFloat((subtotal + parseFloat(tax) + 3.99).toFixed(2));
        fetch("http://localhost:9000/usdToEur", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usd: total })
        })
            .then(response => response.text())
            .then(r => this.setState({euroPrice: parseFloat(r).toFixed(2)}));

        this.setState({
            subtotal: subtotal,
            tax: tax,
            total: total
        })
    }
    deleteItem(id){
        let cart = this.state.cart;
        let newCart = cart.filter((item) => {
                if(item.id === id){
                    item.qnt = item.qnt - 1;
                    if(item.qnt !== 0){
                        return item;
                    }
                }else{
                    return item;
                }
            });
        this.setState({
            cart: newCart
        });
        this.props.updateCartFunc(newCart);
        this.calcTotal(newCart)

    }
    openDialog(){
        this.setState({
            dialog: true
        })
    }
    closeDialog(){
        this.setState({
            dialog: false
        })
    }
    render(){
    return (
        <div>
            <Container>
                {this.state.cart.length > 0 ?
                <Grid container justify="center">
                    <Grid item xs={12} sm={10} md={8}>
                        <Grow in>
                            <Card style={{width: "100%", marginTop: "20px", marginBottom: "20px"}}>
                                <CardContent>
                                    <Typography gutterBottom variant="h4" component="h2">
                                        Your cart
                                    </Typography>
                                    <Grid container spacing={1}>
                                        <Grid item xs={1}>
                                            <Typography gutterBottom variant="subtitle2" style={{textAlign: "center"}}>
                                                Qnt.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography gutterBottom variant="subtitle2">
                                                Item
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography gutterBottom variant="subtitle2">
                                                Price
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                    {/*To map here*/}
                                    {this.state.cart.map((item) => {
                                        return(
                                            <Grid container spacing={1} alignItems="stretch" key={item.id}>
                                                <Grid item xs={1}>
                                                    <Grid container alignItems="center" justify="center" style={{height: "100%"}}>
                                                        <Typography gutterBottom variant="h6" style={{textAlign: "center"}} color="primary">
                                                            {item.qnt}X
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <CardMedia
                                                        image={item.imgurl}
                                                        title="Paella dish"
                                                        style={{height: "75px", margin: "5px"}}
                                                    />
                                                    {/*<CardMedia img={item.imgurl} style={{height: "100%"}}/>*/}
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Grid container alignItems="center" style={{height: "100%"}}>
                                                        <Grid item>
                                                            <Typography variant="body1">
                                                                {item.name} ({item.size})
                                                            </Typography>
                                                            <Typography gutterBottom variant="caption">
                                                                {item.desc}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Grid container alignItems="center" style={{height: "100%"}}>
                                                        <Typography gutterBottom variant="h5">
                                                            ${item.price * item.qnt}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <Button style={{width: "100%", height: "100%"}} onClick={() => this.deleteItem(item.id)}>
                                                        X
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        )
                                    })}

                                    {/*end mapping*/}
                                    <Divider />
                                    <Grid container justify="space-between" style={{margin: "20px 0 0"}}>
                                        <Grid item xs={4}>
                                            <Typography gutterBottom variant="body1" component="h2">
                                                Your subtotal:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography gutterBottom variant="body2" component="h2">
                                                ${this.state.subtotal}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container justify="space-between">
                                        <Grid item xs={4}>
                                            <Typography gutterBottom variant="body1" component="h2">
                                                Tax (5%):
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography gutterBottom variant="body2" component="h2">
                                                ${this.state.tax}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container justify="space-between">
                                        <Grid item xs={4}>
                                            <Typography gutterBottom variant="body1" component="h2">
                                                Delivery:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography gutterBottom variant="body2" component="h2">
                                                $3.99
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container justify="space-between">
                                        <Grid item xs={4}>
                                            <Typography gutterBottom variant="h6" component="h2">
                                                Your total:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                ${this.state.total} / €{this.state.euroPrice}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <Grid container justify="flex-end">
                                        <Button color="primary" variant="contained" onClick={this.openDialog}>
                                            Proceed to delivery
                                        </Button>
                                    </Grid>
                                </CardActions>
                            </Card>
                        </Grow>
                    </Grid>
                </Grid>
                    : <Grid container  direction="column"
                            justify="center"
                            alignItems="center" style={{height: "80vh"}}>
                        <Grid item>
                            <ShoppingCartIcon style={{fontSize: "300px"}} color="disabled" />
                        </Grid>
                        <Grid item>
                            <Typography variant="h2" style={{color: "grey"}}>
                                Your cart is empty.
                            </Typography>
                        </Grid>
                    </Grid>}
            </Container>
            <Dialog
                open={this.state.dialog}
                onClose={this.closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Setting up delivery"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please provide the following information
                    </DialogContentText>

                    <Grid container direction="column">
                        <Grid item>
                            <TextField label="Username" variant="outlined" style={{margin: "15px 0 0"}}/>
                        </Grid>
                        <Grid item>
                            <TextField label="First name" variant="outlined" style={{margin: "15px 0 0"}}/>
                        </Grid>
                        <Grid item>
                            <TextField label="Surname" variant="outlined" style={{margin: "15px 0 0"}}/>
                        </Grid>
                        <Grid item>
                            <TextField multiline rows={4} label="Full address" variant="outlined" style={{margin: "15px 0 0"}}/>
                        </Grid>
                    </Grid>


                </DialogContent>
                <DialogActions>
                    <Button onClick={this.closeDialog} color="primary" autoFocus variant="contained">
                        Get pizza!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    )};
}

export default Cart;