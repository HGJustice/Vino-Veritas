import { WineryCreated as WineryCreatedEvent } from "../generated/WineryManagement/WineryManagement"
import { WineryCreated } from "../generated/schema"

export function handleWineryCreated(event: WineryCreatedEvent): void {
  let entity = new WineryCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.WineryManagement_id = event.params.id
  entity.name = event.params.name
  entity.addy = event.params.addy
  entity.latitude = event.params.latitude
  entity.longitude = event.params.longitude
  entity.wineryNumber = event.params.wineryNumber

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
