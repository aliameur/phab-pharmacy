import {
  ProductService,
  ConfigModule,
  MedusaContainer,
} from "@medusajs/medusa"
import Restock from "../services/restock";

export default async (
  container: MedusaContainer,
  config: ConfigModule
): Promise<void> => {
  console.info("Checking deliveries...")
  const restockService = container.resolve<Restock>(
    "restockService"
  )
  restockService.check()
}
