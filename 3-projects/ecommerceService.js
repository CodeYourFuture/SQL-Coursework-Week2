const db = require("./db_queries");

const createAvailability = async (newProdId, newSupplierId, newPrice) => {
  const supplierCheck = await db.getSupplier(newSupplierId);
  const productCheck = await db.getProduct(newProdId);
  const existingAvailability = await db.getAvailability(
    newProdId,
    newSupplierId
  );

  if (supplierCheck.rows.length === 0) {
    return {
      status: 400,
      message: "A supplier with the submitted id does not exist!",
    };
  }
  if (productCheck.rows.length === 0) {
    return {
      status: 400,
      message: "A product with the submitted id does not exist!",
    };
  }
  if (existingAvailability.rows.length > 0) {
    return {
      status: 400,
      message:
        "An availability with the submitted product and supply id already exists!",
    };
  }
  try {
    await db.insertAvailability(newProdId, newSupplierId, newPrice);
    return {
      status: 200,
      message: "Availability created!",
    };
  } catch (e) {
    console.error(e);
    return {
      status: 500,
      message: "Error creating availability record",
    };
  }
};

module.exports = { createAvailability };
