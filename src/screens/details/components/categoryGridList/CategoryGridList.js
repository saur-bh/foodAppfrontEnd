import React,{Component, Fragment} from 'react';
import "./CategoryGridList.css"
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';


class CategoryGridList extends Component{

     constructor(props){
         super(props);
         this.state={
          categoryData:[],
          itemData:[],
          
          
        }
    }

    
    componentWillMount(){
        this.setState({categoryData:this.props.restaurantIdDetails.categories,
        itemData:this.props.restaurantIdDetails.categories.item_list,
        
        });
        
    }
  
  


   render(){ 
    
    let categoryData= this.state.categoryData;
    
       return(
        <div>
            {categoryData.map(category => (
                <Fragment key={category.id}>
                 <Typography
                    variant="subtitle2"
                    style={{ textTransform: 'uppercase',paddingLeft:'15px' }}>
                    {category.category_name}
                </Typography>
                <hr style={{color:'#F1F1F1',paddingLeft:'15px',paddingRight:'15px'}}/>
                <ul style={{listStyle: "none"}}>
                {category.item_list.map(item=>(
                 <li key={item.id}>
                    <div className="flex-itemDetailsContainer">
                      <div className="flex-itemDetails">{item.item_type==="VEG"?<i className="fa fa-circle column" aria-hidden="true" style={{fontSize:"20px",color:"#7DC280"}}></i>
                      :<i className="fa fa-circle column" aria-hidden="true" style={{fontSize:"20px",color:"#BB3A3F"}}></i>}</div>
                      <div className="flex-itemDetails"><span >{item.item_name}</span></div>
                      <div className="flex-itemDetails"><span><i className="fa fa-inr" aria-hidden="true"></i>{item.price}</span></div>
                       
                      <div className="flex-itemDetails"><IconButton className="column"  aria-label="Add" onClick={()=> this.props.addItem(item)}>
                      <AddIcon />
                      </IconButton></div>
                    </div>
                </li> 
                 
                ))}
                </ul>
               </Fragment>
          ))}
       
       </div>

    );

   }

}
export default CategoryGridList;