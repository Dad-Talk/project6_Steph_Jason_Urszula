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
                        console.log("mood", {this.props.handleChange})
                    <option value="" disabled selected>Select a mood</option>
                        {Object.entries(this.props.moodArray).map((moodOption) => 
                            {
                                return <option value={moodOption[1]}>{moodOption[1]}</option>
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