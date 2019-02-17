import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Tile } from "react-native-elements";
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
        .then(res =>
          this.setState({ data: res.data }, () =>
            alert(`https:${this.state.data.current.condition.icon}`)
          )
        )
        .catch(err => console.log(err));
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder="INPUT WITH CUSTOM ICON"
          leftIcon={<Icon name="user" size={24} color="black" />}
        />
        {!this.state.data.current ? (
          <Text>LOADING...</Text>
        ) : (
          <Tile
            imageSrc={{
              uri: `https:${this.state.data.current.condition.icon}`
            }}
            title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
            featured
            caption="Some Caption Text"
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
