import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';

const AdditionForm = () => {
  return (
    <div>
      <h2>Add new observation</h2>
      <Form>
        <Row>
            <Col> 
                <Form.Group>
                    <Form.Label>Add common name</Form.Label>
                    <Form.Control type="text" name="species" />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col> 
               <Button>    
                Submit
                </Button>
            </Col>
        </Row>
        
    </Form>
    </div>
  )
}

export default AdditionForm