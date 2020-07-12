import React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Chip from "@material-ui/core/Chip";
import Grow from "@material-ui/core/Grow";


class Menu extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            pizzas: [

            ],
            dialogPizza: {
                id: 1,
                name: "Texas",
                description: "Corn, Onion, Mushrooms, Bavarian sausages, Mozarella, BBQ sauce",
                veg: true,
                spicy: true,
                sm: 10.99,
                md: 14.99,
                lg: 17.99,
                img: "https://media.dominos.ua/menu/product_osg_image_category/2019/10/03/%D0%A2%D0%B5%D1%85%D0%B0%D1%81_300dpi-min.jpg"
            },
            chosenSize: "sm",
            chosenPrice: 0
        };
        this.closeDialog = this.closeDialog.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.handlePizzaSize = this.handlePizzaSize.bind(this);
        this.addPizza = this.addPizza.bind(this);
    }

    //Handling the dialog
    openDialog(pizza){
        this.setState({
            dialogOpen: true,
            dialogPizza: pizza,
            chosenPrice: pizza.price_sm,
            chosenSize: "sm"
        })
    }
    closeDialog(){
        this.setState({
            dialogOpen: false
        })
    }

    //Changing the price of the pizza in a dialog according to the size
    handlePizzaSize(event, newSize){
        let price = 0;
        if(newSize === "sm"){
            price = this.state.dialogPizza.price_sm;
        }else if(newSize === "md"){
            price = this.state.dialogPizza.price_md;
        }else if(newSize === "lg"){
            price = this.state.dialogPizza.price_lg;
        }
        this.setState({
            chosenSize: newSize,
            chosenPrice: price
        })
    }
    //adding the selected pizza to a cart
    addPizza(){
        let pizzaToCart = {
            name: this.state.dialogPizza.name,
            desc: this.state.dialogPizza.ingr,
            size: this.state.chosenSize,
            price: this.state.chosenPrice,
            imgurl: this.state.dialogPizza.imgurl
        };
        this.props.addToCartFunc(pizzaToCart);
        this.closeDialog();
    }
    render() {
    return (
        <div>
            <Container style={{marginTop: "25px"}}>
                <Grid container
                      justify="center"
                      alignItems="stretch"
                      spacing={3}>
                    {/*Mapping all menu items*/}
                    {this.props.fullMenu.map((pizza) => {
                        return(
                            <Grid item xs={12} sm={6} md={3} key={pizza.id}>
                                <Grow in
                                      style={{ transformOrigin: '0 0 0' }}
                                      {...(true ? { timeout: (pizza.id * 150) } : {})}>
                                    <Card style={{height: "100%", display: "flex",flexDirection: "column"}}>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height="140"
                                            image={pizza.imgurl}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {pizza.name}
                                                {pizza.spicy === 1 &&
                                                <i className="fas fa-pepper-hot" style={{color: "red", margin: "0 4px"}}></i>
                                                }
                                                {pizza.vegetarian === 1 &&
                                                <i className="fas fa-carrot" style={{color: "green", margin: "0 4px"}}></i>
                                                }
                                            </Typography>
                                            <Typography variant="body1" color="textSecondary" component="p" >
                                                {pizza.description}
                                            </Typography>
                                            {
                                                pizza.ingr.split(', ').map((str) => {
                                                    return(
                                                        <Chip key={str} style={{margin: "2px"}}
                                                              label={str}
                                                        />
                                                    )
                                                })
                                            }
                                        </CardContent>
                                        <CardActions  style={{marginTop: "auto"}}>
                                            <Button size="small" color="primary" variant="contained" onClick={() => this.openDialog(pizza)}>
                                                Add
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grow>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>

            {/*Dialog to add pizza to a cart*/}

                <Dialog onClose={this.closeDialog} open={this.state.dialogOpen}>
                    <DialogTitle id="simple-dialog-title">{this.state.dialogPizza.name} {this.state.dialogPizza.spicy === 1 &&
                    <i className="fas fa-pepper-hot" style={{color: "red", margin: "0 4px"}}></i>
                    }
                        {this.state.dialogPizza.vegetarian === 1 &&
                        <i className="fas fa-carrot" style={{color: "green", margin: "0 4px"}}></i>
                        }</DialogTitle>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="240"
                        image={this.state.dialogPizza.imgurl}
                    />
                    <CardContent>
                        <Grid container justify="space-between" alignContent="stretch">
                            <Grid item>
                                <ToggleButtonGroup
                                    value={this.state.chosenSize}
                                    exclusive
                                    onChange={this.handlePizzaSize}
                                    aria-label="text alignment"
                                >
                                    <ToggleButton value="sm" aria-label="left aligned">
                                        Sm
                                    </ToggleButton>
                                    <ToggleButton value="md" aria-label="centered">
                                        Md
                                    </ToggleButton>
                                    <ToggleButton value="lg" aria-label="right aligned">
                                        Lg
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                            <Grid item>
                                <Grid container alignContent="center" style={{height: "100%"}}>
                                    <Typography variant="h5" color="textSecondary" component="p">
                                        {this.state.dialogPizza.cal}ccal
                                    </Typography>
                                </Grid>

                            </Grid>
                        </Grid>
                        <Typography variant="body2" color="textSecondary" component="p" style={{marginTop: "10px"}}>
                            {this.state.dialogPizza.description}
                        </Typography>
                        <Grid container justify="space-between" style={{marginTop: "20px"}}>
                            <Grid item>
                            </Grid>
                            <Grid item>
                                <Typography variant="h4" color="textSecondary" component="p">
                                    ${this.state.chosenPrice}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                        <Button size="small" color="primary" variant="contained" style={{height: "80px"}} onClick={this.addPizza}>
                            Add to order
                        </Button>
                </Dialog>
        </div>
    )};

}

export default Menu;