import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { WineryCreated } from "../generated/WineryManagement/WineryManagement"

export function createWineryCreatedEvent(
  id: i32,
  name: string,
  addy: Address,
  latitude: BigInt,
  longitude: BigInt,
  wineryNumber: i32
): WineryCreated {
  let wineryCreatedEvent = changetype<WineryCreated>(newMockEvent())

  wineryCreatedEvent.parameters = new Array()

  wineryCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "id",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(id))
    )
  )
  wineryCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  wineryCreatedEvent.parameters.push(
    new ethereum.EventParam("addy", ethereum.Value.fromAddress(addy))
  )
  wineryCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "latitude",
      ethereum.Value.fromSignedBigInt(latitude)
    )
  )
  wineryCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "longitude",
      ethereum.Value.fromSignedBigInt(longitude)
    )
  )
  wineryCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "wineryNumber",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(wineryNumber))
    )
  )

  return wineryCreatedEvent
}
