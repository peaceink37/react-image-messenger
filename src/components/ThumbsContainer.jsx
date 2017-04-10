// ./medialibrary/src/components/ThumbsContainer.jsx

import React, { Component } from 'react';
import ImageSlider from 'react-slick';


class ThumbsContainer extends Component {


    render(){

        const settings = {
            arrows:true,
            dots: false,
            infinite: true,
            nextArrow:<button className="thumbs-arrow"><i className="fa fa-chevron-right" aria-hidden="true"></i></button>,
            prevArrow:<button className="thumbs-arrow"><i className="fa fa-chevron-left" aria-hidden="true"></i></button>, 
            speed: 500,
            slidesToShow: 10,
            slidesToScroll: 8,
            responsive:[
                {
                breakpoint: 1024,
                    settings: {
                        slidesToShow: 8,
                        slidesToScroll: 7,
                        infinite: true
                    
                    }
                },
                {
                breakpoint: 780,
                    settings: {
                        slidesToShow: 7,
                        slidesToScroll: 6,
                        infinite: true
                    }
                },
                {
                breakpoint: 640,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 5,
                        infinite: true
                    }
                },
                {
                breakpoint: 420,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true
                    }
                }

                ]
            
        };

        return (

                <div className="thumb-gallery-container">
                    <ImageSlider className="thumb-gallery" {...settings}>
                        {this.props.thumbimages.map((image, i) => (
                        
                        <div className="image-thumbnail" key={i} onClick={this.props.onHandleSelectedImage.bind(this, image)}>
                            <img src={image.mediaUrl} alt={image.title} />
                        </div>
                        
                        ))}
                        
                    </ImageSlider>
                    <div className="thumb-gallery-endcap left-endcap"></div>
                    <div className="thumb-gallery-endcap right-endcap"></div>
                </div>


            )


    }
}

export default ThumbsContainer;