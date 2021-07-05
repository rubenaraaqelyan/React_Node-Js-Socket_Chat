import React, {Component} from 'react';
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom';

class WrapperLogout extends Component {
    render() {
        const { token } = this.props;
        if (token){
            return <Redirect to="/" />
        }
        return (
            <>
                {this.props.children}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    token:state.users.token,
})

const mapDispatchToProps = {}


const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(WrapperLogout)

export default Container;
