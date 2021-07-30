import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
      // we have a user connected to the order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // we reference the User model
    },

    // this is important to check, order Item is an array []
    // we have an array of order items which is also
    // connected to the Product model
    // in my case, I wont need an array because i just want
    // to allow my user to book one thing at a time
    orderItems: [
      {
        name: { type: String, required: true }, 
        qty: { type: Number, required: false },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        date: {type: String},
        time: {type: String},
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: false },
      city: { type: String, required: false },
      postalCode: { type: String, required: false },
      country: { type: String, required: false },
    },
    paymentMethod: { // the idea behind this is to make the app scalable
      type: String,
      required: false,
    },
    paymentResult: { // this data comes from paypal
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: { // this is not necessary
      type: Number,
      required: false,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: { // need to know if it was paid
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: { // when the booking was paid
      type: Date,
    },
    isDelivered: { // this can change if the therapist completed the session, can be optional as well
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
