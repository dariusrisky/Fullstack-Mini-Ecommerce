const { status, OrderStatus } = require("@prisma/client");
const { prisma, Prisma } = require("./utils/prismaClient");

const createOrder = async (req, res) => {
  const user = req.user;
  const { items, payment } = req.body;

  if (!Array.isArray(items) || items.length === 0)
    return res.status(400).json({ msg: "Items required." });

  try {
    const orders = await prisma.$transaction(async tx => {
      const orderResults = [];
      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId, status: status.ON },
        });
        if (!product) throw new Error("Produk tidak ditemukan.");
        if (product.stock < item.quantity)
          throw new Error("Stok produk tidak mencukupi.");

        await tx.product.update({
          where: { id: item.productId, status: status.ON },
          data: { stock: { decrement: item.quantity } },
        });

        const totalPrice = new Prisma.Decimal(product.price).times(
          item.quantity
        );

        const order = await tx.order.create({
          data: {
            userId: user.id,
            productId: item.productId,
            payment: payment || "CASH",
            quantity: item.quantity,
            total_price: totalPrice,
          },
        });
        orderResults.push(order);
      }
      return orderResults;
    });

    return res.status(200).json({ msg: "Pesanan berhasil dibuat", orders });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "Internal server error." });
  }
};

const viewOrder = async (req, res) => {
  const user = req.user;
  try {
    const order = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
      include: {
        product: {
          select: {
            name: true,
            toko: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json({
      data: order,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "internal server error.",
    });
  }
};

const cancelOrder = async (req, res) => {
  const user = req.user;
  const params = req.params.orderId;

  try {
    const cancelOrder = await prisma.order.update({
      where: { id: params, userId: user.id, status: OrderStatus.PENDING },
      data: {
        status: OrderStatus.CANCELED,
      },
    });

    if (!cancelOrder)
      return res.status(403).json({
        msg: "hanya bisa dilakukan saat order status PENDING",
      });

    return res.status(200).json({
      msg: "Pesanan berhasil di cancel.",
      data: cancelOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "internal server error.",
    });
  }
};

const buyOrder = async (req, res) => {
  const user = req.user;
  const params = req.params.buyid;
  try {
    const buy = await prisma.order.update({
      where: { id: params, userId: user.id, status: OrderStatus.PENDING },
      data: { status: OrderStatus.PAID },
    });

    return res.status(200).json({
      msg: "Berhasil membayar product",
      data: buy,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "internal server error.",
    });
  }
};

// const viewOrderToko = async (req, res) => {
//   const 
// };

module.exports = { createOrder, viewOrder, cancelOrder, buyOrder };
