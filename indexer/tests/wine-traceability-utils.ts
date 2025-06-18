import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import {
  WineItemCreated,
  WineItemProgressed
} from "../generated/WineTraceability/WineTraceability"

export function createWineItemCreatedEvent(
  wineID: BigInt,
  stage: i32,
  wineryData: ethereum.Tuple,
  batchData: ethereum.Tuple,
  tankID: BigInt,
  barrelID: BigInt,
  bottleID: BigInt,
  wineItemCount: i32
): WineItemCreated {
  let wineItemCreatedEvent = changetype<WineItemCreated>(newMockEvent())

  wineItemCreatedEvent.parameters = new Array()

  wineItemCreatedEvent.parameters.push(
    new ethereum.EventParam("wineID", ethereum.Value.fromUnsignedBigInt(wineID))
  )
  wineItemCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "stage",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(stage))
    )
  )
  wineItemCreatedEvent.parameters.push(
    new ethereum.EventParam("wineryData", ethereum.Value.fromTuple(wineryData))
  )
  wineItemCreatedEvent.parameters.push(
    new ethereum.EventParam("batchData", ethereum.Value.fromTuple(batchData))
  )
  wineItemCreatedEvent.parameters.push(
    new ethereum.EventParam("tankID", ethereum.Value.fromUnsignedBigInt(tankID))
  )
  wineItemCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "barrelID",
      ethereum.Value.fromUnsignedBigInt(barrelID)
    )
  )
  wineItemCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "bottleID",
      ethereum.Value.fromUnsignedBigInt(bottleID)
    )
  )
  wineItemCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "wineItemCount",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(wineItemCount))
    )
  )

  return wineItemCreatedEvent
}

export function createWineItemProgressedEvent(
  wineID: BigInt,
  stage: i32,
  tankID: BigInt,
  barrelID: BigInt,
  bottleID: BigInt
): WineItemProgressed {
  let wineItemProgressedEvent = changetype<WineItemProgressed>(newMockEvent())

  wineItemProgressedEvent.parameters = new Array()

  wineItemProgressedEvent.parameters.push(
    new ethereum.EventParam("wineID", ethereum.Value.fromUnsignedBigInt(wineID))
  )
  wineItemProgressedEvent.parameters.push(
    new ethereum.EventParam(
      "stage",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(stage))
    )
  )
  wineItemProgressedEvent.parameters.push(
    new ethereum.EventParam("tankID", ethereum.Value.fromUnsignedBigInt(tankID))
  )
  wineItemProgressedEvent.parameters.push(
    new ethereum.EventParam(
      "barrelID",
      ethereum.Value.fromUnsignedBigInt(barrelID)
    )
  )
  wineItemProgressedEvent.parameters.push(
    new ethereum.EventParam(
      "bottleID",
      ethereum.Value.fromUnsignedBigInt(bottleID)
    )
  )

  return wineItemProgressedEvent
}
