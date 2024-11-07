import { useState, useEffect } from "react";
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
import { fetchPictogramRequest } from "../apis/pictogramAPI";
import { PictogramDTO } from "../DTO/pictogramDTO";

export const fetchedImages: PictogramDTO[] = [];

const ImagePickerSelector = ({
  onSelect,
  onClose,
}: {
  onSelect: (pictogram: PictogramDTO) => void;
  onClose: () => void;
}) => {
  const [showScreen, setScreenVisibility] = useState(false);
  const [images, setImages] = useState<PictogramDTO[]>([]);
  const [currentImage, setCurrentImage] = useState<PictogramDTO | null>(null);
  const [searchText, setSearchText] = useState("");

  // Fetch all images from the DB
  useEffect(() => {
    if (showScreen) {
      let isFetching = true;
      let id = 1;
      const fetchImages = async () => {
        while (isFetching) {
          try {
            if (!fetchedImages.some((image) => image.id === id)) {
              const pictogram = await fetchPictogramRequest(id);
              fetchedImages.push(pictogram);
            }
            id++;
          } catch (error) {
            isFetching = false;
          }
        }
        setImages([...fetchedImages]);
      };
      fetchImages();
    }
  }, [showScreen === true]);

  // Filter images whenever the user types something in the search box
  useEffect(() => {
    const filteredImages = fetchedImages.filter((image: PictogramDTO) =>
      image.pictogramName.toLowerCase().includes(searchText.toLowerCase())
    );
    setImages(filteredImages);
  }, [searchText]);

  const handleImage = (image: PictogramDTO) => {
    setCurrentImage(image);
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
              {images.map((image) => (
                <TouchableOpacity
                  key={image.id}
                  onPress={() => handleImage(image)}>
                  <Image
                    source={{ uri: image.pictogramName }} // uri: image.image, not working
                    style={[
                      styles.image,
                      currentImage?.id === image.id && styles.selectedImage,
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
                disabled={!currentImage}
                style={styles.button}
                onPress={() => {
                  if (currentImage) {
                    onSelect(currentImage);
                    close();
                  }
                }}>
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
