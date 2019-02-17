import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Header, Input, Tile } from "react-native-elements";
import { StyleSheet, View, Text } from "react-native";
import axios from "axios";

export default class App extends React.Component {
  state = {
    data: {},
    lat: "",
    lng: "",
    isLoading: false
  };

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(position => {
      axios
        .get(
          `https://api.apixu.com/v1/current.json?key=048b7b4dfd054496b3925311191702&q=${
            position.coords.latitude
          },${position.coords.longitude}`
        )
        .then(res => this.setState({ data: res.data }))
        .catch(err => console.log(err));
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{
            text: "CJ & Hamza Weather Services",
            style: { color: "#fff" }
          }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />
        {!this.state.data.current ? (
          <Text>LOADING...</Text>
        ) : (
          <>
            <Tile
              title={`${this.state.data.location.name}, ${
                this.state.data.location.country
              } `}
              featured
              caption={this.state.data.location.localtime}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 20
              }}
            >
              <Text>Temperature</Text>
              <Text>{`${this.state.data.current.temp_f} F`}</Text>
              <Text>Feels Like</Text>
              <Text>{`${this.state.data.current.feelslike_f} F`}</Text>
            </View>
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
