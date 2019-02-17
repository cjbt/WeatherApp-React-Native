import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Header, Input, Tile, Card, Image, Text } from "react-native-elements";
import { StyleSheet, View } from "react-native";
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
          centerComponent={{
            text: "CJ & Hamza Weather Services",
            style: { color: "#fff" }
          }}
        />
        {!this.state.data.current ? (
          <Text>LOADING...</Text>
        ) : (
          <>
            <Card
              title={`${this.state.data.location.name}, ${
                this.state.data.location.country
              } `}
              titleStyle={{ display: "flex", alignItems: "center" }}
              image={{ uri: `https:${this.state.data.current.condition.icon}` }}
              imageWrapperStyle={{ display: "flex", alignItems: "center" }}
              imageStyle={{ width: "40%" }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <Text h1>{this.state.data.current.temp_f} ℉</Text>
                <Text h4>{this.state.data.current.condition.text}</Text>
              </View>
            </Card>

            {/* <Tile
            
              title={`${this.state.data.location.name}, ${
                this.state.data.location.country
              } `}
              featured
              caption={this.state.data.location.localtime}
              style={styles.tile}
            /> */}
            <View
              style={{
                display: "flex",
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
            <View
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 40
              }}
            >
              <Text h2>{this.state.data.current.wind_dir}</Text>
              <Text>Wind Direction</Text>
              <Text>Speed: {this.state.data.current.wind_mph} mph</Text>
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
  },
  tile: {
    backgroundColor: "black"
  }
});
