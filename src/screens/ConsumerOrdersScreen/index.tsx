import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ReviewModal from '../../modals/ReviewModal';
import { createReview } from '../../services/reviews';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getOrdersFromCurrentUser } from '../../services/orders';
import { GetOrdersFromCurrentUserResponse } from '../../types/orders/responses/getOrdersFromCurrentUserResponse';
import { format, parseISO } from 'date-fns';
import { formatStatusOrderEnum } from '../../types/orders/enums';

export default function ConsumerOrdersScreen({ route }) {
  const [selectedOrder, setSelectedOrder] =
    useState<GetOrdersFromCurrentUserResponse>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [orders, setOrders] =
    useState<GetOrdersFromCurrentUserResponse[]>(null);

  if (route.params?.newOrderId) {
    async () => {
      const orders = await getOrdersFromCurrentUser();
      setOrders(orders);
    };
  }

  const handleOpenModal = (item: GetOrdersFromCurrentUserResponse) => {
    setSelectedOrder(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSubmitReview = async (reviewText, reviewRate) => {
    await createReview({
      orderId: selectedOrder.id,
      comment: reviewText,
      rating: reviewRate,
    });

    const orders = await getOrdersFromCurrentUser();
    setOrders(orders);
  };

  const OrderList = ({ orders }) => {
    const renderOrderItem = ({ item }) => {
      return (
        <ScrollView>
          <View style={styles.orderItem}>
            <Icon name='tag' size={16} color='#2E8494' />
            <View style={styles.leftContainer}>
              <Text style={styles.orderTotal}>Número: {item.id}</Text>
              <Text style={styles.orderStore}>Loja: {item.storeName}</Text>
              <Text style={styles.orderInfo}>
                Data: {format(parseISO(item.creationDate), 'dd/MM/yy')}
              </Text>
              <Text style={styles.orderInfo}>
                Status: {formatStatusOrderEnum(item.status)}
              </Text>
            </View>
            <View style={styles.rightContainer}>
              {item.reviewRate === 0 ? (
                <View style={styles.rateContainer}>
                  <TouchableOpacity onPress={() => handleOpenModal(item)}>
                    <Text style={styles.reviewRateNow}>
                      Clique aqui para avaliar!
                    </Text>
                  </TouchableOpacity>
                  <Icon name='star' size={16} color='gold' />
                </View>
              ) : (
                <View style={styles.rateContainer}>
                  <Text style={styles.reviewRate}>{item.reviewRate}</Text>
                  <Icon name='star' size={16} color='gold' />
                </View>
              )}

              <Text style={styles.orderTotal}>Total: R${item.total}</Text>
            </View>
          </View>
        </ScrollView>
      );
    };

    return (
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrderItem}
      />
    );
  };

  useEffect(() => {
    const getOrders = async () => {
      const orders = await getOrdersFromCurrentUser();
      setOrders(orders);
    };
    getOrders();
  }, []);

  return (
    <View>
      <ReviewModal
        isVisible={modalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSubmitReview}
        selectedOrder={selectedOrder}
      />
      <View>
        <OrderList orders={orders} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  orderItem: {
    flexDirection: 'row',
    marginBottom: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2E8494',
    borderStyle: 'dashed',
  },
  leftContainer: {
    flex: 1,
    marginLeft: 15,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 25,
    marginTop: 35,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderInfo: {
    fontSize: 14,
  },
  orderStore: {
    fontSize: 14,
    marginTop: 5,
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewRate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'gold',
    marginRight: 2,
  },
  reviewRateNow: {
    fontSize: 14,
    color: 'gold',
    marginRight: 2,
    textDecorationLine: 'underline',
  },
  rateContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
