import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ProfilePicture } from "../components/ProfilePage";
import Reanimated, { SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { colors, SharedStyles } from "../utils/SharedStyles";
import { Ionicons } from "@expo/vector-icons";
import ReanimatedSwipeable from "../components/ReanimatedSwipeable";

const ACTION_WIDTH = 100;

function LeftAction(
  _prog: SharedValue<number>,
  drag: SharedValue<number>,
  deleteMember: () => void,
  giveAdminPrivileges: () => void,
) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value - ACTION_WIDTH * 2 }],
    };
  });

  return (
    <Reanimated.View style={[styleAnimation, {flexDirection: 'row'}]}>
      <TouchableOpacity
        testID="deleteActivityItemButton"
        onPress={deleteMember}
        style={[styles.action, { backgroundColor: colors.crimson }]}
      >
        <Ionicons name="trash-outline" size={32} color={colors.white} />
      </TouchableOpacity>
      <TouchableOpacity
        testID="giveAdminPrivilegesButton"
        onPress={giveAdminPrivileges}
        style={[styles.action, { backgroundColor: colors.blue }]}
      >
        <Ionicons name="star-outline" size={32} color={colors.white} />
      </TouchableOpacity>
    </Reanimated.View>
  );
}

const ViewOrgMembers = () => {
  const mockMembers = [
    { name: "John Doe" },
    { name: "Jane Doe" },
    { name: "John Smith" },
    { name: "Jane Smith" },
    { name: "John Johnson" },
    { name: "Jane Johnson" },
  ];

  const deleteMember = () => {
    console.log("Member deleted");
  };

  const giveAdminPrivileges = () => {
    console.log("Admin privileges granted");
  };

  const renderMemberContainer = ({ item }: { item: { name: string } }) => (
    <ReanimatedSwipeable
      overshootFriction={10}
      overshootLeft={false}
      overshootRight={false}
      renderLeftActions={(prog, drag) =>
        LeftAction(
          prog,
          drag,
          deleteMember,
          giveAdminPrivileges,
        )
      }
      renderRightActions={() => <View />}
    >
      <View style={styles.itemContainer}>
        <ProfilePicture label={item.name} style={styles.profilePicture} />
        <Text
          adjustsFontSizeToFit={true}
          maxFontSizeMultiplier={2}
          minimumFontScale={0.3}
          style={styles.itemText}
        >
          {item.name}
        </Text>
      </View>
    </ReanimatedSwipeable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>View Organization Members</Text>
      <FlatList
        data={mockMembers}
        renderItem={renderMemberContainer}
        keyExtractor={(item, index) => index.toString() + item.name}
        ItemSeparatorComponent={() => <View style={{ height: 3 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: colors.white,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 20,
    backgroundColor: colors.lightBlue,
  },
  itemText: {
    fontSize: 20,
    textAlign: "center",
  },
  profilePicture: {
    height: 75,
    borderRadius: 1000,
    aspectRatio: 1,
  },
  actionContainer: {
    flexDirection: "row",
  },
  action: {
    ...SharedStyles.trueCenter,
    width: ACTION_WIDTH,
  },
});

export default ViewOrgMembers;
