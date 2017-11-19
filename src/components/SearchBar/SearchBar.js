import './SearchBar.css'
import React from 'react'

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: ''
        }
        this.handleTermChange = this.handleTermChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }
    handleTermChange(e) {
        this.setState({
            searchTerm: e.target.value
        })
    }
    handleSearch(e) {
        this.props.searchSpotify(this.state.searchTerm)
        e.preventDefault()
    }
    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song Title" onChange={this.handleTermChange}/>
                <a onClick={this.handleSearch}>SEARCH</a>
            </div>
        )
    }
}

export default SearchBar
