import React, {Component} from 'react';
import {
    ButtonDropdown,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {getReviews} from './actions';
import PropTypes from 'prop-types';
import Review from "../Review/Review";


class ReviewsPage extends Component {
    constructor(props) {
        super(props);
        this.toggle1 = this.toggle1.bind(this);
        this.toggle11 = this.toggle11.bind(this);
        this.toggle2 = this.toggle2.bind(this);
        this.toggle21 = this.toggle21.bind(this);
        this.toggle22 = this.toggle22.bind(this);
        this.toggle221 = this.toggle221.bind(this);
        this.toggle222 = this.toggle222.bind(this);
        this.toggle223 = this.toggle223.bind(this);
        this.toggle224 = this.toggle224.bind(this);
        this.toggle225 = this.toggle225.bind(this);
        this.toggle226 = this.toggle226.bind(this);
        this.state = {
            dropdownOpen1: false, //sort-main
            dropdownOpen11: false, //sort-By specific
            dropdownOpen2: false, //filter-main
            dropdownOpen21: false, //filter-time
            dropdownOpen22: false, //filter-specific
            dropdownOpen221: false, //filter-specific-bathroom
            dropdownOpen222: false, //filter-specific-clean
            dropdownOpen223: false, //filter-specific-staff
            dropdownOpen224: false, //filter-specific-drive
            dropdownOpen225: false, //filter-specific-delivery
            dropdownOpen226: false, //filter-specific-food
            revs: this.props.reviews,
            sort: 'Sort',
            filter: "Filter",
            filterLevel: 0

        };
    }

    toggle1() {
        this.setState({
            dropdownOpen1: !this.state.dropdownOpen1
        });
    }

    toggle11() {
        this.setState({
            dropdownOpen11: !this.state.dropdownOpen11
        });
    }

    toggle2() {
        this.setState({
            dropdownOpen2: !this.state.dropdownOpen2
        });
    }

    toggle21() {
        this.setState({
            dropdownOpen21: !this.state.dropdownOpen21,
            dropdownOpen22: false
        });
    }

    toggle22() {
        this.setState({
            dropdownOpen22: !this.state.dropdownOpen22,
            dropdownOpen21: false
        });

    }

    toggle221() {
        this.setState({
            dropdownOpen221: !this.state.dropdownOpen221
        });
    }

    toggle222() {
        this.setState({
            dropdownOpen222: !this.state.dropdownOpen222
        });
    }

    toggle223() {
        this.setState({
            dropdownOpen223: !this.state.dropdownOpen223
        });
    }

    toggle224() {
        this.setState({
            dropdownOpen224: !this.state.dropdownOpen224
        });
    }

    toggle225() {
        this.setState({
            dropdownOpen225: !this.state.dropdownOpen225
        });
    }

    toggle226() {
        this.setState({
            dropdownOpen226: !this.state.dropdownOpen226
        });
    }

    static propTypes = {
        getReviews: PropTypes.func.isRequired,
        reviews: PropTypes.array.isRequired,
    };

    closeAllButtons() {
        this.setState({
            dropdownOpen1: false, //sort-main
            dropdownOpen11: false, //sort-By specific
            dropdownOpen2: false, //filter-main
            dropdownOpen21: false, //filter-time
            dropdownOpen22: false, //filter-specific
            dropdownOpen221: false, //filter-specific-bathroom
            dropdownOpen222: false, //filter-specific-clean
            dropdownOpen223: false, //filter-specific-staff
            dropdownOpen224: false, //filter-specific-drive
            dropdownOpen225: false, //filter-specific-delivery
            dropdownOpen226: false, //filter-specific-food
        });
    };


    componentDidMount() {
        this.props.getReviews({restName: this.props.restName});

    }

    onChange = e => {

        this.setState({[e.target.name]: e.target.value});
        this.closeAllButtons();
    };

    onFilterChange = e => {
        let tmpStr = e.target.value.split(" ");
        this.setState({
            filter: tmpStr[0],
            filterLevel: tmpStr[1]
        });
        //close buttons
        this.closeAllButtons();
    };

    updateFilter() {
        const currDate = new Date();
        switch (this.state.filter) {
            //topic cases
            case 'bathroomRate':
                const result1 = this.state.revs.filter(review => review.bathroomRate > this.state.filterLevel);
                this.state.revs = result1;
                break;
            case 'cleanRate':
                const result2 = this.state.revs.filter(review => review.cleanRate > this.state.filterLevel);
                this.state.revs = result2;
                break;
            case 'staffRate':
                const result3 = this.state.revs.filter(review => review.staffRate > this.state.filterLevel);
                this.state.revs = result3;
                break;
            case 'driveRate':
                const result4 = this.state.revs.filter(review => review.driveRate > this.state.filterLevel);
                this.state.revs = result4;
                break;
            case 'deliveryRate':
                const result5 = this.state.revs.filter(review => review.deliveryRate > this.state.filterLevel);
                this.state.revs = result5;
                break;
            case 'foodRate':
                const result6 = this.state.revs.filter(review => review.foodRate > this.state.filterLevel);
                this.state.revs = result6;
                break;
            //time cases
            case 'lastYear':
                const result7 = this.state.revs.filter(review => new Date(review.date).getFullYear() === currDate.getFullYear());
                this.state.revs = result7;
                break;
            case 'lastMonth':
                const result8 = this.state.revs.filter(review => new Date(review.date).getFullYear() === currDate.getFullYear() &&
                    new Date(review.date).getMonth() + 1 === currDate.getMonth() + 1);
                this.state.revs = result8;
                break;
            case 'lastWeek':
                const result9 = this.state.revs.filter(review => new Date(review.date).getFullYear() === currDate.getFullYear() &&
                    new Date(review.date).getMonth() + 1 === currDate.getMonth() + 1 &&
                    (
                        (((new Date(review.date).getDate() - currDate.getDate()) <= 7) && ((new Date(review.date).getDate() - currDate.getDate()) >= 0))
                        || (((new Date(review.date).getDate() - currDate.getDate()) >= -7) && ((new Date(review.date).getDate() - currDate.getDate()) < 0))
                    )
                );
                this.state.revs = result9;
                break;
            default:
                this.state.revs = this.props.reviews;
        }

    }

    updateSort() {
        switch (this.state.sort) {
            case 'Newest':
                this.state.revs.sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date);
                });
                break;
            case 'Oldest':
                this.state.revs.sort(function (a, b) {
                    return new Date(a.date) - new Date(b.date);
                });
                break;
            case 'bathroomRate':
                this.state.revs.sort(function (a, b) {
                    return a.bathroomRate - b.bathroomRate;
                });
                break;
            case 'cleanRate':
                this.state.revs.sort(function (a, b) {
                    return a.cleanRate - b.cleanRate;
                });
                break;
            case 'staffRate':
                this.state.revs.sort(function (a, b) {
                    return a.staffRate - b.staffRate;
                });
                break;
            case 'driveRate':
                this.state.revs.sort(function (a, b) {
                    return a.driveRate - b.driveRate;
                });
                break;
            case 'deliveryRate':
                this.state.revs.sort(function (a, b) {
                    return a.deliveryRate - b.deliveryRate;
                });
                break;
            case 'foodRate':
                this.state.revs.sort(function (a, b) {
                    return a.foodRate - b.foodRate;
                });
                break;
            default:
                break;
        }

    }

    updateRevs() {
        this.state.revs = this.props.reviews;
        this.updateFilter();
        this.updateSort();
    };

    resetState = e => {
        this.setState({
            sort: 'Sort',
            filter: 'Filter',
            filterLevel: 0
        });
    };


    render() {

        const sortBySpecificTopicButton = (
            <ButtonDropdown direction="right" isOpen={this.state.dropdownOpen11} toggle={this.toggle11}>
                <DropdownToggle caret>
                    Sort by Topic
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem name='sort' value='bathroomRate' onClick={this.onChange}>Bathroom</DropdownItem>
                    <DropdownItem name='sort' value='cleanRate' onClick={this.onChange}>Cleaning</DropdownItem>
                    <DropdownItem name='sort' value='staffRate' onClick={this.onChange}>Staff</DropdownItem>
                    <DropdownItem name='sort' value='driveRate' onClick={this.onChange}>Drive-in</DropdownItem>
                    <DropdownItem name='sort' value='deliveryRate' onClick={this.onChange}>Delivery</DropdownItem>
                    <DropdownItem name='sort' value='foodRate' onClick={this.onChange}>Food Quality</DropdownItem>
                </DropdownMenu>

            </ButtonDropdown>
        );


        const filterByTopicButton = (
            <ButtonDropdown isOpen={this.state.dropdownOpen22} toggle={this.toggle22}>
                <DropdownToggle caret>
                    Filter by Topic
                </DropdownToggle>

                <DropdownMenu>

                    <ButtonDropdown isOpen={this.state.dropdownOpen221} toggle={this.toggle221}>
                        <DropdownToggle caret>
                            Bathroom Rate
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem value='bathroomRate 1' onClick={this.onFilterChange}>>1</DropdownItem>
                            <DropdownItem value='bathroomRate 2' onClick={this.onFilterChange}>>2</DropdownItem>
                            <DropdownItem value='bathroomRate 3' onClick={this.onFilterChange}>>3</DropdownItem>
                            <DropdownItem value='bathroomRate 4' onClick={this.onFilterChange}>>4</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>

                    <ButtonDropdown isOpen={this.state.dropdownOpen222} toggle={this.toggle222}>
                        <DropdownToggle caret>
                            Clean Rate
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem value='cleanRate 1' onClick={this.onFilterChange}>>1</DropdownItem>
                            <DropdownItem value='cleanRate 2' onClick={this.onFilterChange}>>2</DropdownItem>
                            <DropdownItem value='cleanRate 3' onClick={this.onFilterChange}>>3</DropdownItem>
                            <DropdownItem value='cleanRate 4' onClick={this.onFilterChange}>>4</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>


                    <ButtonDropdown isOpen={this.state.dropdownOpen223} toggle={this.toggle223}>
                        <DropdownToggle caret>
                            Staff Rate
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem value='staffRate 1' onClick={this.onFilterChange}>>1</DropdownItem>
                            <DropdownItem value='staffRate 2' onClick={this.onFilterChange}>>2</DropdownItem>
                            <DropdownItem value='staffRate 3' onClick={this.onFilterChange}>>3</DropdownItem>
                            <DropdownItem value='staffRate 4' onClick={this.onFilterChange}>>4</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>

                    <ButtonDropdown isOpen={this.state.dropdownOpen224} toggle={this.toggle224}>
                        <DropdownToggle caret>
                            Drive Rate
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem value='driveRate 1' onClick={this.onFilterChange}>>1</DropdownItem>
                            <DropdownItem value='driveRate 2' onClick={this.onFilterChange}>>2</DropdownItem>
                            <DropdownItem value='driveRate 3' onClick={this.onFilterChange}>>3</DropdownItem>
                            <DropdownItem value='driveRate 4' onClick={this.onFilterChange}>>4</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>

                    <ButtonDropdown isOpen={this.state.dropdownOpen225} toggle={this.toggle225}>
                        <DropdownToggle caret>
                            Delivery Rate
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem value='deliveryRate 1' onClick={this.onFilterChange}>>1</DropdownItem>
                            <DropdownItem value='deliveryRate 2' onClick={this.onFilterChange}>>2</DropdownItem>
                            <DropdownItem value='deliveryRate 3' onClick={this.onFilterChange}>>3</DropdownItem>
                            <DropdownItem value='deliveryRate 4' onClick={this.onFilterChange}>>4</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>

                    <ButtonDropdown isOpen={this.state.dropdownOpen226} toggle={this.toggle226}>
                        <DropdownToggle caret>
                            Food Quality Rate
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem value='foodRate 1' onClick={this.onFilterChange}>>1</DropdownItem>
                            <DropdownItem value='foodRate 2' onClick={this.onFilterChange}>>2</DropdownItem>
                            <DropdownItem value='foodRate 3' onClick={this.onFilterChange}>>3</DropdownItem>
                            <DropdownItem value='foodRate 4' onClick={this.onFilterChange}>>4</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>

                </DropdownMenu>

            </ButtonDropdown>
        );


        const filterByTimeButton = (
            <ButtonDropdown direction="right" isOpen={this.state.dropdownOpen21} toggle={this.toggle21}>
                <DropdownToggle caret>
                    Filter by Time
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem name='filter' value='lastYear' onClick={this.onChange}>Last Year</DropdownItem>
                    <DropdownItem name='filter' value='lastMonth' onClick={this.onChange}>Last Month</DropdownItem>
                    <DropdownItem name='filter' value='lastWeek' onClick={this.onChange}>Last Week</DropdownItem>
                </DropdownMenu>

            </ButtonDropdown>
        );

        //set the sort button outside the return to make code more clean
        const sortButton = (
            <ButtonDropdown isOpen={this.state.dropdownOpen1} toggle={this.toggle1} inline>
                <DropdownToggle caret>
                    {(this.state.sort === 'Sort') ? 'Sort' :
                        `Sort by: ${this.state.sort}`}
                </DropdownToggle>
                <DropdownMenu>
                    <ButtonDropdown isOpen={this.state.dropdownOpen11} toggle={this.toggle11}>
                        <DropdownItem name='sort' value='Newest' onClick={this.onChange}>newest</DropdownItem>
                        <DropdownItem name='sort' value='Oldest' onClick={this.onChange}>oldest</DropdownItem>
                        <DropdownItem name='sort'>{sortBySpecificTopicButton}</DropdownItem>
                    </ButtonDropdown>
                </DropdownMenu>
            </ButtonDropdown>
        );


        //set the sort button outside the return to make code more clean.
        // in DropdownToggle - there is a dynamic button, changed by filter type
        const filterButton = (
            <ButtonDropdown isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
                <DropdownToggle caret>
                    {(this.state.filter === 'Filter') ? 'Filter' :
                        ` Filtered by: ${this.state.filter} > ${this.state.filterLevel}`}
                </DropdownToggle>
                <DropdownMenu>
                    <ButtonDropdown isOpen={this.state.dropdownOpen2}>
                        <DropdownItem name='filter'>{filterByTopicButton}</DropdownItem>
                        <DropdownItem name='filter'>{filterByTimeButton}</DropdownItem>
                    </ButtonDropdown>
                </DropdownMenu>
            </ButtonDropdown>
        );


        //set the sort button outside the return to make code more clean
        const resetButton = (
            <Button onClick={this.resetState}>Clear</Button>

        );

        this.updateRevs();
        return (
            <Container>
                {sortButton}{filterButton}{(this.state.sort !== 'Sort' || this.state.filter !== 'Filter') ? resetButton : null}
                <ListGroup>
                    <TransitionGroup className='revs-list'>
                        {this.state.revs.map((
                            {
                                _id, userName, bathroomRate, cleanRate,
                                staffRate, driveRate, deliveryRate, foodRate, pic, date
                            }) => (
                            <CSSTransition key={_id} timeout={500} classNames='fade'>
                                <ListGroupItem>
                                    <Review
                                        userName={userName}
                                        restName={this.props.restName}
                                        restLocation={this.props.restLocation}
                                        bathroomRate={bathroomRate}
                                        cleanRate={cleanRate}
                                        staffRate={staffRate}
                                        driveRate={driveRate}
                                        deliveryRate={deliveryRate}
                                        foodRate={foodRate}
                                        pic={pic}
                                        date={date}
                                        _id={_id}

                                    />
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }

}
export default connect(null, {getReviews})(ReviewsPage);
