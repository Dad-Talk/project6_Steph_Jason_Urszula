import React, { Component } from 'react';

class SubmissionsForm extends Component {

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className="leftInputs">
                    <label htmlFor="title"><p>Title</p></label>
                    <input type="text" id="title" max="20" required onChange={this.props.handleChange} />

                    <label htmlFor="description"><p>Description</p></label>
                    <input type="textarea" id="description" min="200" required onChange={this.props.handleChange} />
                </div>
                <div className="rightDropdowns">
                    <label htmlFor="mood"><p>Choose Mood</p></label>
                    <select id="mood" onChange={this.props.handleChange}>
                        <option value="angry">Angry</option>
                        <option value="jolly">Jolly</option>
                        <option value="tired">tired</option>
                        <option value="grumpy">grumpy</option>
                        <option value="quiet">quiet</option>
                        <option value="full">full</option>
                        <option value="hungry">hungry</option>
                        <option value="argumentative">argumentative</option>
                        <option value="proud">proud</option>
                        <option value="happy">happy</option>
                    </select>

                    <label htmlFor="images"><p>Choose Image</p></label>
                    <select id="images" onChange={this.props.handleChange}>
                        <option>Default</option>
                        <option><input type="image" id="images" onChange required value /></option>
                    </select>

                </div>

                    <input type="submit" value="Send" />
            </form>
        );
    }
}

export default SubmissionsForm;