import React from 'react';
import dadPhotos from './dadPhotos'

const Submission = props => {
    function imageRandom(array) {
    return array[Math.floor(Math.random() * (array.length))];
    }

    return (
        <div>
            { // Object.entries returns us an array so we can use map

                Object.entries(props.submitted).map((card) => {
                    return (
                        <div key={card[0]}>
                            <img src={imageRandom(dadPhotos)} alt="picture of typical dad" />
                            <h2>{card[1].title}</h2>
                            <p>{card[1].description}</p>
                            
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Submission;