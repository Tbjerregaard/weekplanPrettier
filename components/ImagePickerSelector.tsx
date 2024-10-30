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
  TextInput,
} from "react-native";
import { colors } from "../utils/colors";

// Filenames cannot be gotten from emulator, putting them manually
const images = [
  { source: require("../assets/pictogrammer/class.png"), fileName: "class" },
  { source: require("../assets/pictogrammer/food.png"), fileName: "food" },
  { source: require("../assets/pictogrammer/libary.png"), fileName: "libary" },
  {
    source: require("../assets/pictogrammer/cycling.png"),
    fileName: "cycling",
  },
  { source: require("../assets/pictogrammer/beat.png"), fileName: "swimming" },
  { source: require("../assets/pictogrammer/meat.png"), fileName: "meat" },
];

const ImagePickerSelector = ({
  onSelect,
  onClose,
}: {
  onSelect: (imageUri: string, fileName: string) => void;
  onClose: () => void;
}) => {
  const [showScreen, setScreenVisibility] = useState(false);
  const [currentImage, setImage] = useState<{ uri: string; fileName: string }>({
    uri: "",
    fileName: "",
  });
  const [searchText, setSearchText] = useState("");

  const filterImages = images.filter((image) =>
    image.fileName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleImage = (image: any) => {
    setImage({
      uri: Image.resolveAssetSource(image.source).uri,
      fileName: image.fileName,
    });
  };

  const ConfirmImage = () => {
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
              {filterImages.map((image, id) => (
                <TouchableOpacity key={id} onPress={() => handleImage(image)}>
                  <Image
                    source={image.source}
                    style={[
                      styles.image,
                      currentImage.fileName === image.fileName &&
                        styles.selectedImage,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TextInput
              style={styles.searchBox}
              placeholder="Søg efter billede"
              placeholderTextColor={colors.gray}
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={close} style={styles.button}>
                <Text>Luk</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={ConfirmImage}
                disabled={!currentImage.fileName}
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
  searchBox: {
    backgroundColor: colors.white,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 10,
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
