import React, {Component} from 'react';
import {connect} from "react-redux";
import {sendMessage} from '../store/actions/socket';
import {getMessages} from '../store/actions/messages';
import _ from 'lodash';
import {Wrapper, FormChat, Message, StartMessaging, UsersList} from '../components';


class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            chatWith: {},
        }
    }

    onChatSelect = (user, groupId) => {
        groupId = groupId || this.props.match.params.groupId;
        this.setState({ chatWith: user });

        if (groupId) this.props.getMessages(groupId);
    };

    sendMsg = (evt) => {
        evt.preventDefault();

        const { message } = this.state;
        const { groupId, memberId } = this.props.match.params;

        this.props.sendMessage({ message, groupId, memberId });
        this.setState({ message: '' })
    };

    handleTyping = (evt) => {
        this.setState({ message: evt.target.value });
    };

    render() {
        const { message, chatWith } = this.state;
        const { messages, userId } = this.props;
        const { memberId, groupId } = this.props.match.params;
        return (
            <Wrapper>
                <div className="container clearfix">
                    <UsersList onChatSelect={this.onChatSelect}/>

                    <div className="chat">
                        {!_.isEmpty(chatWith) && (
                            <div className="chat-header clearfix">
                                <div className="chat--header">
                                    <img
                                        src={chatWith.avatar || 'https://kctherapy.com/wp-content/uploads/2019/09/default-user-avatar-300x293.png'}
                                        alt=""/>

                                    <div className="chat-about">
                                        <div className="chat-with">
                                            Chat with {chatWith?.firstName}
                                        </div>
                                        <div className="chat-num-messages">
                                            already {messages.length} messages
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {memberId && <StartMessaging memberId={memberId}/>}

                        {groupId && (
                            <>
                                <div className="chat-history">
                                    {!_.isEmpty(messages) && (
                                        <ul>
                                            {messages.map((msg) => (
                                                <Message key={msg.id} msg={msg} userId={userId}/>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className="chat-message clearfix">
                                    <FormChat
                                        onSubmit={this.sendMsg}
                                        value={message}
                                        onChange={this.handleTyping}
                                    />
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.users.token,
    messages: state.messages.messagesList,
    userId: state.users.myAccount.id,
    notifyInfo: state.messages.notify,
    loading: state.messages.loading,
    usersList: state.users.usersList,
})

const mapDispatchToProps = {
    sendMessage,
    getMessages,
}


export default connect(mapStateToProps, mapDispatchToProps)(Messages);
