import React from "react";
import ListProduct from "./ListProduct";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <ListProduct />
      </React.Fragment>
    );
  }
}

export default Home;