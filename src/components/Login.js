import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import {default as If} from './If';
import * as jwt from 'jsonwebtoken';

class Login extends Component{
	constructor(props){
		super(props);
		 this.state={allUserData:[],wrongField:false}
		 this.signIn=this.signIn.bind(this);
		 this.nextUser=this.nextUser.bind(this);

	}
	componentDidMount(){
		var self=this
		var allUserData=self.state.allUserData
		
		axios.get('http://swapi.co/api/people/')
		  .then(function (response) {
		    for(var i=0;i<response.data.results.length;i++){
		    		var userInfo={
		    			'name':response.data.results[i].name,
			    		'birth_year':response.data.results[i].birth_year
		    		}
			    	allUserData.push(userInfo)
			    }
		    self.setState({
		    	allUserData:allUserData
		    })
		    self.nextUser(response.data.next);
		  })
		  .catch(function (error) {
		    console.log(error);
		});
	}
	nextUser(nextNameList){
		if(nextNameList!=null){
			var self=this
			var allUserData=self.state.allUserData
			axios.get(nextNameList)
			  .then(function (response) {
			    
			    for(var i=0;i<response.data.results.length;i++){
			    	var userInfo={
		    			'name':response.data.results[i].name,
			    		'birth_year':response.data.results[i].birth_year
		    		}
			    	allUserData.push(userInfo)
			    }
			    self.setState({
			    	allUserData:allUserData,
			    })
			    self.nextUser(response.data.next);
			  })
			  .catch(function (error) {
			    console.log(error);
			});
		}
	}
	signIn(){
		var self=this
		var allUserData=this.state.allUserData;
		var input={
			name:this.refs.inputEmail.value,
			birth_year:this.refs.inputPassword.value
		}
		for(var i=0;i<allUserData.length;i++){
			if(allUserData[i].name==input.name && allUserData[i].birth_year==input.birth_year ){
				let token = jwt.sign({
					name: input.name,
					exp: 60 * 60 * 24
					}, 'xebia');
				sessionStorage.setItem('loggedUser',token);
				browserHistory.push('/homepage/'+input.name)
			}
			else
			{
				self.setState({
					wrongField:true
				})
			}
		}
	}
	render(){
		var self=this
		const redReq={
			color:'red'
		}
		return(
		    <div className="container">
			    <div className="row">
			        <div className="form_bg">
		                <h2 className="text-center">Login</h2>
		                <br/>
		                <div className="form-group">
		                    <input type="text" ref="inputEmail" className="form-control" id="userid" placeholder="User Name"  />
		                </div>
		                <div className="form-group">
		                    <input type="password" ref="inputPassword" className="form-control" id="pwd" placeholder="Password"  />
		                </div>
		                <If test={self.state.wrongField}>
		                	<div style={redReq}> * Username or password doesn't match</div>
		                </If>
	
		                <br/>
		                <br/>
		                <div className="align-center">
		                    <button type="submit" className="btn btn-default" id="login" onClick={this.signIn}>Login</button>
		                </div>  
			        </div>
			    </div>
			</div>
		);
	}
}
export default Login;
