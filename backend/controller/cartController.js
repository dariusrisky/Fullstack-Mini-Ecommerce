const { prisma } = require("./utils/prismaClient");

const addCartItem = async (req, res) => {
  const userid = req.user.id;
  const { productId, quantity } = req.body;

  if (!userid)
    return res
      .status(401)
      .json({ msg: "Akses ditolak. Silakan login terlebih dahulu." });

  if (!productId)
    return res.status(400).json({ msg: "ProductId wajib diisi." });

  try {
    const cart = await prisma.cart.upsert({
      where: { userId: userid },
      update: {},
      create: { userId: userid },
    });

    const cartid = cart.id;

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product.stock)
      return res.status(404).json({ msg: "Produk tidak ditemukan." });

    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cartid,
          productId: productId,
        },
      },
    });

    const requestedQuantity = (existingCartItem?.quantity || 0) + parseInt(quantity);

    if (product.stock < requestedQuantity)
      return res.status(400).json({ msg: `Stok tidak mencukupi. Sisa stok: ${product.stock}` });

    const cartItem = await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cartid,
          productId: productId,
        },
      },
      update: {
        quantity: {
          increment: parseInt(quantity),
        },
      },
      create: {
        cartId: cartid,
        productId: productId,
        quantity: parseInt(quantity),
      },
      select : {
        product : {
            name : true
        }
      }
    });

    return res.status(200).json({
        msg: "Item berhasil ditambahkan ke keranjang.",
        cartItem });
    
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "Internal server error" });
  }
};



module.exports = {
    addCartItem
}
