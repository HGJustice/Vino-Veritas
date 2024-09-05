import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  BatchCreated,
  BatchRemoved,
  HumidityDataPushed,
  RainDataPushed,
  SoilDataPushed,
  TemperatureDataPushed,
  WindDataPushed
} from "../generated/BatchManagement1/BatchManagement1"

export function createBatchCreatedEvent(
  id: BigInt,
  owner: Address,
  batchName: string,
  wineryName: string,
  wineryBatchCount: BigInt
): BatchCreated {
  let batchCreatedEvent = changetype<BatchCreated>(newMockEvent())

  batchCreatedEvent.parameters = new Array()

  batchCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  batchCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  batchCreatedEvent.parameters.push(
    new ethereum.EventParam("batchName", ethereum.Value.fromString(batchName))
  )
  batchCreatedEvent.parameters.push(
    new ethereum.EventParam("wineryName", ethereum.Value.fromString(wineryName))
  )
  batchCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "wineryBatchCount",
      ethereum.Value.fromUnsignedBigInt(wineryBatchCount)
    )
  )

  return batchCreatedEvent
}

export function createBatchRemovedEvent(
  batchId: BigInt,
  batchName: string,
  wineryName: string,
  owner: Address
): BatchRemoved {
  let batchRemovedEvent = changetype<BatchRemoved>(newMockEvent())

  batchRemovedEvent.parameters = new Array()

  batchRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "batchId",
      ethereum.Value.fromUnsignedBigInt(batchId)
    )
  )
  batchRemovedEvent.parameters.push(
    new ethereum.EventParam("batchName", ethereum.Value.fromString(batchName))
  )
  batchRemovedEvent.parameters.push(
    new ethereum.EventParam("wineryName", ethereum.Value.fromString(wineryName))
  )
  batchRemovedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return batchRemovedEvent
}

export function createHumidityDataPushedEvent(
  batchId: BigInt,
  batchname: string,
  wineryName: string,
  data: i32,
  owner: Address,
  wineryBatchCount: BigInt
): HumidityDataPushed {
  let humidityDataPushedEvent = changetype<HumidityDataPushed>(newMockEvent())

  humidityDataPushedEvent.parameters = new Array()

  humidityDataPushedEvent.parameters.push(
    new ethereum.EventParam(
      "batchId",
      ethereum.Value.fromUnsignedBigInt(batchId)
    )
  )
  humidityDataPushedEvent.parameters.push(
    new ethereum.EventParam("batchname", ethereum.Value.fromString(batchname))
  )
  humidityDataPushedEvent.parameters.push(
    new ethereum.EventParam("wineryName", ethereum.Value.fromString(wineryName))
  )
  humidityDataPushedEvent.parameters.push(
    new ethereum.EventParam(
      "data",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(data))
    )
  )
  humidityDataPushedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  humidityDataPushedEvent.parameters.push(
    new ethereum.EventParam(
      "wineryBatchCount",
      ethereum.Value.fromUnsignedBigInt(wineryBatchCount)
    )
  )

  return humidityDataPushedEvent
}

export function createRainDataPushedEvent(
  batchId: BigInt,
  batchname: string,
  wineryName: string,
  data: i32,
  owner: Address,
  wineryBatchCount: BigInt
): RainDataPushed {
  let rainDataPushedEvent = changetype<RainDataPushed>(newMockEvent())

  rainDataPushedEvent.parameters = new Array()

  rainDataPushedEvent.parameters.push(
    new ethereum.EventParam(
      "batchId",
      ethereum.Value.fromUnsignedBigInt(batchId)
    )
  )
  rainDataPushedEvent.parameters.push(
    new ethereum.EventParam("batchname", ethereum.Value.fromString(batchname))
  )
  rainDataPushedEvent.parameters.push(
    new ethereum.EventParam("wineryName", ethereum.Value.fromString(wineryName))
  )
  rainDataPushedEvent.parameters.push(
    new ethereum.EventParam(
      "data",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(data))
    )
  )
  rainDataPushedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  rainDataPushedEvent.parameters.push(
    new ethereum.EventParam(
      "wineryBatchCount",
      ethereum.Value.fromUnsignedBigInt(wineryBatchCount)
    )
  )

  return rainDataPushedEvent
}

