import { model, Schema } from "mongoose";

const OrderSchema = new Schema({
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  totalPrice: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const OrderModel = model("Order", OrderSchema);

export default OrderModel;
