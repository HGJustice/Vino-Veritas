import {
  BatchCreated as BatchCreatedEvent,
  BatchRemoved as BatchRemovedEvent,
  HumidityDataPushed as HumidityDataPushedEvent,
  RainDataPushed as RainDataPushedEvent,
  SoilDataPushed as SoilDataPushedEvent,
  TemperatureDataPushed as TemperatureDataPushedEvent,
  WindDataPushed as WindDataPushedEvent,
} from "../generated/BatchManagement1/BatchManagement1"
import {
  BatchCreated,
  BatchRemoved,
  HumidityDataPushed,
  RainDataPushed,
  SoilDataPushed,
  TemperatureDataPushed,
  WindDataPushed,
} from "../generated/schema"

export function handleBatchCreated(event: BatchCreatedEvent): void {
  let entity = new BatchCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.BatchManagement1_id = event.params.id
  entity.owner = event.params.owner
  entity.batchName = event.params.batchName
  entity.wineryName = event.params.wineryName
  entity.wineryBatchCount = event.params.wineryBatchCount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBatchRemoved(event: BatchRemovedEvent): void {
  let entity = new BatchRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.batchId = event.params.batchId
  entity.batchName = event.params.batchName
  entity.wineryName = event.params.wineryName
  entity.owner = event.params.owner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleHumidityDataPushed(event: HumidityDataPushedEvent): void {
  let entity = new HumidityDataPushed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.batchId = event.params.batchId
  entity.batchname = event.params.batchname
  entity.wineryName = event.params.wineryName
  entity.data = event.params.data
  entity.owner = event.params.owner
  entity.wineryBatchCount = event.params.wineryBatchCount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRainDataPushed(event: RainDataPushedEvent): void {
  let entity = new RainDataPushed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.batchId = event.params.batchId
  entity.batchname = event.params.batchname
  entity.wineryName = event.params.wineryName
  entity.data = event.params.data
  entity.owner = event.params.owner
  entity.wineryBatchCount = event.params.wineryBatchCount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSoilDataPushed(event: SoilDataPushedEvent): void {
  let entity = new SoilDataPushed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.batchId = event.params.batchId
  entity.batchname = event.params.batchname
  entity.wineryName = event.params.wineryName
  entity.data = event.params.data
  entity.owner = event.params.owner
  entity.wineryBatchCount = event.params.wineryBatchCount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTemperatureDataPushed(
  event: TemperatureDataPushedEvent,
): void {
  let entity = new TemperatureDataPushed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.batchId = event.params.batchId
  entity.batchname = event.params.batchname
  entity.wineryName = event.params.wineryName
  entity.data = event.params.data
  entity.owner = event.params.owner
  entity.wineryBatchCount = event.params.wineryBatchCount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWindDataPushed(event: WindDataPushedEvent): void {
  let entity = new WindDataPushed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.batchId = event.params.batchId
  entity.batchname = event.params.batchname
  entity.wineryName = event.params.wineryName
  entity.data = event.params.data
  entity.owner = event.params.owner
  entity.wineryBatchCount = event.params.wineryBatchCount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
