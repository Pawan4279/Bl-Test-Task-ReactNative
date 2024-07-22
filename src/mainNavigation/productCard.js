import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {fetchProducts, horizontalScale, verticalScale} from '../utils/utils';
import {useDispatch, useSelector} from 'react-redux';
import {addItem, removeItem} from '../store/slice/CartSlice';

const ProductCard = props => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const handleAddToCart = product => {
    dispatch(addItem(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeItem(product));
  };
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const newProducts = await fetchProducts(page, 10);
      setLoading(false);
      if (newProducts.length < 10) {
        setHasMore(false);
      }
      setProducts(prevProducts => [...prevProducts, ...newProducts]);
    };
    loadProducts();
  }, [page]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const isProductInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString() + Math.random()}
        // numColumns={2}
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
             
              {isProductInCart(item.id) ?  (
                <TouchableOpacity
                  style={styles.btn1}
                  onPress={() => handleRemoveFromCart(item)}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Remove from cart
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => handleAddToCart(item)}>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    Add to cart
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <Text>Loading...</Text>
          ) : hasMore ? (
            <Button title="Load More" onPress={handleLoadMore} />
          ) : (
            <Text>No more products</Text>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productContainer: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: verticalScale(16),
    backgroundColor: 'whitesmoke',
    elevation:5,
    borderRadius:10,
    padding:5
  },
  image: {
    flex: 1,
    marginRight: horizontalScale(16),
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    color: '#000',
  },
  btn: {
    height: 30,
    backgroundColor: '#E44D26',
    marginHorizontal: 10,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  btn1 : {
    height: 30,
    backgroundColor: 'green',
    marginHorizontal: 10,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  }
});

export default ProductCard;
