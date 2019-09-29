// imports
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import MyCartComponent from "./components/myCartComponent/MyCartComponent";
import RestaurantDetails2 from "./components/restaurantDetails/RestaurantDetails2";
import Header from "../../common/header/Header";
import "./Details.css";
import CategoryGridList2 from "./components/categoryGridList/CategoryGridList2";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import PlaceOrderCard from "../checkout/components/PlaceOrderCard/PlaceOrderCard";

// component
class Details2 extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    restaurantDetails: {},
    addressDetails: {},
    categories: [],
    categoriesArr: [],
    finalCategoryList: [],
    itemCountOnCart: 0,
    itemCartList: [],
    restaurantId: "",
    restaurantName: "",
    totalPrice: null
  };

  getItemData = async () => {
    console.log(this.props.location.state.reastaurantId);
    const apiString = this.props.location.state.reastaurantId;
    const api_call_general = await fetch(
      "http://localhost:8080/api/restaurant/" + apiString
    );

    const restaurantIdData = await api_call_general.json();

    console.log(restaurantIdData);

    const categoryItemList = [];

    restaurantIdData.categories.forEach(element => {
      element.item_list.forEach(item => {
        categoryItemList.push([
          element.category_name,
          item.item_name,
          item.id,
          item.price,
          item.item_type
        ]);
      });
    });

    this.setState({
      categoriesArr: categoryItemList
    });

    console.log(this.state.categoriesArr);
  };

  getData = async () => {
    const apiString = this.props.location.state.reastaurantId;
    const api_call_general = await fetch(
      "http://localhost:8080/api/restaurant/" + apiString
    );

    const restaurantIdData = await api_call_general.json();

    console.log(restaurantIdData);

    const categoryList = [];
    const categoryList2 = [];

    console.log(restaurantIdData.categories);

    let j = 0;
    restaurantIdData.categories.forEach(element => {
      if (j === restaurantIdData.categories.length - 1) {
        categoryList.push(element.category_name);
      } else {
        categoryList.push(element.category_name + ", ");
        j++;
      }
      categoryList2.push([element.category_name, element.id]);
    });

    this.setState({
      restaurantDetails: restaurantIdData,
      addressDetails: restaurantIdData.address,
      categories: categoryList,
      restaurantName: restaurantIdData.restaurant_name,
      restaurantId: restaurantIdData.id
    });
    console.log(this.state.restaurantDetails);
    console.log(this.state.restaurantName);
    console.log(this.state.categoriesArr);
  };

  getTotal = value => {
    this.setState({
      totalPrice: value
    });
    console.log(this.state.totalPrice);
  };

  addItem = item => {
    //first click isnt getting registered
    console.log(item);
    // let itemCountOnCartUpdate = 1;
    // this.setState({ itemCountOnCart: itemCountOnCartUpdate });
    let currentItemList = this.state.itemCartList;
    currentItemList.push([item, 1]);
    if (item) {
      this.setState({
        itemCartList: currentItemList
      });
    }
    console.log(this.state.itemCountOnCart);
    console.log(this.state.itemCartList);
  };

  componentWillMount() {
    this.getData();
    this.getItemData();
  }

  render() {
    return (
      <div>
        <Card
          elevation={0}
          style={{
            backgroundColor: "#e6e6e6",
            minHeight: "100%",
            paddingBottom: "18%"
          }}
        >
          <CardContent>
            <div
              style={{
                position: "absolute",
                width: "100%",
                backgroundColor: "#e6e6e6"
              }}
            >
              <RestaurantDetails2
                details={this.state.restaurantDetails}
                address={this.state.addressDetails}
                categories={this.state.categories}
              />
            </div>
          </CardContent>
        </Card>
        <div className="flex-categoryCartContainer">
          <div className="categoryContainer" />
          <CategoryGridList2
            details={this.state.restaurantDetails}
            categories={this.state.categories}
            items={this.state.categoriesArr}
            addItem={this.addItem.bind(this)}
          />
        </div>
        <div className="cartContainer">
          <Link
            to={{
              pathname: "/checkout",
              state: {
                cart: this.state.itemCartList,
                restaurant: this.state.restaurantName,
                restaurantId: this.state.restaurantId,
                totalPrice: this.state.totalPrice
              }
            }}
            style={{ textDecoration: "none" }}
          >
            <MyCartComponent
              addItem={this.addItem.bind(this)}
              items={this.state.itemCartList}
              getTotal={this.getTotal.bind(this)}
            />
          </Link>
        </div>
      </div>
    );
  }
}

// export
export default withRouter(Details2);
