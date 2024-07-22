import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {clearCart} from '../store/slice/CartSlice'; // Ensure you have this action
import LinearGradient from 'react-native-linear-gradient';
import commonStyle from '../themes/commonstyle';

const CheckoutPage = () => {
  const [orderCompleted, setOrderCompleted] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handlePlaceOrder = () => {
    setOrderCompleted(true);
    dispatch(clearCart());
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  return (
    <LinearGradient
      colors={['#E44D26', '#F16529']}
      style={commonStyle.pageContainer}>
      {orderCompleted ? (
        <Animated.View style={[styles.animationContainer, {opacity: fadeAnim}]}>
          <Text style={styles.successText}>Order Completed!</Text>
        </Animated.View>
      ) : (
        <View style={{marginBottom: 90}}>
          {cartItems.length > 0 ? (
            <>
              <FlatList
                data={cartItems}
                style={{paddingBottom: 50}}
                ListHeaderComponent={() => (
                  <>
                    <Text style={styles.title}>Checkout</Text>
                    <Text style={styles.subTitle}>Items in your cart:</Text>
                  </>
                )}
                renderItem={({item}) => (
                  <View style={styles.productContainer}>
                    <Image
                      source={require('../../assets/images/noImageFound.png')}
                      style={styles.image}
                    />
                    <View style={styles.details}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.description} numberOfLines={2}>
                        {item.description}
                      </Text>
                      <Text style={styles.price}>Rs.{item.price}</Text>
                    </View>
                  </View>
                )}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handlePlaceOrder}>
                <Text style={styles.buttonText}>
                  Place Order with COD Rs. {cartItems.length > 0 && totalPrice}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              no item fount
            </Text>
          )}
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContainer: {
    borderWidth: 1,
    borderColor: 'white',
    margin: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  subTitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  itemContainer: {
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 50,
    marginHorizontal: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  productContainer: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 16,
    backgroundColor: 'whitesmoke',
  },
  image: {
    flex: 1,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  price: {
    fontSize: 16,
    color: '#000',
    marginTop: 30,
  },
});

export default CheckoutPage;
