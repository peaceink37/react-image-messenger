// ./containers/MediaGalleryPage.jsx

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../common/Header';
import ImageFilters from '../services/imageFilters';
import { searchMediaAction, selectImageAction} from '../actions/mediaActions';
import PhotoPage from '../components/ImagePage';
import FilterStore from '../services/filterStore';
import FeaturesModal from '../components/FeaturesModal';

// MediaGalleryPage Component
class MediaGalleryPage extends Component {

    constructor(props) {
        super(props);
        this.applyImageFilter = this.applyImageFilter.bind(this);
        this.applyTextFilter = this.applyTextFilter.bind(this);
        this.filtersAppear = this.filtersAppear.bind(this);
        this.getImageFilterInstance = this.getImageFilterInstance.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelectImage = this.handleSelectImage.bind(this);
        this.saveImageToFilter = this.saveImageToFilter.bind(this);
        this.setImageFilterInstance = this.setImageFilterInstance.bind(this);
        this.setTextValues = this.setTextValues.bind(this);
        this.toggleFeaturesModal = this.toggleFeaturesModal.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.imgFilterInstance = null;
        this.filterObj = {CONTRAST:{}, BRIGHTNESS:{}, GRADIENT:{}, TEXT:{}};
        this.state = {spinState:'spinner-active', currentQueryValue:'DetroitB', dataImage:false, 
        imageData:null, filteredimage:{}, winWidth:window.innerWidth, filtersIn:false, currentNode:"DIV",
        modalOpen:false, modalType:"FEATURES"};
        
    }


    // Dispatches *searchMediaAction*  immediately after initial rendering.
    // Note that we are using the dispatch method from the store to execute this task, courtesy of react-redux
    // We are also looking at viewport size so we can adjust our responsive / adaptive hybrid
    componentDidMount() {
        this.props.dispatch(searchMediaAction(this.state.currentQueryValue));
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({winWidth:window.innerWidth});
    }

    // Dispatches *selectImageAction* when any image is clicked
    handleSelectImage(selectedImage) {
        this.props.dispatch(selectImageAction(selectedImage));
        
        console.log(" handle select image "+selectedImage);

        for(let filterType in FilterStore){
            console.log(" filter type "+filterType)
            if(FilterStore[filterType].empty === false){
                this.filterObj[filterType] = {};
                FilterStore[filterType].empty = true;
                let currentImgFilter = this.getImageFilterInstance();
                currentImgFilter.clear();
                this.setState({dataImage:false, imageData:null});
                return;    
            }
        } 
    }

    // Need to do a deep clone of given filter object before setting it 
    setCurrentFilter(obj){
        let cloneObj = JSON.parse(JSON.stringify(obj.value));
        FilterStore[obj.type].value = cloneObj;
        FilterStore[obj.type].empty = false;

    }

    saveImageToFilter() {
        let imageData = FilterStore.CANVAS.value.toDataURL('image/jpeg', 1.0);
        this.setState({imageData:imageData, dataImage:true});
    }

    setImageFilterInstance(imgFilter){
        this.imgFilterInstance = imgFilter;
    }

    getImageFilterInstance(){
        return this.imgFilterInstance;
    }

    applyTextFilter(){

        this.applyImageFilter(FilterStore["TEXT"].value);
    }

    setTextValues(textObj){
       
        FilterStore["TEXT"].empty = false;
        FilterStore["TEXT"].value = textObj;
    }

    applyImageFilter(filterObj) {
        
        let imageFilter = ImageFilters(filterObj.img, filterObj.canvas);
        this.setImageFilterInstance(imageFilter);

        let filterType = filterObj.type.toLowerCase();
        imageFilter[filterType](filterObj.value);
        this.setCurrentFilter(filterObj);
        this.saveImageToFilter();

    }

    // Dispatches *searchMediaAction* with query param.
    // We ensure action is dispatched to the store only if query param is provided.
    handleSearch(val) {
        let queryValue = val;
        if (queryValue !== null) {
            this.props.dispatch(searchMediaAction(queryValue));
            this.setState({currentQueryValue:queryValue});
        }
    }

    filtersAppear(event) {
        event.preventDefault();
        console.log(' current query value '+this.state.currentQueryValue);
        if(this.state.filtersIn === false){
            this.setState({filtersIn:true});    
        } else {
            this.setState({filtersIn:false});
        }
        
       
    }

    toggleFeaturesModal(obj){

        //this.state.modalOpen === false ? true : false;
        console.log(" toggle features modal  "+obj.modalOpen);
        
        this.setState({modalOpen:obj.modalOpen, modalType:obj.from});

    }

    render() {
        const { images, selectedImage, fModalOpen } = this.props;

            console.log(" selected image "+selectedImage);
        
            return (
                <div>
                    <FeaturesModal 
                        modalOpen={this.state.modalOpen}
                        modalType={this.state.modalType}
                        toggleFeaturesModal={this.toggleFeaturesModal}
                        applyTextFilter={this.applyTextFilter}
                    />
                    <Header 
                        searchFunction={this.handleSearch}
                        filtersAppear={this.filtersAppear}
                        toggleFeaturesModal={this.toggleFeaturesModal}
                        uploadImage={this.props.uploadImage}
                        searchActivated={false}
                    />
                    {selectedImage ? <div>
                    
                    <div>
                        <PhotoPage
                        applyImageFilter={this.applyImageFilter}
                        bubbleMachine={true}
                        currentTheme={this.state.currentQueryValue}
                        dataImage={this.state.dataImage}
                        images={images}
                        imageData={this.state.imageData}
                        setTextValues = {this.setTextValues}
                        selectedImage={selectedImage}
                        toggleFeaturesModal={this.toggleFeaturesModal}
                        winWidth={this.state.winWidth}
                        onHandleSelectImage={this.handleSelectImage}
                        filtersIn={this.state.filtersIn}
                        />
                        
                    </div>
                    </div> : <div className='spinner-active'> </div>}
                </div>
            );
        
    }
     
}

// Define PropTypes
MediaGalleryPage.propTypes={
// Define your PropTypes here
};

 // Subscribe component to redux store and merge the state into 
 // component's props
const mapStateToProps=({ images }) => ({
    images: images[0],
    selectedImage: images.selectedImage,
    
});

// connect method from react-router connects the component with redux store
export default connect(mapStateToProps, null, null, { withRef: true })(MediaGalleryPage);