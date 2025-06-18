import {
  WineItemCreated as WineItemCreatedEvent,
  WineItemProgressed as WineItemProgressedEvent,
} from "../generated/WineTraceability/WineTraceability"
import { WineItemCreated, WineItemProgressed } from "../generated/schema"

export function handleWineItemCreated(event: WineItemCreatedEvent): void {
  let entity = new WineItemCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.wineID = event.params.wineID
  entity.stage = event.params.stage
  entity.wineryData_id = event.params.wineryData.id
  entity.wineryData_name = event.params.wineryData.name
  entity.wineryData_wineryAddress = event.params.wineryData.wineryAddress
  entity.wineryData_latitude = event.params.wineryData.latitude
  entity.wineryData_longitude = event.params.wineryData.longitude
  entity.batchData_id = event.params.batchData.id
  entity.batchData_batchName = event.params.batchData.batchName
  entity.batchData_wineryName = event.params.batchData.wineryName
  entity.batchData_owner = event.params.batchData.owner
  entity.batchData_temperature = event.params.batchData.temperature
  entity.batchData_windSpeed = event.params.batchData.windSpeed
  entity.batchData_rainFall = event.params.batchData.rainFall
  entity.batchData_soilConductivity = event.params.batchData.soilConductivity
  entity.batchData_humidity = event.params.batchData.humidity
  entity.batchData_removed = event.params.batchData.removed
  entity.batchData_batchCount = event.params.batchData.batchCount
  entity.tankID = event.params.tankID
  entity.barrelID = event.params.barrelID
  entity.bottleID = event.params.bottleID
  entity.wineItemCount = event.params.wineItemCount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWineItemProgressed(event: WineItemProgressedEvent): void {
  let entity = new WineItemProgressed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.wineID = event.params.wineID
  entity.stage = event.params.stage
  entity.tankID = event.params.tankID
  entity.barrelID = event.params.barrelID
  entity.bottleID = event.params.bottleID

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
