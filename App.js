import React from "react";
import { Button, View } from "react-native";
import io from "socket.io-client";

const socket = io("localhost:3000");

const App = () => {
  const handlePlay = () => {
    socket.emit("play");
  };

  const handlePause = () => {
    socket.emit("pause");
  };

  return (
    <View>
      <Button title="Play" onPress={handlePlay} />
      <Button title="Pause" onPress={handlePause} />
    </View>
  );
};

export default App;
