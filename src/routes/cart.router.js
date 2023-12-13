import { Router } from "express";
import { CartManager } from "../classes/CartManager.js";

const router = Router()
const cartManager = new CartManager("cart.json")

router.get("/", async (req, res) => {
  try {
    let respuesta = await cartManager.getCarts();
    res.json({ data: respuesta });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const respuesta = await cartManager.getCartById(cid);
    res.json({ data: respuesta });
  } catch (err) {
    console.log(err);
  }
});
router.post("/", async (req, res) => {
  try {
    const respuesta = await cartManager.addCart();
    res.json({ message: "success", data: respuesta });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error", data: err });
  }
});

router.post("/:cid/productos/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const respuesta = await cartManager.addProductToCart(cid, pid);
    res.json({ message: "success", data: respuesta });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error", data: err });
  }
});

export default router;