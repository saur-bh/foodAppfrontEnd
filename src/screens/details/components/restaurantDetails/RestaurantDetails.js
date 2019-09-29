import React from 'react';
import Typography from '@material-ui/core/Typography';
import './RestaurantDetails.css';
import Icon from '@material-ui/core/Icon';


class RestaurantDetails extends React.Component{

    constructor(){
        super();
        this.state={
            restaurantDetails:{}
        }
    }

    componentWillMount(){
        this.setState({restaurantDetails:this.props.restaurantDetails});
    }
    render(){

        let restaurantDetails = this.state.restaurantDetails;
        console.log(restaurantDetails);
        return(
            <div className="details">

            <div className="flex-containerDetails">
                <div className="leftDetails">
                    <img className="restaurantImage" src={restaurantDetails.photo_URL} alt={restaurantDetails.restauant_name} />
                </div>
                <div className="rightDetails">
                    <div>
                        <Typography variant="h5" component="h5">{restaurantDetails.restaurant_name} </Typography>
                    </div>
                    <div>
                        <Typography variant="h5" component="h5">{restaurantDetails.address.locality} </Typography>
                    </div>
                    <div>
                        <Typography variant="h6" component="h6">{restaurantDetails.categories} </Typography>
                    </div>
                    <br />
                    <div className="flex-countsContainer">                     
                        <div className="countElements"><Typography><span className="bold"><i className="fa fa-star" aria-hidden="true"></i>
{restaurantDetails.customer_rating}</span><br/>
                        <span className="subHeaders">AVERAGE RATING BY<br/>
                         {restaurantDetails.number_customers_rated} CUSTOMERS</span></Typography></div> 

                         <div className="countElements"><Typography><span className="bold">&#8377;&nbsp;{restaurantDetails.average_price}</span><br/>
                         <span className="subHeaders">AVERAGE COST FOR <br/>
                         TWO PEOPLE </span></Typography></div>    
                    </div>
                    <br/>
       
                </div>

            </div>
            </div>
        )
    }
}
export default RestaurantDetails;