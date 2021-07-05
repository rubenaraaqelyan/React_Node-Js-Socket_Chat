import React, {Component} from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {loginRequest} from '../store/actions/users';
import WrapperLogout from "../components/WrapperLogout";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
        }
    }

    handleChange = (path, value) => {
        const { formData } = this.state;
        _.set(formData, path, value);
        this.setState({ formData})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { formData } = this.state;
        this.props.loginRequest(formData.email, formData.password);
    }


    render() {
        const {formData} = this.state;
        return (
            <WrapperLogout>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            placeholder="email"
                            value={formData.email || " "}
                            onChange={(e) => this.handleChange('email',e.target.value)}
                        />
                        <input
                        type="text"
                        placeholder="password"
                        value={formData.password || " "}
                        onChange={(e) => this.handleChange('password',e.target.value)}
                    />
                        <button type="submit">Sign in</button>
                    </form>
                </div>
            </WrapperLogout>
        );
    }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
    loginRequest,
}


const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default Container;
