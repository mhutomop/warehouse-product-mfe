import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleQueryChanged(event) {
    this.props.getProducts(event.target.value);
  }

  render() {
    return (
      <React.Fragment>
        <div className="flex justify-center">
          <div className="mb-3 xl:w-96">
            <input
              type="search"
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
              id="exampleSearch"
              placeholder="Search by type"
              size="10"
              onChange={this.handleQueryChanged.bind(this)} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchBar;