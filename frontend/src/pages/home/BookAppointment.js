import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { FormTitle, Input, InputDiv, Label } from '../../styles/Form.styles'
import { Form, Wrap } from '../styles/home/BookAppointment.styles'
import {MdOutlineEmail, MdOutlinePermIdentity} from 'react-icons/md'

export default function BookAppointment({match}) {
   
    return (
        <>
            <Wrap>
                <Form>
                    <InputDiv>
                        <FormTitle>Book your appointment</FormTitle>
                    </InputDiv>
                    <InputDiv icon      >
                        <Label>Name</Label>
                        <MdOutlinePermIdentity />
                        <Input placeholder='Name' name='name' />
                    </InputDiv>
                    <InputDiv icon>
                        <Label>Email</Label>
                        <MdOutlineEmail />
                        <Input placeholder='Email' name='email' />

                    </InputDiv>
                    <InputDiv icon>
                        <Label>Number</Label>
                        <AiFillPhone/>
                        <Input placeholder='Number' name='number' />
                    </InputDiv>
                    <InputDiv>
                        <Label>DateTime</Label>
                    </InputDiv>
                </Form>
            </Wrap>
        </>
    )
}
