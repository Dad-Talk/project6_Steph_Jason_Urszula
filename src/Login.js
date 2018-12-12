import React from 'react';



const Login = props => {
 
    return (
        <div className="wrapper clearfix">
            {props.user && <img className="userImage" src={props.userImg} alt="" />
            }
            {props.user && 
            <button className="nav-btn" onClick={props.showForm}>Submit Topic +</button>}

            {props.user ?
                <button className="nav-btn" onClick={props.logout}>Log Out</button>
                :
                <button className="nav-btn" onClick={props.login}>Log In</button>
            }
            
        </div>
    );
};


export default Login;