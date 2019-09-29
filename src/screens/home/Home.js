import React from 'react';
import restaurantInfoData from '../../common/RestaurantInfo'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import RestaurantCard from '../home/components/RestaurantCard';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'auto',
      backgroundColor: theme.palette.background.paper,
      transition: 'color .3s ease',
    },
    gridList: {
      width: 1000,
      height: 900,
    },
});

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state={
          restaurantData:[],
          reduceCols:0
        }
    }
    
    componentWillMount(){
        this.setState({restaurantData:restaurantInfoData});
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }
    
    
    resize() {
        let colsNumber = 0;
        if(window.innerWidth <= 600){
             colsNumber =2;
        }else if(window.innerWidth <= 900){
             colsNumber =3;
        }else{
             colsNumber =4;
        }
        this.setState({reduceCols: colsNumber});
    
    }

    openRestaurantDetails=(restaurant)=>{
        //route to the details js passing in the restaurant object
        console.log(restaurant);
    }
    render(){
        let {classes}= this.props;
        let restaurantData= this.state.restaurantData;
        return(
           
            <div className={classes.root}>
               <GridList cellHeight={400} cols={this.state.reduceCols} className={classes.gridListMain}>
                            {restaurantData.map(restaurant => (
                                <GridListTile className="restaurant-grid-item" key={"grid" + restaurant.id} onClick={() => this.openRestaurantDetails(restaurant)}>
                                    <RestaurantCard currentRestaurant={restaurant} />
                                </GridListTile>
                            ))}
               </GridList>
             </div>
        );
    }
}
export default withStyles(styles)(Home);