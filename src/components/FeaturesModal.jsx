import React, {Component} from 'react';
import { Modal, ModalHeader, ModalTitle, ModalClose,
        ModalBody, ModalFooter } from 'react-modal-bootstrap';


class FeaturesModal extends Component {

    constructor(props){
        super(props);
        this.applyTextToImage = this.applyTextToImage.bind(this);
        this.openModal = this.openModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.state = {isOpen: false};
    }


    componentDidMount(){
        console.log(" this props modal type "+this.props.modalType+"  modal open ?  "+this.props.modalOpen);
    }

   
    openModal = () => {
        this.setState({
            isOpen: true
        });
        
    };
 
    hideModal = () => {
        let obj = {
            from:"FEATURES",
            to:"FEATURES",
            modalOpen:false
        }

        this.props.toggleFeaturesModal(obj);
        this.setState({
            isOpen: false
        });
    };

    applyTextToImage(){
        this.props.applyTextFilter();
        this.hideModal();
    }

  
    render(){

      
        const backdropStyles = {
            base: {
                background: 'rgba(3, 45, 57, .7)',
                opacity: 0,
                visibility: 'hidden',
                transition: 'all 0.4s',
                overflowX: 'hidden',
                overflowY: 'auto'
            },
            open: {
                opacity: 1,
                visibility: 'visible'
            }
        };
     
        const dialogStyles = {
            base: {
            top: -600,
            transition: 'top 0.4s'
          },
            open: {
                top: 0
          }
        };

        let fModal = null;
        if(this.props.modalType === "FEATURES"){
            fModal = <Modal isOpen={this.props.modalOpen} onRequestHide={this.hideModal}>
                        <ModalHeader>
                            <ModalClose onClick={this.hideModal}/>
                            <ModalTitle>Upcoming Features</ModalTitle>
                        </ModalHeader>
                            <ModalBody>
                                <h6>Image Loading : <span>Early April</span></h6>
                                <h6>SSL and User Management : <span>Later in April</span></h6>
                                <h6>Camera Capture and Processing : <span>Early May</span></h6>
                               <h6>Theme and User-Centric Galleries : <span>Later in May</span></h6>
                          </ModalBody>
                       </Modal>
        } else {

            fModal = <Modal isOpen={this.props.modalOpen} onRequestHide={this.hideModal}>
                        <ModalHeader>
                            <ModalClose onClick={this.hideModal}/>
                            <ModalTitle>Apply Text To Image?</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <button 
                                    className="k-btn k-btn-default k-btn-left"
                                    onClick={this.applyTextToImage}
                                >
                                <span className="camera-icon"><i className="fa fa-thumbs-up" aria-hidden="true"></i></span>
                            </button>
                            <button 
                                    className="k-btn k-btn-default k-btn-right"
                                    onClick={this.hideModal}
                                >
                                <span className="camera-icon"><i className="fa fa-thumbs-down" aria-hidden="true"></i></span>
                            </button>
                        </ModalBody>
              
            </Modal>

        }

        return (
            <div>
                {fModal}
            </div>

            )
    }

};

export default FeaturesModal
