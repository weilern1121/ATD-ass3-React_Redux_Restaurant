import React, {Component} from 'react';
import {Collapse, Button, CardBody, Card, ListGroupItem} from 'reactstrap';
import ReviewsPage from "../ReviewsPage/ReviewsPage";

class RestPage extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {collapse: false}; //TODO - not sure!!
    }

    toggle() {
        this.setState(state => ({collapse: !state.collapse}));
    }

    /*getAvg() {
        const a=this.props.bathroomRate;
        const b=this.props.staffRate;
        const c=this.props.cleanRate;
        const d=this.props.foodRate;
        return (a+b+c+d) / 4;
    }*/

    render() {
        // let avg = this.getAvg();
        return (
            <div>
                "SOHO"
                <Button className="float-right" color="dark" onClick={this.toggle} style={{marginBottom: '1rem'}} size="sm">
                    details</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            <li>Restaurant Name: {this.props.restName}</li>
                            <li>Restaurant Location: {this.props.restLocation}</li>
                            <li>Avarage: 2</li>
                            {/*<Review restName={this.props.restName}/>*/}
                            <ReviewsPage restName="SOHO"/>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }
}

export default RestPage;