export function createSoilDataPushedEvent(
  batchId: BigInt,
  batchname: string,
  wineryName: string,
  data: i32,
  owner: Address,
  wineryBatchCount: BigInt
): SoilDataPushed {
  let soilDataPushedEvent = changetype<SoilDataPushed>(newMockEvent())

  soilDataPushedEvent.parameters = new Array()

  soilDataPushedEvent.parameters.push(
    new ethereum.EventParam(
      "batchId",
      ethereum.Value.fromUnsignedBigInt(batchId)
    )
  )
  soilDataPushedEvent.parameters.push(
    new ethereum.EventParam("batchname", ethereum.Value.fromString(batchname))
  )
  soilDataPushedEvent.parameters.push(
    new ethereum.EventParam("wineryName", ethereum.Value.fromString(wineryName))
  )
  soilDataPushedEvent.parameters.push(
    new ethereum.EventParam(
      "data",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(data))
    )
  )
  soilDataPushedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  soilDataPushedEvent.parameters.push(
    new ethereum.EventParam(
      "wineryBatchCount",
      ethereum.Value.fromUnsignedBigInt(wineryBatchCount)
    )
  )

  return soilDataPushedEvent
}

export function createTemperatureDataPushedEvent(
  batchId: BigInt,
  batchname: string,
  wineryName: string,
  data: i32,
  owner: Address,
  wineryBatchCount: BigInt
): TemperatureDataPushed {
  let temperatureDataPushedEvent = changetype<TemperatureDataPushed>(
    newMockEvent()
  )

  temperatureDataPushedEvent.parameters = new Array()

  temperatureDataPushedEvent.parameters.push(
    new ethereum.EventParam(
      "batchId",
      ethereum.Value.fromUnsignedBigInt(batchId)
    )
  )
  temperatureDataPushedEvent.parameters.push(
    new ethereum.EventParam("batchname", ethereum.Value.fromString(batchname))
  )
  temperatureDataPushedEvent.parameters.push(
    new ethereum.EventParam("wineryName", ethereum.Value.fromString(wineryName))
  )
  temperatureDataPushedEvent.parameters.push(
    new ethereum.EventParam(
      "data",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(data))
    )
  )
  temperatureDataPushedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  temperatureDataPushedEvent.parameters.push(
    new ethereum.EventParam(
      "wineryBatchCount",
      ethereum.Value.fromUnsignedBigInt(wineryBatchCount)
    )
  )

  return temperatureDataPushedEvent
}

export function createWindDataPushedEvent(
  batchId: BigInt,
  batchname: string,
  wineryName: string,
  data: i32,
  owner: Address,
  wineryBatchCount: BigInt
): WindDataPushed {
  let windDataPushedEvent = changetype<WindDataPushed>(newMockEvent())

  windDataPushedEvent.parameters = new Array()

  windDataPushedEvent.parameters.push(
    new ethereum.EventParam(
      "batchId",
      ethereum.Value.fromUnsignedBigInt(batchId)
    )
  )
  windDataPushedEvent.parameters.push(
    new ethereum.EventParam("batchname", ethereum.Value.fromString(batchname))
  )
  windDataPushedEvent.parameters.push(
    new ethereum.EventParam("wineryName", ethereum.Value.fromString(wineryName))
  )
  windDataPushedEvent.parameters.push(
    new ethereum.EventParam(
      "data",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(data))
    )
  )
  windDataPushedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  windDataPushedEvent.parameters.push(
    new ethereum.EventParam(
      "wineryBatchCount",
      ethereum.Value.fromUnsignedBigInt(wineryBatchCount)
    )
  )

  return windDataPushedEvent
}
