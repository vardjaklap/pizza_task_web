import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";


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
                    qnt: 1
                }
            ],
            subtotal: 0,
            tax: 0,
            total: 0
        };
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
        })
        let tax = (subtotal * 0.05).toFixed(2);
        let total = subtotal + parseFloat(tax);
        this.setState({
            subtotal: subtotal,
            tax: tax,
            total: total
        })
    }
    deleteItem(id){
        let cart = this.state.cart;
    }
    render(){
    return (
        <div>
            <Container>
                <Grid container justify="center">
                    <Grid item xs={12} sm={10} md={8}>
                        <Card style={{width: "100%", marginTop: "20px"}}>
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="h2">
                                    Your cart
                                </Typography>
                                <Grid container spacing={1}>
                                    <Grid item xs={2}>
                                        <Typography gutterBottom variant="subtitle2" style={{textAlign: "center"}}>
                                            Qnt.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
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
                                            <Grid item xs={2}>
                                                <Typography gutterBottom variant="h6" style={{textAlign: "center"}} color="primary">
                                                    {item.qnt}X
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Grid container alignItems="center" style={{height: "100%"}}>
                                                    <Typography gutterBottom variant="body1">
                                                        {item.name} ({item.size})
                                                    </Typography>
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
                                                <Button style={{width: "100%", height: "100%"}}>
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
                                            ${this.state.total}
                                        </Typography>
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>

    )};
}

export default Cart;