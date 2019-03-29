import {Order, OrderState} from "../models/Order";
import {Request, Response} from "express";
import ApiError from "../ApiError";
import DatabaseService from "../DatabaseService";
import {Product} from "../models/Product";
import * as moment from "moment-timezone";
import {In} from "typeorm";
const axios = require("axios");

const orderRepository = DatabaseService.getConnection().getRepository(Order);
const productRepository = DatabaseService.getConnection().getRepository(Product);

const index = async (req: Request, res: Response) => {
  const orders = await orderRepository.find({
    where: {
      user_id: req.auth.id
    }
  });
  return res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const {id} = req.params;
  const order = await orderRepository.findOne(id, { relations: ["user", "product"] });
  if (!order) {
    throw new ApiError("error/not-found", "Order not found");
  }
  return res.json(order);
};

const store = async (req: Request, res: Response) => {
  const {
    start_date, duration, total, product_id, phone_num
  } = req.body;
  const product = await productRepository.findOne(product_id, {relations: ["place", "place.user"] });
  if (!product) {
    throw new ApiError("error/not-found", "Product not found");
  }
  const startDate = moment(start_date).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss+07");
  const durationMS = duration * 3600 * 1000;
  const totalPrice = total * product.price * duration;
  const endDate = moment(new Date(new Date(start_date).getTime() + durationMS))
    .tz("Asia/Bangkok")
    .format("YYYY-MM-DD HH:mm:ss+07");
  const expiredDate = moment(new Date(new Date().getTime() + 1800 * 1000))
    .tz("Asia/Bangkok")
    .format("YYYY-MM-DD HH:mm:ss+07");
  const order = orderRepository.create({
    start_date: startDate,
    end_date: endDate,
    expired_date: expiredDate,
    total: total,
    phone_num: phone_num,
    total_price: totalPrice,
    user: req.auth,
    product: product,
    owner: product.place.user,
    state: OrderState.CREATED
  });
  await orderRepository.save(order);
  return res.status(201).json(order);
};

const setRejectedOrder = async (req: Request, res: Response) => {
  const {order_id} = req.body;
  const order = await orderRepository.findOne({
    id: order_id,
    state: In([OrderState.CREATED, OrderState.PAID])
  }, {
    relations: ["user"]
  });
  if (!order) {
    throw new ApiError("error/not-found", "Order not found");
  }
  if (order.state === OrderState.PAID) {
    await axios.post(
      "http://localhost:3030/transaction/return",
      {
        order_id: order.id,
        user_id: order.user.id,
        total_price: order.total_price
      });
  }
  order.state = OrderState.REJECTED;
  await orderRepository.save(order);
  return res.json(order);
};

const setPaidOrder = async (req: Request, res: Response) => {
  const {order_id, ref_code} = req.body;
  const order = await orderRepository.findOne({
    id: order_id,
    state: In([OrderState.CREATED])
  }, { relations: ["user", "owner"] });
  if (!order) {
    throw new ApiError("error/not-found", "Order not found");
  }
  if (order.expired_date < moment(new Date()).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ssZ")) {
    throw new ApiError("error/expired", "Can't pay expired order");
  }
  const resp = await axios.post(
    "http://localhost:3030/transaction/payment",
    {
      user_id: order.user.id,
      ref_code: ref_code
    });
  if (resp.status === 201) {
    order.state = OrderState.PAID;
    await orderRepository.save(order);
    return res.json(order);
  } else {
    throw new ApiError("error/transaction-error", resp.data.error);
  }
};

const setAcceptedOrder = async (req: Request, res: Response) => {
  const {order_id} = req.body;
  const order = await orderRepository.findOne({
    id: order_id,
    state: In([OrderState.PAID])
  }, {
    relations: ["user"]
  });
  if (!order) {
    throw new ApiError("error/not-found", "Order not found");
  }
  await axios.post(
    "http://localhost:3030/transaction/receive",
    {
      order_id: order.id,
      user_id: order.user.id,
      total_price: order.total_price
    });
  order.state = OrderState.ACCEPTED;
  await orderRepository.save(order);
  return res.json(order);
};

const showToOwner = async (req: Request, res: Response) => {
  const orders = await orderRepository.find({
    where: {
      owner: req.auth,
    }
  });
  return res.json(orders);
};

const getTransaction = async (req: Request, res: Response) => {
  const user_id = req.auth.id;
  const resp = await axios.get(`http://localhost:3030/transaction/get?user_id=${user_id}`);
  return res.json(resp.data);
};

export {
  index, show, store, setRejectedOrder, setPaidOrder, setAcceptedOrder, showToOwner, getTransaction
};
