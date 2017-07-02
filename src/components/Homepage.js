import React, { Component } from 'react';
import axios from 'axios';
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import {default as If} from './If';
class Homepage extends Component{
	constructor(props){
		super(props);
		this.state={
		 	allPlanets:[],
		 	searchValue:'',
		 	show:false,
		 	userName:props.params.username,
		 	planetContent:[],
		 	nextApiCall:'',
		 	counter:0,
		 	IsSearch:true
		}
		this.input = this.input.bind(this);
		this.callSearch = this.callSearch.bind(this);
		this.seeMore = this.seeMore.bind(this);
		this.addPlanets = this.addPlanets.bind(this); 
		// this.userSearchRecord = this.userSearchRecord.bind(this); 
		
	}
	componentDidMount(){
		var self=this
		// self.userSearchRecord()
		setTimeout(function(){
	          // console.log(counter)
	          // if(userName !='Luke Skywalker' && counter > 15) {
	          //   		self.setState({
	          //   			IsSearch:false
	          //   		})
	          // }
			console.log("time up")
	     
	          
	    },5000)
		
	}
	// userSearchRecord(){
	// 	var self=this;
	// 	var userName=self.state.userName;
	// 	var counter=self.state.counter
	// 	setTimeout(function(){
	//           console.log(counter)
	//           if(userName !='Luke Skywalker' && counter > 15) {
	//             		self.setState({
	//             			IsSearch:false
	//             		})
	//           }

	//           console.log("time up")
	//       },10000)
	// }
	input(e){
      let self=this
      let searchValue=this.refs.searchInput.value;
      
      if(searchValue ==''){
      	this.setState({
        	show:false,
        	searchValue:searchValue,
        	allPlanets:[]
      	})
      }
      else{
      	this.setState({
        	show:true,
        	searchValue:searchValue,
        	allPlanets:[]
      	},function(){
      		this.callSearch(self.state.searchValue,self.state.allPlanets)
      	})
      }
      
    }
	callSearch(searchValue,allPlanets){
		var self=this
		axios.get('http://swapi.co/api/planets/?search='+searchValue)
		  	.then(function (response) {
			    // console.log("start",response)
			    for(let i=0;i<response.data.results.length;i++){
			    	var planetInfo={
		    			'name':response.data.results[i].name,
			    		'population':response.data.results[i].population
		    		}
		    		allPlanets.push(planetInfo)
			    }
		    	
		    	self.setState({
		    		allPlanets:allPlanets,
		    		nextApiCall:response.data.next
		    	})
		  	})
		  	.catch(function (error) {
	 	    	console.log(error);
			});
	}
	seeMore(){
		var self=this;
		var nextApiCall=self.state.nextApiCall
		if(nextApiCall!=null){
			
			var allPlanets=self.state.allPlanets
			axios.get(nextApiCall)
			  .then(function (response) {
			    for(let i=0;i<response.data.results.length;i++){
			    	var planetInfo={
		    			'name':response.data.results[i].name,
			    		'population':response.data.results[i].population
		    		}
			    	allPlanets.push(planetInfo)
			    }
			    self.setState({
			    	allPlanets:allPlanets,
			    	nextApiCall:response.data.next
			    },function(){
			    	self.seeMore();
			    }) 
			  })
			  .catch(function (error) {
			    console.log(error);
			});
		}
	}

	addPlanets(item){
		console.log("call func")
		var self=this
		var counter=this.state.counter;
		counter +=1;
		// console.log(counter)

		var planetContent=this.state.planetContent
		// console.log("query",self.state.IsSearch)
		if(this.state.IsSearch==true){
			planetContent.push(item)
		}
		
		this.setState({
			planetContent:planetContent,
			counter:counter
		})
	}
	render(){
		var self=this
		// console.log("render",self.state.IsSearch)
		// console.log("render",self.state.counter)
		var allPlanets=JSON.parse(JSON.stringify(self.state.allPlanets))
		
		const Planets=self.state.planetContent.map(function(item,i){                 
            return( 
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.population}</td>
              </tr>
            )
          })
        const searchRes=allPlanets.map(function(item,i){                 
            return( 
              <div className="searchResultLabel" onClick={self.addPlanets.bind(this,item)} key={i}>{item.name}</div>
            )
         })
        
		return(
			<div className="searchResultsData">
				<h2 className="text-center">Hi {this.state.userName}</h2>
		        <br/>
		        <div className="searchBoxLabel">
					<input className="searchBox" ref="searchInput" type="text" placeholder="Search planets" onChange={this.input} />
					<span className="searchIcon">
					    <Glyphicon glyph="search"/>
					 </span>
				 </div>
				<If test={self.state.show}>
 					<div className="searchResultContainer">
	 					<div >{searchRes}</div>
	 					<If test={self.state.nextApiCall != null}>
		                	<div className="searchResultLabelEnd" onClick={self.seeMore}>See All Results for {self.state.searchValue}</div>
		                </If>
		                <If test={self.state.nextApiCall == null}>
		                	<div className="searchResultLabelEnd">That's All Folks</div>
		                </If>	
 					</div>
	 			</If>		
				 <br/> 
				<table className="table">
		            <thead>
		              <tr>
		                <th>Planet Name</th>
		                <th>Population</th>
		              </tr>
		            </thead>
		            <tbody>
	               		{Planets} 
		            </tbody>  
		        </table> 
			</div>
		);
	}
}
export default Homepage;
