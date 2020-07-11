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


class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false,
            orders: []
        };
        this.findOrders = this.findOrders.bind(this)
    }
    componentDidMount() {

    }
    findOrders(){
        fetch("http://localhost:9000/findOrders", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: "alexperesta", surname: "peresta" })
        })
            .then(response => response.text())
            .then((r) => {
                this.setState({
                    logged: true,
                    orders: JSON.parse(r)
                });
                console.log(r);
            });
    }
    render(){
        return (
            <div>
                <Container>
                    {this.state.logged === false ?
                        <Grid container justify="center">
                            <Grid item >
                                <Grow in>
                                    <Card style={{ marginTop: "20px", marginBottom: "20px"}}>
                                        <CardContent>
                                            <Grid container direction="column">
                                                <Grid item>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        Provide the following info to view your past orders
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <TextField label="Username" variant="outlined" style={{margin: "15px 0 0"}}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextField label="Surname" variant="outlined" style={{margin: "15px 0 0"}}/>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        <CardActions>
                                            <Grid container justify="flex-end">
                                                <Button color="primary" variant="contained" onClick={this.findOrders}>
                                                    Find orders
                                                </Button>
                                            </Grid>
                                        </CardActions>
                                    </Card>
                                </Grow>
                            </Grid>
                        </Grid>
                        : <Grid container>
                            {this.state.orders.length !== 0  ? <Grid container
                                                                     justify="center"
                                                                     alignItems="center" style={{marginBottom: "20px"}}>
                                {this.state.orders.map((item)=> {
                                    return(<Grid item xs={8} key={item.id}>
                                        <Card style={{margin: "10px 0"}}>
                                            <CardContent>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <Grid container>
                                                            <Grid item xs={3}>
                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                    Date
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                    Name
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                    Order
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                    Price
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Grid container>
                                                            <Grid item xs={3}>
                                                                {new Date(item.date).getDate()}/{new Date(item.date).getMonth()+1}/{new Date(item.date).getFullYear()}
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                {item.first_name[0].toUpperCase() + item.first_name.substring(1)} {item.surname[0].toUpperCase() + item.surname.substring(1)}
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                {item.order_desc}
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                {item.price}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>)
                                })}
                            </Grid> : <div>

                            </div>}

                        </Grid>}
                </Container>
            </div>

        )};
}

export default History;