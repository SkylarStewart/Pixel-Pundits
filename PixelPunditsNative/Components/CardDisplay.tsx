import React from 'react';
import { CardObj } from '../TypeSheet';
import { View,Text, Image, StyleSheet } from 'react-native';

interface Prop{
  card: CardObj
}

const CardDisplay: React.FC<Prop> = ({card}) => {
  return (
    <View>
      <View>
        <Image source={{ uri: card.imageUrl }} style={styles.image} />
      </View>
      <View>
        <Text>Name: {card.name}</Text>
      </View>
      <View>
        <Text>Set: {card.set} </Text>
      </View>
      <View>
        <Text>Printing: {card.print}</Text>
      </View>
      <View>
        <Text>Cost: ${card.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: '80%', // Set width to 80% of container width
    aspectRatio: 1, // Maintain aspect ratio (1:1 for square)
    resizeMode: 'contain', // Resize mode: contain
  },
});

export default CardDisplay;