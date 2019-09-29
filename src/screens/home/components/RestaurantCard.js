import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import "./RestaurantCard.css";

import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        maxWidth: 345,
        margin:20,
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
};

function RestaurantCard(props) {
    const { classes } = props;
    let restaurant = props.currentRestaurant;
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={restaurant.restaurant_name}
                    className={classes.media}
                    height="140"
                    image={restaurant.photo_URL}
                    title={restaurant.restaurant_name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {restaurant.restaurant_name}
                    </Typography>
                    <div className="flex-categoryRatingContainer"></div>
                    <div className="categoryContainer"><Typography component="p">
                        {restaurant.categories}
                    </Typography></div>
                    <div className="ratingPriceContainer"> 
                        <div className="flex-ratingPriceContainer">
                            <div className="ratingsContainer"><Typography component="p">
                               <i className="fa fa-star" aria-hidden="true" style={{ color: "#FFFFFF" }}></i>&nbsp;
                               <span className="ratingValues">{restaurant.customer_rating}({restaurant.number_customers_rated})</span>
                               </Typography>
                            </div>
                            <div className="priceContainer"><Typography component="p">
                               <i className="fa fa-inr" aria-hidden="true"></i>
                               {restaurant.average_price} for two
                               </Typography>
                            </div>
                        </div>
                    </div>

                </CardContent>
            </CardActionArea>
        </Card>
    );
}

RestaurantCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RestaurantCard);