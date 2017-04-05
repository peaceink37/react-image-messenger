// ./src/common/Header.jsx

import React, { PropTypes, Component } from 'react';
//import {Link, IndexLink} from 'react-router';

class Header extends Component {

    constructor(props){
        super(props);
        this.featuresModal = this.featuresModal.bind(this);
        this.initiateSearch = this.initiateSearch.bind(this);
        this.getUploadBtn = this.getUploadBtn.bind(this);
        this.getFiltersBtn = this.getFiltersBtn.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.state = {searchValue:""};
    }

    updateInputValue(evt){
        
        if(evt.key === "Enter"){
            this.initiateSearch();
            evt.target.value = "";
        } 
        this.setState({searchValue: evt.target.value});    
   }

    featuresModal(){
        let obj = {
            from:"FEATURES",
            to:"FEATURES",
            modalOpen:true
        }
        this.props.toggleFeaturesModal(obj)
    }

    getUploadBtn(){

        return  <div className="upload-btn">    
                    <button
                        type="submit"
                        className="k-btn"
                        onClick={this.props.uploadImageState}
                        ><i className="fa fa-upload" aria-hidden="true"></i>
                    </button>
                </div>
    }

    getFiltersBtn(){

        return  <button
                    type="submit"
                    className="btn load-more"
                    onClick={this.props.filtersAppear}
                 ><i className="fa fa-filter" aria-hidden="true"></i></button>

    }

    initiateSearch(event){

        if(typeof event !== 'undefined'){
            event.preventDefault();
        }
        this.props.searchFunction(this.state.searchValue);
        this.setState({searchValue:""})
    }



    render(){
        const searchVal = this.props.searchActivated;

        let searchField = null;
        if(searchVal){
            searchField = <div className="image-theme">
                            <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={this.initiateSearch}
                            ><i className="fa fa-search"></i></button>
                            <input
                                type="text"
                                id="searchinput"
                                onKeyUp={this.updateInputValue}
                                placeholder="Enter Search Query"
                            />
                        </div>
        } else {
            searchField = <div className="question-popover" onClick={this.featuresModal}>
                            <i className="fa fa-question" aria-hidden="true"></i>
                        </div>
        }

        let uploadBtn = this.getUploadBtn();
        let filtersBtn = this.getFiltersBtn();

        return(
            <div id="k-header" className="text-center">
                <nav className="navbar navbar-default">
                    <img className="logo" src="./images/kbyte-logo-small.png" />
                        {uploadBtn}
                        {searchField}
                        {filtersBtn}
                </nav>
            </div>

        )
       
    }
    
};

export default Header;