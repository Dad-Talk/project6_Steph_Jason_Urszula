import React from 'react';
import "./App.css";
import thumbsUp from '../src/assets/thumbs-up.svg'
// import Likes from './Likes'

const Submission = props => {
    // function imageRandom(array) {
    // return array[Math.floor(Math.random() * (array.length))];
    // }
    return (
        <div>
            { // Object.entries returns us an array so we can use map

                Object.entries(props.submitted).map((card) => {
                    return <div key={card}>
                        <div className="submission-card">
                          <div key={card[0]}>
                              <img className="submission-card__img" src={card[1].image} alt="picture of        typical dad" />
                              <p className="submission-card__mood">
                                {card[1].mood}
                              </p>
                              <div className="content-container clearfix">
                              <h2 className="submission-card__title dont-break-out">
                                {card[1].title}
                              </h2>
                              <p className="submission-card__desc dont-break-out">
                                {card[1].description}
                              </p>
                              <div className="likes-container clearfix">
                                {/* Ternary operator that chcks to see if user is logged in, and disables "like" button if they are logged out */}
                                {props.user ? <button className="submission-card__btn" onClick={props.updateLikes} value={card[0]}>
                                    <img src={thumbsUp} className="thumb-img" width="25" height="25"/>
                                  </button> 
                                  : 
                                  <button className="submission-card__btn" onClick={props.updateLikes} value={card[0]} disabled>
                                    <img src={thumbsUp} className="thumb-img" width="25" height="25" />
                                  </button>}
                                <p className="submission-card__likes">
                                  {card[1].likes}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>;
                })
            }
        </div>
    );
};

export default Submission;