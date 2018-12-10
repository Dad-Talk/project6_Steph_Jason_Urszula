import React, { Component, Fragment } from 'react';

class SubmissionsForm extends Component {
    render() {
        return ( <Fragment>
            <form onSubmit={this.props.handleSubmit}>
                <div className="leftInputs">
                    <label htmlFor="title"><p>Title</p></label>
                    <input type="text" id="title" maxlength="20" required onChange={this.props.handleChange} value={this.props.title}/>

                    <label htmlFor="description"><p>Description</p></label>
                    <textarea rows="5" cols="35" placeholder="250 Character max" maxlength="250" id="description" required onChange={this.props.handleChange} value={this.props.description}/>
                </div>
                <div className="rightDropdowns">
                    <label htmlFor="mood"><p>Choose Mood</p></label>
                    <select id="mood" onChange={this.props.handleChange}>
                    //checking to see if we have a prop of newMood, if we dont then we want to show this placeholder
                    <option value="" selected = {this.props.newMood ? false : true } disabled>Select a mood</option>
                        {this.props.moodArray.map((moodOption) => 
                        
                            {
                            //added selected to option and if it matches the newMood in our props
                            return <option selected={(this.props.newMood && this.props.newMood) === moodOption ? true : false} value={moodOption}>{moodOption}</option>
                            }
                        )}
                    </select>

                    <label htmlFor="images"><p>Choose Image</p></label>
                    <select id="images" onChange={this.props.handleChange}>
                        <option>Default</option>
                        {/* <option><input type="image" id="images" onChange required value /></option> */}
                    </select>

                </div>

                    <input type="submit" value="Send" />
            </form>
            <form>
                <label htmlFor="newMood">Add New Option</label>
                <input onChange={this.props.handleChange} type="text" id="newMood"/>
                <button onClick={this.props.newMoodSubmit}>This be a button</button>
            </form>
        </Fragment>
        );
    }
}

export default SubmissionsForm;