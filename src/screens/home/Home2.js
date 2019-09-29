// imports
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import RestaurantCard from "../home/components/RestaurantCard";
import Header from "../../common/header/Header";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    transition: "color .3s ease"
  },
  gridList: {
    width: 1000,
    height: 900
  }
});

// class
class Home2 extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    restaurantData: [],
    reduceCols: 0
  };

  getData = async () => {
    const api_call_general = await fetch(
      "http://localhost:8080/api/restaurant"
    );

    const restaurantIdData = await api_call_general.json();

    const restaurantsArray = [];

    restaurantIdData.restaurants.forEach(element => {
      restaurantsArray.push(element);
    });

    console.log(restaurantsArray);

    if (restaurantIdData) {
      this.setState({
        restaurantData: restaurantsArray
      });
    }

    console.log(this.state.restaurantData);
  };

  openRestaurantDetails = restaurant => {
    //route to the details js passing in the restaurant object
  };

  componentWillMount() {
    this.getData();
    console.log(this.state.restaurantData);
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    let colsNumber = 0;
    if (window.innerWidth <= 600) {
      colsNumber = 2;
    } else if (window.innerWidth <= 900) {
      colsNumber = 3;
    } else {
      colsNumber = 4;
    }
    this.setState({ reduceCols: colsNumber });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.root}>
          <GridList
            cellHeight={400}
            cols={this.state.reduceCols}
            className={classes.gridListMain}
          >
            {this.state.restaurantData.map(restaurant => (
              <GridListTile
                className="restaurant-grid-item"
                key={"grid" + restaurant.id}
                onClick={() => this.openRestaurantDetails(restaurant)}
              >
                <Link
                  to={{
                    pathname: "/details",
                    state: { reastaurantId: restaurant.id }
                  }}
                  style={{ textDecoration: "none", marginRight: "1%" }}
                >
                  <RestaurantCard currentRestaurant={restaurant} />
                </Link>
              </GridListTile>
            ))}
            */}
          </GridList>
        </div>
      </div>
    );
  }
}

// exports
export default withStyles(styles)(Home2);
