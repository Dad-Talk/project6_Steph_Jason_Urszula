import React, { Component, Fragment } from 'react';

class SubmissionsForm extends Component {

<<<<<<< HEAD
    isDisabled = () => {
        if (this.props.newMood === "") {
            return true;
        }
        return false;
    }
=======
  isDisabled = () => {
    if (this.props.newMood === "") {
      return true;
    }
    return false;
  }
>>>>>>> 229b0bdd128964439f18a124bcb8ab68c6923942
    render() {
        return <Fragment>
            <div className="form-container">
              <form onSubmit={this.props.handleSubmit}>
                <h2 className="form-heading">Submit your own conversation starter</h2>
                <div className="leftInputs clearfix">
                  <label htmlFor="title">
                    <p className="form-title">Title</p>
                  </label>
                  <input className="form-title-input" type="text" id="title" maxlength="20" required onChange={this.props.handleChange} value={this.props.title} />
                  <div class="description-container">
                    <label htmlFor="description">
                        <p className="form-description">Description</p>
                    </label>
                    <textarea className="form-description-input" rows="8" cols="40" placeholder="350 Character max" maxlength="350" id="description" required onChange={this.props.handleChange} value={this.props.description} />
                  </div>
                </div>
                <div className="rightDropdowns">
                  <label htmlFor="mood">
                    <p className="form-mood">Choose Mood</p>
                  </label>
                  <select className="form-mood-input" id="mood" onChange={this.props.handleChange}>
                    {/* //checking to see if we have a prop of newMood, if we dont then we want to show this placeholder */}
                    <option value="" selected={this.props.newMood ? false : true} disabled>
                      Select a mood
                    </option>
                    {this.props.moodArray.map(moodOption => {
                      //added selected to option and if it matches the newMood in our props
                    return <option selected={this.props.newMood && (this.props.newMood === moodOption) ? true : false} value={moodOption}>
                      {moodOption}
                    </option>;
                    })}
                  </select>
                </div>
<<<<<<< HEAD
                <div className="mood-container clearfix">
                    <label htmlFor="newMood"><p className="form-custom-mood">Add Mood</p></label>
                    <input onChange={this.props.handleChange} className="form-custom-input" type="text" id="newMood" />
                    <button className="form-btn" onClick={this.props.newMoodSubmit} disabled={this.isDisabled()}>
                        Add
                </button>

                    <input className="form-btn" type="submit" value="Submit" />
                </form>
=======
                <label htmlFor="newMood"><p className="form-custom-mood">Add Mood</p></label>
                <input onChange={this.props.handleChange} className="form-custom-input" type="text" id="newMood" />
                <button className="form-btn" onClick={this.props.newMoodSubmit} disabled={this.isDisabled()}>
                  Add
                </button>

                <input className="form-btn" type="submit" value="Submit" />
              </form>
>>>>>>> 229b0bdd128964439f18a124bcb8ab68c6923942
            </div>
        </Fragment>;
    }
}

export default SubmissionsForm;