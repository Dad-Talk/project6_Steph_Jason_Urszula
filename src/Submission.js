import React from 'react';
import dadPhotos from './dadPhotos'
import "./App.css";
import thumbsUp from '../src/assets/like.png'
// import Likes from './Likes'

const Submission = props => {
    // function imageRandom(array) {
    // return array[Math.floor(Math.random() * (array.length))];
    // }
    console.log('props', props);
    return (
        <div>
            { // Object.entries returns us an array so we can use map

                Object.entries(props.submitted).map((card) => {
                    return (
                        <div className="wrapper">
                            <div className="submission-card">
                                <div key={card[0]}>
                                <img className="submission-card__img" src={card[1].image} alt="picture of typical dad" />
                                    <div className="content-container clearfix">
                                        <h2 className="submission-card__title">{card[1].title}</h2>
                                        <p className="submission-card__desc">{card[1].description}</p>
                                        <div className="likes-container clearfix">
                                            <button className="submission-card__btn" onClick={props.updateLikes} value={card[0]}><img src={thumbsUp} width="25" height="25" /></button>
                                            <p className="submission-card__likes">{card[1].likes}</p>
                                            <p className="submission-card__mood">{card[1].mood}</p>
                                        </div> 
                                    </div>    
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Submission;