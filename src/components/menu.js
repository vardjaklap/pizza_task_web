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
import Slide from "@material-ui/core/Slide";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";


class Menu extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            pizzas: [
                {
                    id: 0,
                    name: "Margherita",
                    desc: "Cheese. Mozarella.",
                    veg: true,
                    spicy: false,
                    sm: 10.99,
                    md: 14.99,
                    lg: 17.99,
                    img: "https://media.dominos.ua/menu/product_osg_image_category/2019/10/04/%D0%9C%D0%B0%D1%80%D0%B3%D0%B0%D1%80%D0%B8%D1%82%D0%B0_300dpi-min.jpg"
                },
                {
                    id: 1,
                    name: "Texas",
                    desc: "Corn, Onion, Mushrooms, Bavarian sausages, Mozarella, BBQ sauce",
                    veg: true,
                    spicy: true,
                    sm: 10.99,
                    md: 14.99,
                    lg: 17.99,
                    img: "https://media.dominos.ua/menu/product_osg_image_category/2019/10/03/%D0%A2%D0%B5%D1%85%D0%B0%D1%81_300dpi-min.jpg"
                },
                {
                    id: 2,
                    name: "Pepperoni",
                    desc: "Mozarella, Peperoni, Tomatoes, BBQ sauce",
                    veg: false,
                    spicy: false,
                    sm: 10.99,
                    md: 14.99,
                    lg: 17.99,
                    img: "https://media.dominos.ua/menu/product_osg_image_mobile/2018/02/28/%D0%9F%D0%B5%D0%BF%D0%BF%D0%B5%D1%80%D0%BE%D0%BD%D0%B8_%D0%B8_%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D1%8B_300dpi.jpg"
                }
            ],
            dialogPizza: {
                id: 1,
                name: "Texas",
                desc: "Corn, Onion, Mushrooms, Bavarian sausages, Mozarella, BBQ sauce",
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
    }
    openDialog(pizza){
        this.setState({
            dialogOpen: true,
            dialogPizza: pizza,
            chosenPrice: pizza.sm
        })
    }
    closeDialog(){
        this.setState({
            dialogOpen: false
        })
    }
    handlePizzaSize(event, newSize){
        let price = 0;
        if(newSize == "sm"){
            price = this.state.dialogPizza.sm;
        }else if(newSize == "md"){
            price = this.state.dialogPizza.md;
        }else if(newSize == "lg"){
            price = this.state.dialogPizza.lg;
        }
        this.setState({
            chosenSize: newSize,
            chosenPrice: price
        })
    }
    render() {
    return (
        <div>
            <Container style={{marginTop: "25px"}}>
                <Grid container
                      justify="center"
                      alignItems="stretch"
                      spacing={3}>
                    {this.state.pizzas.map((pizza) => {
                        return(
                            <Grid item xs={12} sm={6} md={3} key={pizza.id}>
                                <Card style={{height: "100%", display: "flex",flexDirection: "column"}}>
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="140"
                                        image={pizza.img}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {pizza.name}
                                            {pizza.spicy === true &&
                                            <i className="fas fa-pepper-hot" style={{color: "red", margin: "0 4px"}}></i>
                                            }
                                            {pizza.veg === true &&
                                            <i className="fas fa-carrot" style={{color: "green", margin: "0 4px"}}></i>
                                            }
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {pizza.desc}
                                        </Typography>
                                    </CardContent>
                                    <CardActions  style={{marginTop: "auto"}}>
                                        <Button size="small" color="primary" variant="contained" onClick={() => this.openDialog(pizza)}>
                                            Add
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
                <Dialog onClose={this.closeDialog} open={this.state.dialogOpen}>
                    <DialogTitle id="simple-dialog-title">{this.state.dialogPizza.name} {this.state.dialogPizza.spicy === true &&
                    <i className="fas fa-pepper-hot" style={{color: "red", margin: "0 4px"}}></i>
                    }
                        {this.state.dialogPizza.veg === true &&
                        <i className="fas fa-carrot" style={{color: "green", margin: "0 4px"}}></i>
                        }</DialogTitle>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="240"
                        image={this.state.dialogPizza.img}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.state.dialogPizza.desc}
                        </Typography>
                        <Grid container justify="space-between" style={{marginTop: "20px"}}>
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
                                <Typography variant="h4" color="textSecondary" component="p">
                                    ${this.state.chosenPrice}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                        <Button size="small" color="primary" variant="contained" style={{height: "80px"}}>
                            Add to order
                        </Button>
                </Dialog>
        </div>
    )};

}

export default Menu;