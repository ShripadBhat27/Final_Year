import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout';
import { Button  ,Card, Grid, Image} from 'semantic-ui-react';



export default function product() {
    const router = useRouter();
    console.log(router.query);
    return (
        <Layout>
            <Grid style = {{marginTop : "50px"}}>
                <Grid.Row >
                    <Grid.Column width = {13}>
                        <Card.Group>
                            <Card>
                            <Card.Content>
                                <Image
                                floated='right'
                                size='mini'
                                src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                                />
                                <Card.Header>Steve Sanders</Card.Header>
                                <Card.Meta>Friends of Elliot</Card.Meta>
                                <Card.Description>
                                Steve wants to add you to the group <strong>best friends</strong>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                <Button basic color='green'>
                                    Approve
                                </Button>
                                <Button basic color='red'>
                                    Decline
                                </Button>
                                </div>
                            </Card.Content>
                            </Card>
                            <Card>
                            <Card.Content>
                                <Image
                                floated='right'
                                size='mini'
                                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                                />
                                <Card.Header>Molly Thomas</Card.Header>
                                <Card.Meta>New User</Card.Meta>
                                <Card.Description>
                                Molly wants to add you to the group <strong>musicians</strong>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                <Button disabled basic color='green'>
                                    Approve
                                </Button>
                                <Button basic color='red'>
                                    Decline
                                </Button>
                                </div>
                            </Card.Content>
                            </Card>
                            <Card>
                            <Card.Content>
                                <Image
                                floated='right'
                                size='mini'
                                src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
                                />
                                <Card.Header>Jenny Lawrence</Card.Header>
                                <Card.Meta>New User</Card.Meta>
                                <Card.Description>
                                Jenny requested permission to view your contact details
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                <Button basic color='green'>
                                    Approve
                                </Button>
                                <Button basic color='red'>
                                    Decline
                                </Button>
                                </div>
                            </Card.Content>
                            </Card>
                            <Card>
                            <Card.Content>
                                <Image
                                floated='right'
                                size='mini'
                                src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                                />
                                <Card.Header>Steve Sanders</Card.Header>
                                <Card.Meta>Friends of Elliot</Card.Meta>
                                <Card.Description>
                                Steve wants to add you to the group <strong>best friends</strong>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                <Button basic color='green'>
                                    Approve
                                </Button>
                                <Button basic color='red'>
                                    Decline
                                </Button>
                                </div>
                            </Card.Content>
                            </Card>
                            <Card>
                            <Card.Content>
                                <Image
                                floated='right'
                                size='mini'
                                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                                />
                                <Card.Header>Molly Thomas</Card.Header>
                                <Card.Meta>New User</Card.Meta>
                                <Card.Description>
                                Molly wants to add you to the group <strong>musicians</strong>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                <Button basic color='green'>
                                    Approve
                                </Button>
                                <Button basic color='red'>
                                    Decline
                                </Button>
                                </div>
                            </Card.Content>
                            </Card>
                            <Card>
                            <Card.Content>
                                <Image
                                floated='right'
                                size='mini'
                                src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
                                />
                                <Card.Header>Jenny Lawrence</Card.Header>
                                <Card.Meta>New User</Card.Meta>
                                <Card.Description>
                                Jenny requested permission to view your contact details
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                <Button basic color='green'>
                                    Approve
                                </Button>
                                <Button basic color='red'>
                                    Decline
                                </Button>
                                </div>
                            </Card.Content>
                            </Card>
                        </Card.Group>
                    </Grid.Column>
                    <Grid.Column width = {3}>
                        <Button primary>Add Products!!</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    )
}

    
