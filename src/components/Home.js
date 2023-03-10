import React from "react";
import ListMeasurement from "./ListMeasurement";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <ListMeasurement />
      </React.Fragment>
    );
  }
}

export default Home;