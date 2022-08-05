import React from 'react';
import {
    FormGroup, Label, Input, InputGroup
    , InputGroupText, Button
} from 'reactstrap';
import io from 'socket.io-client';

const API_URL = `http://localhost:4000`;
const socket = io(API_URL);

class ChatPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            joinNotif: '',
            message: '',
            dataChat: []
        }
    }

    onBtConnect = () => {
        socket.emit('JoinSocket', { username: this.state.username });
        socket.on('joinNotif', (data) => {
            this.setState({ joinNotif: data })
        })
    }

    onSendChat = () => {
        socket.emit('chat', {
            username: this.state.username,
            message: this.state.message
        })

        socket.on('chatForward', (data) => {
            console.table(data);
            this.setState({ dataChat: data });
        })
    }

    printChat = () => {
        return this.state.dataChat.map((val, idx) => {
            return <div>
                <h6 className='fw-bold'>{val.username}</h6>
                <span>{val.message}</span>
            </div>
        })
    }

    render() {
        return (
            <div className='container'>
                <h2 className='text-center my-3'>E-Chat</h2>
                <h4 className='text-center'>{this.state.joinNotif}</h4>
                <FormGroup>
                    <Label>Join Name</Label>
                    <InputGroup>
                        <Input onChange={(e) => this.setState({ username: e.target.value })}
                            placeholder='Username' type='text' />
                        <InputGroupText className='p-0'>
                            <Button type='button' onClick={this.onBtConnect}>Join Socket</Button>
                        </InputGroupText>
                    </InputGroup>
                </FormGroup>
                <div className='shadow'>
                    <div id='print-chat' className='bg-info' style={{ height: '50vh' }}>
                        {this.printChat()}
                    </div>
                    <InputGroup>
                        <Input type='text'
                            onChange={(e) => this.setState({ message: e.target.value })} />
                        <InputGroupText className='p-0'>
                            <Button type='button' color='success' outline
                                onClick={this.onSendChat}>Send</Button>
                        </InputGroupText>
                    </InputGroup>
                </div>
            </div>
        )
    }
}

export default ChatPage;