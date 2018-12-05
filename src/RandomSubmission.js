import React from 'react';

const RandomSubmission = props => {
    function isDisabled() {
        if (props.inventory === 0) {
            return true;
        }
        return false;
    }

    return (
        <div>

            <h2>{props.title}</h2>
            <p>{props.inventory}</p>
            <button
                value={props.id}
                onClick={props.updateInventory}
                disabled={isDisabled()}>
                Buy a Donut
            </button>
        </div>
    );
};

export default RandomSubmission;