import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    };
  }

  renderSeparator = () => (
    <View
      style={{
        backgroundColor: "#E0E0E0",
        height: 1,
        marginTop: 50,
        marginBottom: 50,
      }}
    />
  );

  componentDidMount() {
    fetch("https://itunes.apple.com/search?term=Michael+jackson")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.results });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, marginBottom: 30 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View>
            <Text style={{ fontSize: 30, textAlign: "center", paddingTop: 26 }}>
              Itunes Songs
            </Text>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "grey" }}
            ></View>
            <FlatList
              data={data}
              keyExtractor={({ id }, index) => id}
              contentContainerStyle={{ paddingBottom: 30 }}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback
                  onPress={() => console.log("On Pressed clicked")}
                >
                  <View>
                    <Text style={{ paddingLeft: 10 }}>{item.trackName}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </View>
        )}
      </View>
    );
  }
}
