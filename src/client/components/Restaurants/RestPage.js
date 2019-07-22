import React, {Component} from 'react';
import {Collapse, Button, CardBody, Card, Table, CardTitle, CardImg} from 'reactstrap';
import ReviewsPage from "../ReviewsPage/ReviewsPage";
import Container from "reactstrap/es/Container";


class RestPage extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false
        };
    }

    toggle() {
        this.setState(state => ({collapse: !state.collapse}));
    }

    roundUpFraction(num) {
        num = num * 10;
        num = Math.trunc(num);
        return num / 10;
    }

    setAvg() {
        if (this.props.reviews.length === 0)
            return 0;
        let counter = this.props.reviews.length;
        let sum = this.props.reviews.reduce(this.elementAvgReducer, 0);

        return this.roundUpFraction(sum / counter);
    }

    elementAvg(review) {
        const a = review.bathroomRate;
        const b = review.staffRate;
        const c = review.cleanRate;
        const d = review.foodRate;
        const e = review.driveRate;
        const f = review.deliveryRate;

        if (f !== 0 && e !== 0)
            return (a + b + c + d + e + f) / 6;
        if (e !== 0)
            return (a + b + c + d + e) / 5;
        if (f !== 0)
            return (a + b + c + d + f) / 5;
        return (a + b + c + d) / 4;
    };

    elementAvgReducer = (accumulator, currentValue) => (accumulator + this.elementAvg(currentValue));

    isDBRest() {
        return this.props.name === 'SOHO' || this.props.name === 'McDonald\'s';
    }

    starRatePic(avg) {
        if (avg < 0.75)
            return '05';
        if (avg < 1.25)
            return '1';
        if (avg < 1.75)
            return '15';
        if (avg < 2.25)
            return '2';
        if (avg < 2.75)
            return '25';
        if (avg < 3.25)
            return '3';
        if (avg < 3.75)
            return '35';
        if (avg < 4.25)
            return '4';
        if (avg < 4.75)
            return '45';
        return '5';
    }

    render() {
        let avg = this.setAvg();
        let starPic = this.starRatePic(avg);



        const previewStyle = {
            justifyContent: 'center',
            alignItems: 'center',
            display: 'inline',
            width: '70%',
            height: '70%',
            position: 'relative',
            textAlign: 'center',
            borderWidth: '2px',
            borderRadius: '5px',
            marginTop: '0.6rem'
        };

        const logoStyle = {
            display: 'inline',
            width: '15%',
            height: '15%',
            marginTop: '0.6rem'
        };

        return (
            <div>
                {
                    this.isDBRest() ?
                        <img src={require(`../../../../public/pictures/logos/${this.props.name}.JPG`)}
                             alt="logo" style={logoStyle}/>
                        :
                        <img src={require(`../../../../public/pictures/logos/defaultLogo.JPG`)}
                             alt="logo" style={logoStyle}/>
                }
                {this.props.name} , {this.props.location}
                <Button className="float-right" color="dark" onClick={this.toggle} size="sm">
                    Details</Button>
                <img src={require(`../../../../public/pictures/starsRate/${starPic}.jpg`)}
                     alt="starsRate" className="float-right" style={{marginBottom: '1rem'}}/>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        {
                            this.isDBRest() ?
                                <CardImg width="60%" vertical-align='center'
                                         src={require(`../../../../public/pictures/${this.props.name}${this.props.location}.jpg`)}
                                         alt="Card image cap" style={previewStyle}
                                />
                                :
                                <CardImg width="60%" vertical-align='center'
                                         src={require(`../../../../public/pictures/default.jpg`)}
                                         alt="Card image cap" style={previewStyle}
                                />
                        }
                        <CardBody>
                            <Table hover>
                                <tbody>
                                <tr>
                                    <td>Restaurant Name</td>
                                    <td>{this.props.name}</td>
                                </tr>
                                <tr>
                                    <td>Restaurant Location</td>
                                    <td>{this.props.location}</td>
                                </tr>
                                <tr>
                                    <td>Average</td>
                                    <td>{avg}</td>
                                </tr>
                                <tr>
                                    <td><ReviewsPage reviews={this.props.reviews}
                                                     restName={this.props.name}
                                                     restLocation={this.props.location}
                                    /></td>
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

export default RestPage;
