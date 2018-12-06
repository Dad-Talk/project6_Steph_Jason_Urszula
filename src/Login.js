import React from 'react';



const Login = props => {
 
    console.log(props.userImg) 
    return (
        <div className="wrapper">
            {props.user && 
            <button onClick={props.showForm}>Submit Topic</button>}

            {props.user ?
                <button onClick={props.logout}>Log Out</button>
                :
                <button onClick={props.login}>Log In</button>
            }
            {props.user && <img className="userImage" src={props.userImg} alt=""/>
            }
        </div>
    );
};


export default Login;