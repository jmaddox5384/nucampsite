import React from 'react';
import { Card, CardImg, CardText, CardBody,Button, Breadcrumb, BreadcrumbItem, Modal,ModalHeader,ModalBody,Row,Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control } from 'react-redux-form';
import { LocalForm } from 'react-redux-form';
import { Errors } from 'react-redux-form';


const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);




class CommentForm extends React.Component {


    constructor(props) {
        super(props);

        
        this.state = {
            
            isModalOpen: false
        };
        
        this.toggleModal = this.toggleModal.bind(this);
        
    }
    
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    
    
    render(){
        return(
            
            
        <div>                  
            <Button onClick={this.toggleModal} outline color="secondary"><i className="fa fa-pencil fa-lg"></i>Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                <ModalHeader>Login</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Col md={10}>
                                <Control.select modal=".rating" name="rating"
                                   className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>

                            <Col>
                                <Control.text model=".firstName" id="firstName"
                                    placeholder=" First Name"
                                    className="form-control">
                                        validators={{
                                            required, 
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                        <Errors
                                        className="text-danger"
                                        model=".firstName"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />

                                </Control.text>
                                
                            </Col>

                            <Col>
                               <Control.textarea modal=".text" id="text">

                               </Control.textarea>
                            </Col>
                        </Row>
                        
                        <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>                   
            
        );
    }
   
 }
 










function RenderCampsite({campsite}) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments}) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {
                    comments.map(comment => {
                        return (
                            <div key={comment.id}>
                                <p>
                                    {comment.text}<br />
                                    -- {comment.author}, {new Intl.DateTimeFormat('en-US', 
                                    { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                </p>
                            </div>
                        );
                    })
                }
                <CommentForm/>
            </div>

           


        );
    }
    
    return (
        <div/>

    )
    
    
   

    
}

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return <div />;
}







export default CampsiteInfo;