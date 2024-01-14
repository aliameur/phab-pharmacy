import { Router } from "express"

export default (rootDirectory, options) => {
  const router = Router()

  router.get("/hello", (req, res) => {
    res.json({
      message: "Welcome to My Store!",
    })
  })

  return router
}
