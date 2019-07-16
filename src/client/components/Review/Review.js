import React, {Component} from 'react';
import {Collapse, Button, CardBody, Card, ListGroupItem, Table} from 'reactstrap';
import {connect} from "react-redux";
import CardTitle from "reactstrap/es/CardTitle";

class Review extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {collapse: false}; //TODO - not sure!!
    }

    toggle() {
        this.setState(state => ({collapse: !state.collapse}));
    }

    getAvg() {
        const a=this.props.bathroomRate;
        const b=this.props.staffRate;
        const c=this.props.cleanRate;
        const d=this.props.foodRate;
        return (a+b+c+d) / 4;
    }

    render() {
         // let avg = this.getAvg();
        return (
            <div>
                {this.props.userName}  : {this.getAvg()}
                <Button className="float-right" color="dark" onClick={this.toggle} style={{marginBottom: '1rem'}} size="sm">
                    details</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            <Table hover>
                                <tbody>
                                <tr>
                                    <td>User Name</td>
                                    <td>{this.props.userName}</td>
                                </tr>
                                <tr>
                                    <td>Food Rate</td>
                                    <td>{this.props.foodRate}</td>
                                </tr>
                                <tr>
                                    <td>Bathroom Rate</td>
                                    <td>{this.props.bathroomRate}</td>
                                </tr>
                                <tr>
                                    <td>Clean Rate</td>
                                    <td>{this.props.cleanRate}</td>
                                </tr>
                                <tr>
                                    <td>Staff Rate</td>
                                    <td>{this.props.staffRate}</td>
                                </tr>
                                <tr>
                                    <td>Drive Rate</td>
                                    <td>{this.props.driveRate}</td>
                                </tr>
                                <tr>
                                    <td>Delivery Rate</td>
                                    <td>{this.props.deliveryRate}</td>
                                </tr>
                                <tr>
                                    <td>Review Date</td>
                                    <td>{this.props.date}</td>
                                </tr>
                                <tr>
                                    <td>Pic</td>
                                    <td>{this.props.pic}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }
}
/*
const mapStateToProps = (state, props) => {
    return {

        userName: props.userName,
        restName: props.restName,
        restLocation: props.restLocation,
        bathroomRate: props.bathroomRate,
        cleanRate: props.cleanRate,
        staffRate: props.staffRate,
        driveRate: props.driveRate,
        deliveryRate: props.deliveryRate,
        foodRate: props.foodRate,
        pic: props.pic,
        date: props.date
    }
};


export default connect(mapStateToProps)(Review);
*/

export default Review;
