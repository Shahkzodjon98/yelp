import React, { useState, useEffect } from 'react';
import "@aws-amplify/ui-react/styles.css";
import { API } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { listRestaurants } from './graphql/queries';
import { Table } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.css';
import { createRestaurant as createRestaurantMutation, deleteRestaurant as deleteRestaurantMutation } from './graphql/mutations';
import YelpNavbar from './components/Header';
import "../src/css/App.css"

const initialFormState = { name: '', description: '', city: '' }

function App({ signOut }) {
  const [Restaurants, setRestaurants] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  async function fetchRestaurants() {
    const apiData = await API.graphql({ query: listRestaurants });
    setRestaurants(apiData.data.listRestaurants.items);
  }

  async function createRestaurant() {
    if (!formData.name || !formData.description) return;
    console.log(formData)
    await API.graphql({ query: createRestaurantMutation, variables: { input: formData } });
    setRestaurants([ ...Restaurants, formData ]);
    setFormData(initialFormState);
  }

  return (
    <div className="App">
      <YelpNavbar  signOut={signOut}/>
      <Container>
        <Row className="mt-3">
            <Form>
              <Form.Group as={Col} md="45" controlId="formDataName">
                <Form.Control onChange={e => setFormData({ ...formData, 'name': e.target.value})} type="text" value={formData.name} placeholder="Restaurant name" />
              </Form.Group>
              <br />
              <Form.Group controlId="formDataDescription">
                <Form.Control onChange={e => setFormData({ ...formData, 'description': e.target.value})} type="text" value={formData.description} placeholder="Restaurant description" />
              </Form.Group>
              <br />
              <Form.Group controlId="formDataCity">
                <Form.Control onChange={e => setFormData({ ...formData, 'city': e.target.value})} type="text" value={formData.city} placeholder="Restaurant city" />
              </Form.Group>
              <br />
            </Form>
            <button type="button" class="btn btn-outline-success">Create</button>
        </Row>
        <hr />
        <h1>Lists</h1>
        {Restaurants.length ? (
        <Row className="my-5">
            <Col>
            <Table className='bg-secondary text-light' striped bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>City</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
      <th scope="row">1</th>
      <td>Shakhzod</td>
      <td>Erkinov</td>
      <td>@Shaxa</td>
    </tr>
                  {
                    Restaurants.map((restaurant, index) => (
                      <tr key={`restaurant-${index}`}>
                        <td className='text-light'>{index + 1}</td>
                        <td className='text-light'>{restaurant.name}</td>
                        <td className='text-light'>{restaurant.description}</td>
                        <td className='text-light'>{restaurant.city}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </Col>
        </Row>
        ) : null}
      </Container>
    </div>
  );
}

export default withAuthenticator(App);