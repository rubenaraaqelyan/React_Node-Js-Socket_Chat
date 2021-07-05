import React, {Component} from 'react';
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom';
import { socketInit } from "../store/actions/socket";

class Wrapper extends Component {
    componentDidMount() {
        const { token } = this.props;
        this.props.socketInit(token);
    }

    render() {
        const { token } = this.props;
        if (!token){
            return <Redirect to="/login" />;
        }
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    token:state.users.token,
})

const mapDispatchToProps = {
    socketInit,
}


const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Wrapper)

export default Container;
