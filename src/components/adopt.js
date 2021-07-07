import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { abi, address } from '../abi/abi';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

const Adopt = () => {
    const [accounts, setAccounts] = useState('');
    const [contract, setContract] = useState('');
    const [adopters, setAdopters] = useState('');
    const [adopt, setAdopt] = useState('adopt');
    const [disable, setDisable] = useState(true);
    const [count, setCount] = useState(0);
    const [api, setApi] = useState('');
    useEffect(() => {
        const loadBlockchain = async () => {
            const api = await fetch('https://dog.ceo/api/breed/borzoi/images/random/16');
            const { message } = await api.json();
            setApi(message);
            const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545");
            const accounts = await web3.eth.getAccounts();
            setAccounts(accounts[0]);
            const contract = new web3.eth.Contract(abi, address);
            setContract(contract);
            const c = await contract.methods.getAdopters().call();
            setAdopters(c);
            // const c2 = await contract.methods.adopters(1).call();
            // console.log(c2);
        }
        loadBlockchain();
    }, []);

    const onBtnClick = (e)=> {
        console.log("e => ",e);
        asyncAdoptPetBtn(e);
    }

    const asyncAdoptPetBtn = async (e) => {
        const receipt = await contract.methods.adopt(e).send({from: accounts});
        console.log(receipt);
    }
    return (
        <Container>
            <Row>
                {
                    Object.keys(adopters).map((a, i) => {
                        return (
                            <Col xs={6} md={4} key={i}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={`${api[a]}`} height="250" />
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>Dog</ListGroupItem>
                                        <ListGroupItem>
                                            Adopt By {adopters[a]}
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <Button variant="secondary" value={a} onClick={(e)=>onBtnClick(Math.abs(e.target.value))}
                                                disabled={(adopters[a] !== '0x0000000000000000000000000000000000000000') ? true : false}    
                                            >
                                                {(adopters[a] !== '0x0000000000000000000000000000000000000000') ? 'Success' : 'Adopt'}
                                            </Button>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>

        </Container>
    );
}
export default Adopt;