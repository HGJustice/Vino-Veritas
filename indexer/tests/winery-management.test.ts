import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { WineryCreated } from "../generated/schema"
import { WineryCreated as WineryCreatedEvent } from "../generated/WineryManagement/WineryManagement"
import { handleWineryCreated } from "../src/winery-management"
import { createWineryCreatedEvent } from "./winery-management-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let id = 123
    let name = "Example string value"
    let addy = Address.fromString("0x0000000000000000000000000000000000000001")
    let latitude = BigInt.fromI32(234)
    let longitude = BigInt.fromI32(234)
    let wineryNumber = 123
    let newWineryCreatedEvent = createWineryCreatedEvent(
      id,
      name,
      addy,
      latitude,
      longitude,
      wineryNumber
    )
    handleWineryCreated(newWineryCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("WineryCreated created and stored", () => {
    assert.entityCount("WineryCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "WineryCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "WineryCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "addy",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "WineryCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "latitude",
      "234"
    )
    assert.fieldEquals(
      "WineryCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "longitude",
      "234"
    )
    assert.fieldEquals(
      "WineryCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "wineryNumber",
      "123"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
