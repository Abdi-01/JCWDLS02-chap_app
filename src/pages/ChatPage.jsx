import React from 'react';
import {
    FormGroup, Label, Input, InputGroup
    , InputGroupText, Button
} from 'reactstrap';
import io from 'socket.io-client';

const API_URL = `http://localhost:4000`;

class ChatPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        }
    }

    onBtConnect = () => {
        const socket = io(API_URL);
        socket.emit('JoinSocket', {username:this.state.username});
        socket.on('joinNotif')
    }

    render() {
        return (
            <div className='container'>
                <h2 className='text-center my-3'>E-Chat</h2>
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
            </div>
        )
    }
}

export default ChatPage;