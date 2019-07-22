import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    ButtonGroup,
    Label,
    Input,
    NavLink,
    InputGroup,
    FormGroup,
    Alert,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavItem
} from 'reactstrap';
import { connect } from 'react-redux';
import { search, searchUser, getSearchSuggests } from './actions';
import PropTypes from 'prop-types';
import AdvanceSearch from './AdvanceSearch';
import AdvanceUserSearch from './AdvanceUserSearch';
import Autosuggest from 'react-autosuggest';

import theme from "./theme.css";

// Teach Autosuggest how to calculate suggestions for any given input value.

const getSuggestions = (value, suggests) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : suggests.filter(lang =>
        lang.toLowerCase().slice(0, inputLength) === inputValue
    );
};


const getSuggestionValue = suggestion => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion}
    </div>
);

class Search extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            searchType: 'Restaurants',
            value: '',
            suggestions: []
        };
    }

    componentDidMount() {
        this.props.getSearchSuggests({});
    }

    componentDidUpdate(prevProps) {
        if (this.props.suggestions !== prevProps.suggestions) {
            if (this.state.searchType === 'Restaurants' && this.props.suggestions && (this.state.suggestions.rests !== this.props.suggestions.rests))
                this.setState({suggestions: this.props.suggestions.rests});
            if (this.state.searchType === 'Users' && this.props.suggestions && (this.state.suggestions.users !== this.props.suggestions.users))
                this.setState({suggestions: this.props.suggestions.users});
        }
    }

    static propTypes = {
        search: PropTypes.func.isRequired
    };

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };
    onChange2 = e => {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({
            suggestions: []
        });
    };

    onSubmit = e => {
        e.preventDefault();

        const { value } = this.state;
        if(this.state.searchType === 'Restaurants') {
            if(this.state.value == null || this.state.value === '')
                this.props.search({});
            else
                this.props.search({restName: value});
        }
        else {
            if(this.state.value == null || this.state.value === '')
                this.props.searchUser({});
            else
                this.props.searchUser({name: value});
        }
        this.setState({ value: '' });
    };

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        if(this.state.searchType === 'Restaurants')
            this.setState({suggestions: getSuggestions(value, this.props.suggestions.rests)});
        else
            this.setState({suggestions: getSuggestions(value, this.props.suggestions.users)});

    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };





    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'Search',
            value,
            onChange: this.onChange
        };

        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <InputGroup>
                            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle caret>
                                    {this.state.searchType}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header>Search for:</DropdownItem>
                                    <DropdownItem onClick={this.onChange2} name='searchType' value='Restaurants'>Restaurants</DropdownItem>
                                    <DropdownItem onClick={this.onChange2} name='searchType' value='Users'>Users</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                getSuggestionValue={getSuggestionValue}
                                renderSuggestion={renderSuggestion}
                                inputProps={inputProps}
                            />
                            {this.state.searchType === 'Restaurants' &&
                            <AdvanceSearch/>
                            }
                            {this.state.searchType === 'Users' &&
                            <AdvanceUserSearch/>
                            }
                        </InputGroup>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    suggestions: state.app.get('search')
});

export default connect(mapStateToProps, { search, searchUser, getSearchSuggests })(Search);
