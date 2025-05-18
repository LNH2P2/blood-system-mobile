import { styles } from "@/lib/styles";
import { Button, Text } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function Profile() {
  const router = useRouter();
  
  return (
    <View style={{ padding: 8 }}>
      <Text style={styles.title}>Title</Text>
      <Text style={styles.heading}>Heading</Text>
      <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur imperdiet bibendum felis, eu consequat est pharetra vitae. Phasellus in vulputate lorem. Vivamus ultricies nec urna et faucibus. Aliquam vel metus sed velit ultrices tristique in eu justo. Vivamus mollis suscipit nisi et congue. Nulla vel est eu purus ornare cursus eget eu leo. Nam commodo enim non ante lobortis sodales quis nec lectus. Nam semper faucibus egestas. Pellentesque ornare, mi nec vulputate euismod, lectus nisi tempus orci, eu venenatis enim velit ut felis. Aliquam vitae arcu quis lacus gravida interdum sed et sem. Suspendisse vel nisi iaculis, pharetra tortor nec, lacinia lectus. Quisque et elementum mi, non fringilla purus.</Text>
      <Button onPressIn={() => router.back()}>Back</Button>
    </View>
  );
}
