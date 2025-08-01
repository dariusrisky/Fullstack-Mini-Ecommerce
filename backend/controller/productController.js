const { status } = require("@prisma/client");
const path = require("path");
const fs = require("fs");
const { prisma } = require("./utils/prismaClient");

const createProduct = (req, res) => {
  const { name, price, description, stock, categoriId } = req.body;

  const user = req.user;

  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });

  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/image/product/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  if (!name || !price || !description || !stock || !categoriId)
    return res.status(400).json({ msg: "All fields are required." });

  file.mv(`./public/image/product/${fileName}`, async err => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      const product = await prisma.product.create({
        data: {
          name: name,
          price: parseInt(price),
          stock: parseInt(stock),
          productImagePath: fileName,
          productImageURL: url,
          description: description,
          tokoId: user.id,
          categoryId: categoriId,
        },
        include: {
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          toko: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      res.status(201).json({
        msg: "Product created successfully.",
        product,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the product." });
    }
  });
};

const editProduct = async (req, res) => {
  const user = req.user;
  const { name, price, stock, description } = req.body;
  const id = req.params.id;

  const product = await prisma.product.findUnique({
    where: { id: id, tokoId: user.id, status: status.on },
  });

  let fileName = product.productImagePath;

  if (!req.files === null) {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/image/product/${product.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/image/product/${fileName}`, err => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    const editProduct = await prisma.product.update({
      where: { id: id, tokoId: user.id, status: status.ON },
      data: {
        name: name,
        description: description,
        price: price,
        stock: stock,
        productImageURL: url,
        productImagePath: fileName,
      },
    });
    return res.status(200).json({
      msg: "Product successfully updated.",
      data: editProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "internal server error" });
  }
};

const viewProductperToko = async (req, res) => {
  const params = req.params.tokoid;
  try {
    const product = await prisma.product.findMany({
      where: { tokoId: params, status: status.ON },
    });
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "internal server error" });
  }
};

const removeProduct = async (req, res) => {
  const params = req.params.productId;
  if (!params)
    return res.status(401).json({ msg: "Product id is not declare" });

  const product = await prisma.product.findUnique({ where: { id: params } });

  try {
    const filepath = `./public/image/product/${product.productImagePath}`;
    fs.unlinkSync(filepath);

    await prisma.product.update({
      where: { id: params },
      data: {
        status: status.OFF,
        productImagePath: null,
        productImageURL: null,
      },
    });

    return res
      .status(200)
      .json({ msg: "Product successfully removed from store" });
  } catch (error) {
    console.log(error);
    return res.status(501);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await prisma.product.findMany({
      where: { status: status.ON },
      select: {
        toko: {
          select: {
            name: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
        id: true,
        name: true,
        price: true,
        stock: true,
        description: true,
        productImageURL: true,
        productImagePath: true,
      },
    });

    return res.status(200).json({
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "Internal server error" });
  }
};

const getOrderProduct = async (req, res) => {
  const user = req.user;

  try {
    const product = await prisma.product.findMany({
      where: { tokoId: user.id },
    });
    const order = await prisma.order.findMany({
      where: { productId: product.id },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
        product: {
          select: {
            name: true,
            toko: {
              select: {
                email: true,
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
    return res.status(501).json({ msg: "Internal server error" });
  }
};

const getProductbyID = async (req, res) => {
  const params = req.params.id;
  try {
    const product = await prisma.product.findUnique({
      where: { id: params, status: status.ON },
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        description: true,
        productImageURL: true,
        productImagePath: true,
        category: {
          select: {
            name: true,
          },
        },
        toko: {
          select: {
            id: true,
            name: true,
            profileImagePath: true,
            profileImageURL: true,
          },
        },
      },
    });

    return res.status(200).json({
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "Internal server error" });
  }
};

module.exports = {
  createProduct,
  editProduct,
  viewProductperToko,
  removeProduct,
  getProduct,
  getOrderProduct,
  getProductbyID,
};
