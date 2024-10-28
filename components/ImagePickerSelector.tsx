import { useState } from "react";
import {
  Button,
  Image,
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { colors } from "../utils/colors";

const images = [
  require("../assets/pictogrammer/class.png"),
  require("../assets/pictogrammer/food.png"),
  require("../assets/pictogrammer/libary.png"),
  require("../assets/pictogrammer/cycling.png"),
  require("../assets/pictogrammer/beat.png"),
  require("../assets/pictogrammer/meat.png"),
];

const ImagePickerSelector = ({
  onSelect,
  onClose,
}: {
  onSelect: (imageUri: string, fileName: string) => void;
  onClose: () => void;
}) => {
  const [showScreen, setScreenVisibility] = useState(false);
  const [currentImage, setImage] = useState({
    uri: "",
    fileName: "",
  });

  const handleImage = async (image: any) => {
    const resImage = Image.resolveAssetSource(image);
    setImage({
      uri: resImage.uri,
      fileName: resImage.uri.split("/").pop() || "",
    });
  };

  const ConfirmImage = async () => {
    if (currentImage) {
      onSelect(currentImage.uri, currentImage.fileName);
      close();
    }
  };

  const open = () => {
    setScreenVisibility(true);
  };

  const close = () => {
    setScreenVisibility(false);
    onClose();
  };

  return (
    <View>
      <Button title="Vælg Billede" onPress={open} />
      <Modal visible={showScreen} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <ScrollView contentContainerStyle={styles.imageContainer}>
              {images.map((image, id) => (
                <TouchableOpacity key={id} onPress={() => handleImage(image)}>
                  <Image
                    source={image}
                    style={[
                      styles.image,
                      currentImage?.uri ===
                        Image.resolveAssetSource(image).uri &&
                        styles.selectedImage,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={close} style={styles.button}>
                <Text>Luk</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={ConfirmImage}
                disabled={!currentImage}
                style={styles.button}>
                <Text>Vælg Billede</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  modalBox: {
    backgroundColor: colors.gray,
    alignItems: "center",
    width: "85%",
    height: "85%",
    borderRadius: 10,
    padding: 20,
  },
  imageContainer: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    backgroundColor: colors.gray,
    borderColor: colors.black,
    borderWidth: 2,
    width: 125,
    height: 125,
    margin: 10,
  },
  selectedImage: {
    borderColor: colors.yellow,
    borderWidth: 2,
  },
  buttonContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  button: {
    backgroundColor: colors.green,
    marginHorizontal: 20,
    borderRadius: 5,
    padding: 10,
  },
});

export default ImagePickerSelector;
