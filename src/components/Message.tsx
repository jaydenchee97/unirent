import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";
import { decryptMessage } from "../utils/cryptoJs";

export default function Message(props: any) {
  const [isMe, setIsMe] = useState(false);

  const isMyMessage = async () => {
    const authUser = await Auth.currentAuthenticatedUser();

    setIsMe(props?.userId === authUser.attributes.sub);
  };

  let text = decryptMessage(props?.text,props?.chatRoomId)
  console.log(text)

  useEffect(() => {
    isMyMessage();
  }, []);

  return (
    <Surface
      style={[
        styles.surface,
        {
          backgroundColor: isMe ? "#6a1b9a" : "#424242",
          alignSelf: isMe ? "flex-end" : "flex-start",
        },
      ]}
      mode="flat"
      elevation={4}
    >
      <Text>{text}</Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
});
