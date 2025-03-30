import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder, fetchOrders } from '../../../api/orderApi'; // API çağrısı için bir fonksiyon
import { OrderStatus } from '../../../models/enums/orderStatus';

const initialState = {
  order: null,
  payment: null,
  orderDetails: [], 
  address: null,
  loading: false,
  error: null, 

  // kanka order bilgisi data basedekiler olur tamam mı?
  // yeni sipariş mi eklenecek buradaki orderDetails'e eklenir.
  // yeni payment mi gelecek payment'e eklenir.
  // buradaki değerler db'ye yazıldıkça da null olarak atanır, bu değerler de listener üzerinden dinlenir. müthiş çözüm bro
};

// API'den sipariş bilgisi çekmek için async thunk
export const fetchOrder = createAsyncThunk(
    'order/fetchOrder',
    async (userId, { getState, rejectWithValue }) => {
      try {
        // Redux store'dan authSlice'daki user bilgisini al
        const state = getState();
        const user = state.auth.user;
  
        if (!user || !user.id) {
          //throw new Error('Kullanıcı bilgisi bulunamadı.');
        }
  
        var response = await fetchOrders(0, 1, userId, OrderStatus.PENDING);
        //console.log("Response.content[0]: ", response.content[0]);
        if(response?.content?.length === 0){
          await createOrder({userId: userId});  // belki kanka dönen değer direk responsa atanabilir
          response = await fetchOrders(0, 1, userId, OrderStatus.PENDING);
        }
        return response.content[0];
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToOrderDetails: (state, action) => {
      const existingItem = state.orderDetails.find((item) => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.orderDetails.push(action.payload);
      }
    },
    // Ödeme yöntemini güncelleme
    updatePayment: (state, action) => {
      state.payment = action.payload;
    },
    // Sepetten ürün silme
    removeFromOrderDetails: (state, action) => {
      state.orderDetails = state.orderDetails.filter((item) => item.id !== action.payload);
    },

    resetOrderDetails: (state) => {
      state.orderDetails = [];
    },

    resetPayment: (state) => {
      state.payment = null;
    },

    resetOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        //state.payment = action.payload?.payment;
        //state.orderDetails = action.payload?.orderDetailResponses;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addToOrderDetails, updatePayment, removeFromOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;