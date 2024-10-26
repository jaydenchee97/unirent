import { View, ScrollView } from "react-native";
import { Storage } from "aws-amplify";
import { useEffect, useState } from "react";
import ImageInput from "../components/ImageInput";

export default function ImageInputList({
  imageUris = [],
  onRemoveImage,
  onAddImage,
}) {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = await Promise.all(
        imageUris.map(async (uri) => {
            if (!uri.startsWith("data:image")) {
              const convertedUri = await Storage.get(uri);
              console.log("Fetched S3 image URI:", convertedUri);
              return convertedUri;
            } else {
              console.log("Base64 image URI detected, skipping fetch:", uri);
              return uri;
            }
        })
      );
      setImageUrls(urls);
    };
    fetchImageUrls();
  }, [imageUris]);

  return (
    <ScrollView>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {imageUrls.map((url, index) => (
          <View key={url} style={{ margin: 5 }}>
            <ImageInput
              imageUri={url}
              onChangeImage={() => onRemoveImage(imageUris[index])}
            />
          </View>
        ))}
        <ImageInput
          onChangeImage={(uri) => onAddImage(uri)}
          imageUri={undefined}
        />
      </View>
    </ScrollView>
  );
}
