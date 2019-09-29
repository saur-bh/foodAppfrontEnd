import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './MyCartComponent.css';


const styles = {
    card: {
      minWidth: 300
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)"
    },
    title: {
      fontSize: 16
    },
    pos: {
      marginBottom: 12
    }
  };

class MyCartComponent extends React.Component{
  
  constructor(){
    super();
    this.getTotalAmount= this.getTotalAmount.bind(this);
    this.getTotalCount=this.getTotalCount.bind(this);
    this.state={
      totalCount:0,
      totalAmount:0,
      itemsOnCart:{},
      itemCountOnCart:{}
    }
  }
  componentWillMount(){
    this.setState({
         itemsOnCart:this.props.itemsOnCart,
         itemCountOnCart:this.props.itemCountOnCart
    })
  }
  getTotalCount=()=>{
    let itemCountOnCart=this.state.itemCountOnCart;
    
   let totalCount= Object.keys(itemCountOnCart).reduce((prevTotal,key)=>{
      return prevTotal+itemCountOnCart[key];
    },0)
    
    if(totalCount!=="undefined"){
      this.setState({totalCount:totalCount})
      return totalCount;
    }
    else{
      return this.state.totalCount;
    }
  }

  getTotalAmount=()=>{
    let itemCountOnCart=this.state.itemCountOnCart;
    let itemsOnCart=this.state.itemsOnCart;
   
      let totalAmount=Object.keys(itemsOnCart).reduce((prevTotal,key)=>{
        let itemCount = itemCountOnCart[key];
        return prevTotal+(itemCount*itemsOnCart[key].price);
      },0)
      if(totalAmount!=="undefined"){
        this.setState({totalAmount:totalAmount})
        return totalAmount;
      }
      else{
        return this.state.totalAmount;
      }
      
    
   
  }
 render(){
            const { classes } = this.props;
            
                return (
                  <Card className={classes.card}>
                    <CardContent>
                        <div className="flex-cartHeaderContainer">
                           
                           <span style={{fontWeight: "bold"}}> 
                               <IconButton aria-label="Cart">
                               <Badge badgeContent={this.state.totalCount} showZero color="primary" classes={{ badge: classes.badge }}>
                                 <ShoppingCartIcon />
                               </Badge>
                               </IconButton>My Cart
                            </span>
                            
                      
                      </div>
                      <div>
                        <ul>
                            

                        </ul>
                       

                      </div>
                      <Divider style={{ marginTop: "20px" }} />
                      <Typography className={classes.title} style={{ marginTop: "20px" }}>
                       <span style={{paddingLeft:"10px", marginRight: "380px",textAlign:"left" }}>Total Amount</span>{" "}
                       <span style={{ textAlign:"right" }}><i className="fa fa-inr" aria-hidden="true"></i>{this.state.totalAmount}</span>
                      </Typography>
                      
                    </CardContent>
                </Card>
                );
              }
         }
export default withStyles(styles)(MyCartComponent);