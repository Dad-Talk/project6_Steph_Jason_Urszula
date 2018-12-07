import React from 'react';

const Moods = props => {
    function noRepeats() {
    }

    return (
        <div>
            <button
                value={props.id}
                onClick={props.updateInventory}
                noRepeats={noRepeats()}>
                {props.id}
            </button>
        </div>
    );
};

export default Moods;