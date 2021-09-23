import React , {useState} from 'react'
import Layout from '../../../components/Layout'
import { Form , Button , Input } from 'semantic-ui-react'
import Message from '../../../components/Message'
import web3 from '../../../ethereum/web3'
import Manufacturer from '../../../ethereum/manufacturer'
import { useRouter } from 'next/router'
import assert from 'assert'

export default function AddProduct() {
    const router = useRouter()


    const [loading, setLoading] = useState(false)
    const [proName, setProName] = useState('')
    const [proPrice, setProPrice] = useState('')
    const [proFeature, setProFeature] = useState('')
    const [Mess, setMess] = useState(null)

    const onSubmit = async()=>{
        setLoading(true)

        try {
            assert(proName != '' && proPrice != '' && proFeature != '')
            let accounts = await web3.eth.getAccounts()
            let curMan = Manufacturer(router.query.contractAdd);
            await curMan.methods.addProduct(router.query.product , proPrice , proFeature)
                .send({from : accounts[0]});
            setLoading(false)
            router.replace(`/${router.query.contractAdd}/${router.query.product}`)
        } catch (error) {

            setInterval(() => {
                setMess(null)
            }, 2000);

            setMess({
                type : 'failure',
                header : 'Error',
                content : error.message
            })
            setLoading(false)
        }

        
    }

    return (
        <Layout>
            <Message Mess = {Mess} />
            <Form onSubmit = {onSubmit}>
                <Form.Field>
                    <label>Enter Product Name</label>
                    <Input onChange = {(event)=>{setProName(event.target.value)}}/>
                </Form.Field>
                <Form.Field>
                    <label>Enter Product Features</label>
                    <Input onChange = {(event)=>{setProFeature(event.target.value)}}/>
                </Form.Field>
                <Form.Field>
                    <label>Enter Price</label>
                    <Input
                        label={{ basic: true, content: 'Rs' }}
                        labelPosition='right'
                        placeholder='Enter Price...'
                        onChange = {(event)=>{setProPrice(event.target.value)}}
                    />
                </Form.Field>
                <Button loading = {loading} type='submit' primary>Add Product!</Button>
            </Form>
        </Layout>
    )
}
