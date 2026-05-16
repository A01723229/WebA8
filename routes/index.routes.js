import{Router} from "express"
import { abc, hola, ping } from "../controllers/index.controller.js"

const router = Router()

router.get("/",hola)
router.get("/ping",ping)
router.get("/a/b/c",abc)

export default router