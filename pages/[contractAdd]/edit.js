import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import Manufacturer from '../../ethereum/manufacturer'
import { useState } from 'react'
import web3 from '../../ethereum/web3'
import { useRouter } from 'next/router'
import Message from '../../components/Message'
import assert from 'assert'


export default function edit() {
    const router = useRouter()

    const [cname, setCname] = useState('')
    const [ctag, setCtag] = useState('')
    const [cproduct, setCproduct] = useState('')
    const [loading, setLoading] = useState(false)
    const [Mess, setMess] = useState(null)

    const handleChangeName = (event)=>{
        event.preventDefault()
        setCname(event.target.value);
    }
    const handleChangeTag = (event)=>{
        event.preventDefault()
        setCtag(event.target.value);
    }
    const handleChangeProduct = (event)=>{
        event.preventDefault()
        setCproduct(event.target.value);
    }

    const onSubmit = async()=>{
        let accounts = await web3.eth.getAccounts();
        let curMan = Manufacturer(router.query.contractAdd);
        setLoading(true)
        try {
            assert(cname != '' && cproduct != '' && ctag != '')
            await curMan.methods.updateCompany(cname,cproduct,ctag).send({from:accounts[0]});
            setLoading(false)
            router.push(`/${router.query.contractAdd}`);
        } catch (error) {
            console.log(error);

            setInterval(() => {
                setMess(null)
            }, 2000);

            setMess({
                type:'failure',
                header : 'Error',
                content : error.message
            })
            setLoading(false);
        }
            
    }
    return (
        <Layout>
            <Message Mess = {Mess} />
            <Form onSubmit = {onSubmit}>
                <Form.Field>
                    <label>Update Company Name</label>
                    <input value = {cname} onChange = {handleChangeName}/>
                </Form.Field>
                <Form.Field>
                    <label>Update Tag Line</label>
                    <input value = {ctag} onChange = {handleChangeTag} />
                </Form.Field>
                <Form.Field>
                    <label>Update Product Name</label>
                    <input value = {cproduct} onChange = {handleChangeProduct} />
                </Form.Field>
                <Button loading = {loading} type='submit' primary>Upadte!</Button>
            </Form>
        </Layout>
    )
}
