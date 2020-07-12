import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import Grow from "@material-ui/core/Grow";
import TextField from "@material-ui/core/TextField";


class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false,
            orders: [],
            username: "",
            surname: ""
        };
        this.findOrders = this.findOrders.bind(this);
        this.handleReturn = this.handleReturn.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentDidMount() {

    }
    findOrders(){
        fetch("http://localhost:9000/findOrders", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.username.toLowerCase(), surname: this.state.surname.toLowerCase() })
        })
            .then(response => response.text())
            .then((r) => {
                this.setState({
                    logged: true,
                    orders: JSON.parse(r)
                });
            });
    }
    handleReturn(){
        this.setState({
            logged: false,
            orders: []
        })
    }
    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
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
                                            <Grid container direction="column" alignContent="center">
                                                <Grid item>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        View your past orders
                                                    </Typography>
                                                </Grid>
                                                    <TextField name="username" onChange={this.handleInputChange} label="Username" variant="outlined" style={{margin: "15px 0 0"}}/>
                                                    <TextField name="surname"  onChange={this.handleInputChange} label="Surname" variant="outlined" style={{margin: "15px 0 0"}}/>
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
                            </Grid> : <Grid container justify="center"
                                            alignItems="center" style={{margin: "20px 0"}}>
                                <Card style={{padding: "20px"}}>
                                    <Grid container direction="column"
                                          justify="center"
                                          alignItems="center">
                                        <Grid item>
                                            <HourglassEmptyIcon style={{fontSize: "300px"}} color="disabled" />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h2" style={{color: "grey"}}>
                                                No orders were found
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" style={{marginTop: '20px'}} color="primary" onClick={this.handleReturn}>
                                                Return
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>}

                        </Grid>}
                </Container>
            </div>

        )};
}

export default History;