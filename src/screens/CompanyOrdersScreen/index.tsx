import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  getOrdersFromCurrentUser,
  updateOrderStatus,
} from '../../services/orders';
import { GetOrdersFromCurrentUserResponse } from '../../types/orders/responses/getOrdersFromCurrentUserResponse';
import { format, parseISO } from 'date-fns';
import ConfirmPickUpModal from '../../modals/ConfirmPickUpModal';
import {
  formatStatusOrderEnum,
  StatusOrderEnum,
} from '../../types/orders/enums';

export default function CompanyOrdersScreen() {
  const [selectedOrder, setSelectedOrder] =
    useState<GetOrdersFromCurrentUserResponse>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [orders, setOrders] =
    useState<GetOrdersFromCurrentUserResponse[]>(null);

  const handleOpenModal = (item: GetOrdersFromCurrentUserResponse) => {
    setSelectedOrder(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSubmitReview = async () => {
    await updateOrderStatus({
      orderId: selectedOrder.id,
      status: StatusOrderEnum.PickedUp,
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
              <Text style={styles.orderNumber}>Número: {item.id}</Text>
              <Text style={styles.orderInfo}>
                Status: {formatStatusOrderEnum(item.status)}
              </Text>
              <Text style={styles.orderInfo}>Total: R${item.total}</Text>
              <Text style={styles.orderInfo}>
                Data Criação: {format(parseISO(item.creationDate), 'dd/MM/yy')}
              </Text>
            </View>
            <View style={styles.rightContainer}>
              {item.status === StatusOrderEnum.Reserved ? (
                <TouchableOpacity
                  style={styles.confirmedOrder}
                  onPress={() => handleOpenModal(item)}
                >
                  <Icon name='handshake-o' size={40} color='#2E8494' />
                  <Text style={styles.confirmPickUpText}>
                    Clique aqui para confirmar a retirada do pedido!
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.confirmedOrder}>
                  <Icon name='check' size={50} color='#2E8494' />
                  <Text style={styles.confirmedPickUpText}>
                    * Pedido retirado em{' '}
                    {format(parseISO(item.creationDate), 'dd/MM/yy')}
                  </Text>
                </View>
              )}
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
        ListEmptyComponent={ListEmptyComponent}
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
      <ConfirmPickUpModal
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

const ListEmptyComponent = () => {
  return (
    <View style={styles.emptyListContainer}>
      <Text style={styles.emptyListText}>Nenhuma pedido cadastrado</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
  emptyListText: {
    color: '#BEBEBE',
    fontSize: 16,
    fontWeight: 'bold',
  },
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
    marginLeft: 10,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 1,
    marginTop: 5,
    borderLeftWidth: 1,
    borderStyle: 'dotted',
    borderLeftColor: '#2E8494',
  },
  orderInfo: {
    fontSize: 14,
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  confirmPickUpText: {
    fontSize: 12,
    color: '#2E8494',
    fontWeight: 'bold',
    marginRight: 2,
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  confirmedOrder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmedPickUpText: {
    fontSize: 12,
    color: '#2E8494',
    fontWeight: 'bold',
    marginRight: 2,
    marginTop: 8,
  },
});
