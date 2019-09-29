import React from 'react';
import RestaurantDetails from './components/restaurantDetails/RestaurantDetails';
import restaurantDetailsData from '../../common/RestaurantData';
import restaurantData from '../../common/RestaurantIdData';
import CategoryGridList from "./components/categoryGridList/CategoryGridList"
import MyCartComponent from './components/myCartComponent/MyCartComponent';
import "./Details.css";
class Details extends React.Component{
//get the clicked restaurant object from Home.js in props
    constructor(){
        super();
       
        this.addItem= this.addItem.bind(this);
        this.state={
            restaurantDetails:{},
            restaurantIdDetails:{},
            totalAmount:0,
            totalCount:0,
            itemCountOnCart:{}
        }
    }
    componentWillMount(){
        this.getRestaurantIdData()
    }
    //from the restaurant object get the id to fetch Restaurant object with category list
     // use this url for home.js

    getRestaurantIdData = async () => {
        const api_call_general= await fetch(
            'http://localhost:8080/api/restaurant/'//+{restaurantId}
            );
        const restaurantIdData = await api_call_general.json();
        if(restaurantIdData){
            this.setState({restaurantIdDetails:restaurantData});
            
        }
    }

    addItem(item){

        //first click isnt getting registered
        console.log(item);
        let itemCountOnCart={...this.state.itemCountOnCart}
        itemCountOnCart[item.id]=itemCountOnCart[item.id] + 1 || 1;
        this.setState({itemCountOnCart:itemCountOnCart});
        console.log(this.state.itemCountOnCart);
    }
    
    render(){
        return(
            <div>
                <RestaurantDetails restaurantDetails={this.state.restaurantDetails}/>
                <div className="flex-categoryCartContainer">
                   <div className="categoryContainer" > <CategoryGridList addItem={this.addItem} restaurantIdDetails={this.state.restaurantIdDetails}/></div>
                   <div className="cartContainer"><MyCartComponent addItem={this.addItem} itemCountOnCart={this.state.itemCountOnCart}/></div>
                </div>
            
            </div>
        );
    }
}
export default Details;